from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import sys
import os

# Allow Python to find the AI folder
sys.path.append(
    os.path.abspath(
        os.path.join(os.path.dirname(__file__), "..")
    )
)

from ai.soil_health_score import calculate_soil_health


app = Flask(__name__)
CORS(app)

FRONTEND_FOLDER = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..", "frontend")
)


@app.route("/dashboard")
def dashboard():
    return send_from_directory(
        FRONTEND_FOLDER,
        "dashboard.html"
    )


@app.route("/reports")
def reports():
    return send_from_directory(
        FRONTEND_FOLDER,
        "reports.html"
    )


@app.route("/<path:filename>")
def frontend_files(filename):
    return send_from_directory(
        FRONTEND_FOLDER,
        filename
    )


@app.route("/")
def home():
    return jsonify({
        "project": "Agrimitra",
        "message": "Agrimitra AI Soil Monitoring API is running",
        "status": "online"
    })


@app.route("/api/soil-health", methods=["POST"])
def soil_health():

    data = request.get_json()

    moisture = float(data.get("moisture", 68))
    temperature = float(data.get("temperature", 27))
    humidity = float(data.get("humidity", 61))
    gas_stress = float(data.get("gas_stress", 22))

    result = calculate_soil_health(
        moisture=moisture,
        temperature=temperature,
        humidity=humidity,
        gas_stress=gas_stress
    )

    return jsonify({

        "sensor_data": {
            "moisture": moisture,
            "temperature": temperature,
            "humidity": humidity,
            "gas_stress": gas_stress
        },

        "soil_health": {
            "score": result["score"],
            "status": result["status"],
            "recommendation": result["recommendation"]
        }

    })


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 5000)),
        debug=False
    )