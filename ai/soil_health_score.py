# ========================================
# AGRIMITRA AI - SOIL HEALTH ENGINE
# ========================================


def calculate_soil_health(
    moisture,
    temperature,
    humidity,
    gas_stress
):
    """
    Calculate a more realistic Soil Health Score
    from simulated/IoT sensor readings.

    Score range: 0 - 100
    """


    # ========================================
    # 1. MOISTURE SCORE
    # Ideal range: 50 - 70%
    # Weight: 30 points
    # ========================================

    if 50 <= moisture <= 70:

        moisture_score = 30

    elif 40 <= moisture < 50:

        moisture_score = 24

    elif 70 < moisture <= 80:

        moisture_score = 24

    elif 30 <= moisture < 40:

        moisture_score = 16

    elif 80 < moisture <= 90:

        moisture_score = 16

    else:

        moisture_score = 8


    # ========================================
    # 2. TEMPERATURE SCORE
    # Ideal range: 22 - 30°C
    # Weight: 25 points
    # ========================================

    if 22 <= temperature <= 30:

        temperature_score = 25

    elif 20 <= temperature < 22:

        temperature_score = 21

    elif 30 < temperature <= 33:

        temperature_score = 21

    elif 17 <= temperature < 20:

        temperature_score = 16

    elif 33 < temperature <= 36:

        temperature_score = 16

    else:

        temperature_score = 9


    # ========================================
    # 3. HUMIDITY SCORE
    # Ideal range: 50 - 70%
    # Weight: 25 points
    # ========================================

    if 50 <= humidity <= 70:

        humidity_score = 25

    elif 40 <= humidity < 50:

        humidity_score = 21

    elif 70 < humidity <= 80:

        humidity_score = 21

    elif 30 <= humidity < 40:

        humidity_score = 15

    elif 80 < humidity <= 90:

        humidity_score = 15

    else:

        humidity_score = 8


    # ========================================
    # 4. GAS STRESS SCORE
    # Lower stress = better health
    # Weight: 20 points
    # ========================================

    if gas_stress <= 15:

        gas_score = 20

    elif gas_stress <= 30:

        gas_score = 17

    elif gas_stress <= 45:

        gas_score = 13

    elif gas_stress <= 60:

        gas_score = 9

    else:

        gas_score = 5


    # ========================================
    # FINAL SCORE
    # ========================================

    score = (
        moisture_score
        + temperature_score
        + humidity_score
        + gas_score
    )


    # Make sure score stays between 0 and 100

    score = max(0, min(100, score))


    # ========================================
    # STATUS
    # ========================================

    if score >= 80:

        status = "Healthy"

        recommendation = (
            "Soil condition is currently healthy. "
            "Maintain the current irrigation pattern "
            "and continue regular monitoring."
        )


    elif score >= 60:

        status = "Moderate"

        recommendation = (
            "Soil condition is moderate. "
            "Monitor moisture and environmental conditions "
            "and avoid unnecessary irrigation."
        )


    else:

        status = "Needs Attention"

        recommendation = (
            "Soil condition needs attention. "
            "Check moisture, temperature, humidity "
            "and gas stress before taking corrective action."
        )


    # ========================================
    # RETURN RESULT
    # ========================================

    return {

        "score": score,

        "status": status,

        "recommendation": recommendation

    }