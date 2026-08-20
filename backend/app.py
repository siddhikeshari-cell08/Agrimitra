from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import sys
import os

# ============================================
# PROJECT PATHS
# ============================================
PROJECT_ROOT = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..")
)
FRONTEND_FOLDER = os.path.join(
    PROJECT_ROOT,
    "frontend"
)

# ============================================
# AI MODULE PATH
# ============================================
if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)

from ai.soil_health_score import calculate_soil_health

# ============================================
# FLASK APP
# ============================================
app = Flask(__name__)
CORS(app)

# ============================================
# HOME - Serve Frontend
# ============================================
@app.route("/")
def home():
    return send_from_directory(
        FRONTEND_FOLDER,
        "index.html"
    )

# ============================================
# API STATUS
# ============================================
@app.route("/api/status")
def api_status():
    return jsonify({
        "project": "Agrimitra",
        "message": "Agrimitra AI Soil Monitoring API is running",
        "status": "online"
    })

# ============================================
# DASHBOARD
# ============================================
@app.route("/dashboard")
def dashboard():
    return send_from_directory(
        FRONTEND_FOLDER,
        "dashboard.html"
    )

# ============================================
# REPORTS
# ============================================
@app.route("/reports")
def reports():
    return send_from_directory(
        FRONTEND_FOLDER,
        "reports.html"
    )

# ============================================
# FRONTEND FILES
# ============================================
@app.route("/<path:filename>")
def frontend_files(filename):
    return send_from_directory(
        FRONTEND_FOLDER,
        filename
    )

# ============================================
# SOIL HEALTH AI API
# ============================================
@app.route("/api/soil-health", methods=["POST"])
def soil_health():
    data = request.get_json(silent=True) or {}

    # ----------------------------------------
    # Sensor values
    # ----------------------------------------
    try:
        moisture = float(
            data.get("moisture", 68)
        )
        temperature = float(
            data.get("temperature", 27)
        )
        humidity = float(
            data.get("humidity", 61)
        )
        gas_stress = float(
            data.get("gas_stress", 22)
        )
    except (TypeError, ValueError):
        return jsonify({
            "error": "Invalid sensor values"
        }), 400

    # ----------------------------------------
    # AI Soil Health Calculation
    # ----------------------------------------
    result = calculate_soil_health(
        moisture=moisture,
        temperature=temperature,
        humidity=humidity,
        gas_stress=gas_stress
    )

    # ----------------------------------------
    # API Response
    # ----------------------------------------
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

# ============================================
# RUN SERVER
# ============================================
if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 5000)),
        debug=False
    )
