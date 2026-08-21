# ========================================
# AGRIMITRA AI
# SOIL HEALTH ENGINE
# ========================================


def calculate_soil_health(
    moisture,
    temperature,
    gas_stress
):
    """
    Calculate Soil Health Score.

    Inputs:
        moisture      -> soil moisture %
        temperature   -> temperature °C
        gas_stress    -> gas stress value

    Score:
        0 - 100
    """


    # ====================================
    # MOISTURE
    # Maximum: 45
    # Ideal: 50 - 70
    # ====================================

    if 50 <= moisture <= 70:

        moisture_score = 45

    elif 40 <= moisture < 50:

        moisture_score = 36

    elif 70 < moisture <= 80:

        moisture_score = 36

    elif 30 <= moisture < 40:

        moisture_score = 24

    elif 80 < moisture <= 90:

        moisture_score = 24

    else:

        moisture_score = 12



    # ====================================
    # TEMPERATURE
    # Maximum: 30
    # Ideal: 22 - 30
    # ====================================

    if 22 <= temperature <= 30:

        temperature_score = 30

    elif 20 <= temperature < 22:

        temperature_score = 25

    elif 30 < temperature <= 33:

        temperature_score = 25

    elif 17 <= temperature < 20:

        temperature_score = 19

    elif 33 < temperature <= 36:

        temperature_score = 19

    else:

        temperature_score = 10



    # ====================================
    # GAS STRESS
    # Maximum: 25
    # Lower is better
    # ====================================

    if gas_stress <= 15:

        gas_score = 25

    elif gas_stress <= 30:

        gas_score = 21

    elif gas_stress <= 45:

        gas_score = 16

    elif gas_stress <= 60:

        gas_score = 11

    else:

        gas_score = 5



    # ====================================
    # FINAL SCORE
    # ====================================

    score = (

        moisture_score

        + temperature_score

        + gas_score

    )


    score = max(
        0,
        min(
            100,
            score
        )
    )


    # ====================================
    # STATUS
    # ====================================

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
            "Monitor moisture and temperature "
            "and avoid unnecessary irrigation."
        )


    else:

        status = "Needs Attention"

        recommendation = (
            "Soil condition needs attention. "
            "Check soil moisture, temperature "
            "and gas stress."
        )


    # ====================================
    # RESULT
    # ====================================

    return {

        "score":
            score,

        "status":
            status,

        "recommendation":
            recommendation

    }