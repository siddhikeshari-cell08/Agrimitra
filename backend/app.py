from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import sys
import os


# ========================================
# AI FOLDER PATH
# ========================================

sys.path.append(
    os.path.abspath(
        os.path.join(
            os.path.dirname(__file__),
            ".."
        )
    )
)


from ai.soil_health_score import calculate_soil_health


# ========================================
# FLASK
# ========================================

app = Flask(__name__)

CORS(app)


# ========================================
# FRONTEND
# ========================================

FRONTEND_FOLDER = os.path.abspath(
    os.path.join(
        os.path.dirname(__file__),
        "..",
        "frontend"
    )
)


# ========================================
# DASHBOARD
# ========================================

@app.route("/dashboard")
def dashboard():

    return send_from_directory(
        FRONTEND_FOLDER,
        "dashboard.html"
    )


# ========================================
# REPORTS
# ========================================

@app.route("/reports")
def reports():

    return send_from_directory(
        FRONTEND_FOLDER,
        "reports.html"
    )


# ========================================
# FRONTEND FILES
# ========================================

@app.route("/<path:filename>")
def frontend_files(filename):

    return send_from_directory(
        FRONTEND_FOLDER,
        filename
    )


# ========================================
# HOME
# ========================================

@app.route("/")
def home():

    return jsonify({

        "project":
            "Agrimitra",

        "message":
            "Agrimitra AI Soil Monitoring API is running",

        "status":
            "online"

    })


# ========================================
# SOIL HEALTH API
# ========================================

@app.route(
    "/api/soil-health",
    methods=["POST"]
)
def soil_health():

    data =
        request.get_json(
            silent=True
        ) or {}


    # ====================================
    # READ SENSOR VALUES
    # ====================================

    moisture =
        float(
            data.get(
                "moisture",
                68
            )
        )


    temperature =
        float(
            data.get(
                "temperature",
                27
            )
        )


    gas_stress =
        float(
            data.get(
                "gas_stress",
                22
            )
        )


    # ====================================
    # CALCULATE SCORE
    # ====================================

    result =
        calculate_soil_health(

            moisture=moisture,

            temperature=temperature,

            gas_stress=gas_stress

        )


    # ====================================
    # RESPONSE
    # ====================================

    return jsonify({

        "sensor_data": {

            "moisture":
                moisture,

            "temperature":
                temperature,

            "gas_stress":
                gas_stress

        },

        "soil_health": {

            "score":
                result["score"],

            "status":
                result["status"],

            "recommendation":
                result["recommendation"]

        }

    })


# ========================================
# START SERVER
# ========================================

if __name__ == "__main__":

    app.run(

        host="0.0.0.0",

        port=int(
            os.environ.get(
                "PORT",
                5000
            )
        ),

        debug=True

    )