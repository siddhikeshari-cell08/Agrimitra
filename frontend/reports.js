// ========================================
// AGRIMITRA REPORT
// ========================================

async function loadReport() {

    console.log("Loading Agrimitra Report...");


    // ========================================
    // CHECK SENSOR DATA
    // ========================================

    if (
        typeof soilData === "undefined"
    ) {

        console.error(
            "soilData is not available"
        );

        return;

    }


    console.log(
        "Current Sensor Data:",
        soilData
    );


    // ========================================
    // SHOW CURRENT READINGS IMMEDIATELY
    // ========================================

    updateReportReadings(

        soilData.moisture,

        soilData.temperature,

        soilData.gasStress

    );


    try {

        // ====================================
        // SEND DATA TO LOCAL FLASK BACKEND
        // ====================================

        const response = await fetch(
            "/api/soil-health",
            {

                method: "POST",

                headers: {

                    "Content-Type":
                        "application/json"

                },

                body: JSON.stringify({

                    moisture:
                        Number(
                            soilData.moisture
                        ),

                    temperature:
                        Number(
                            soilData.temperature
                        ),

                    gas_stress:
                        Number(
                            soilData.gasStress
                        )

                })

            }
        );


        console.log(
            "API Response:",
            response.status
        );


        if (!response.ok) {

            throw new Error(
                "API Error: " +
                response.status
            );

        }


        const data =
            await response.json();


        console.log(
            "Agrimitra AI Report:",
            data
        );


        // ====================================
        // BACKEND DATA
        // ====================================

        const sensor =
            data.sensor_data;

        const soil =
            data.soil_health;


        // ====================================
        // UPDATE READINGS
        // ====================================

        updateReportReadings(

            sensor.moisture,

            sensor.temperature,

            sensor.gas_stress

        );


        // ====================================
        // HEALTH SCORE
        // ====================================

        const scoreElement =
            document.getElementById(
                "reportScore"
            );


        if (scoreElement) {

            scoreElement.innerHTML =
                `${soil.score}<small>/100</small>`;

        }


        // ====================================
        // HEALTH STATUS
        // ====================================

        const statusElement =
            document.getElementById(
                "reportStatus"
            );


        if (statusElement) {

            statusElement.textContent =
                String(
                    soil.status
                ).toUpperCase();

        }


        // ====================================
        // AI RECOMMENDATION
        // ====================================

        const recommendation =
            document.getElementById(
                "aiRecommendation"
            );


        if (recommendation) {

            recommendation.textContent =
                soil.recommendation;

        }


        console.log(
            "Report updated successfully."
        );

    }


    catch (error) {

        console.error(
            "Agrimitra Report Error:",
            error
        );


        // ====================================
        // LOCAL FALLBACK SCORE
        // ====================================

        const score =
            calculateReportScore();


        const status =
            getReportStatus(
                score
            );


        const scoreElement =
            document.getElementById(
                "reportScore"
            );


        if (scoreElement) {

            scoreElement.innerHTML =
                `${score}<small>/100</small>`;

        }


        const statusElement =
            document.getElementById(
                "reportStatus"
            );


        if (statusElement) {

            statusElement.textContent =
                status.toUpperCase();

        }


        const recommendation =
            document.getElementById(
                "aiRecommendation"
            );


        if (recommendation) {

            recommendation.textContent =
                getReportRecommendation(
                    status
                );

        }

    }


    // ========================================
    // CREDIT POINTS
    // ========================================

    const credit =
        document.getElementById(
            "reportCredit"
        );


    if (
        credit &&
        typeof soilData.creditPoints !==
        "undefined"
    ) {

        credit.textContent =
            soilData.creditPoints;

    }


    // ========================================
    // REPORT ID
    // ========================================

    const reportId =
        document.getElementById(
            "reportId"
        );


    if (reportId) {

        const now =
            new Date();


        const year =
            now.getFullYear();


        const month =
            String(
                now.getMonth() + 1
            ).padStart(2, "0");


        const day =
            String(
                now.getDate()
            ).padStart(2, "0");


        reportId.textContent =
            `AGR-${year}-${month}${day}`;

    }


    // ========================================
    // GENERATED TIME
    // ========================================

    const generatedTime =
        document.getElementById(
            "generatedTime"
        );


    if (generatedTime) {

        generatedTime.textContent =
            new Date().toLocaleString();

    }

}



// ========================================
// UPDATE REPORT READINGS
// ========================================

function updateReportReadings(
    moisture,
    temperature,
    gasStress
) {


    // ========================================
    // MOISTURE
    // ========================================

    const moistureElement =
        document.getElementById(
            "reportMoisture"
        );


    if (moistureElement) {

        moistureElement.textContent =
            `${moisture}%`;

    }


    const moistureStatus =
        document.getElementById(
            "moistureStatus"
        );


    if (moistureStatus) {

        if (moisture < 45) {

            moistureStatus.textContent =
                "Low";

        }

        else if (
            moisture <= 70
        ) {

            moistureStatus.textContent =
                "Good range";

        }

        else {

            moistureStatus.textContent =
                "High";

        }

    }



    // ========================================
    // TEMPERATURE
    // ========================================

    const temperatureElement =
        document.getElementById(
            "reportTemperature"
        );


    if (temperatureElement) {

        temperatureElement.textContent =
            `${temperature}°C`;

    }


    const temperatureStatus =
        document.getElementById(
            "temperatureStatus"
        );


    if (temperatureStatus) {

        if (
            temperature >= 22 &&
            temperature <= 32
        ) {

            temperatureStatus.textContent =
                "Normal";

        }

        else {

            temperatureStatus.textContent =
                "Attention";

        }

    }



    // ========================================
    // GAS STRESS
    // ========================================

    const gasElement =
        document.getElementById(
            "reportGas"
        );


    if (gasElement) {

        if (
            gasStress <= 30
        ) {

            gasElement.textContent =
                "Low";

        }

        else if (
            gasStress <= 60
        ) {

            gasElement.textContent =
                "Medium";

        }

        else {

            gasElement.textContent =
                "High";

        }

    }


    const gasStatus =
        document.getElementById(
            "gasStatus"
        );


    if (gasStatus) {

        if (
            gasStress <= 30
        ) {

            gasStatus.textContent =
                "Normal";

        }

        else {

            gasStatus.textContent =
                "Warning";

        }

    }

}



// ========================================
// LOCAL REPORT SCORE
// ========================================

function calculateReportScore() {

    const moisture =
        Number(
            soilData.moisture
        );


    const temperature =
        Number(
            soilData.temperature
        );


    const gas =
        Number(
            soilData.gasStress
        );


    // ========================================
    // MOISTURE SCORE - 45
    // ========================================

    const moistureDifference =
        Math.abs(
            moisture - 60
        );


    const moistureScore =
        Math.max(
            0,
            45 -
            (
                moistureDifference * 1.5
            )
        );


    // ========================================
    // TEMPERATURE SCORE - 30
    // ========================================

    const temperatureDifference =
        Math.abs(
            temperature - 26
        );


    const temperatureScore =
        Math.max(
            0,
            30 -
            (
                temperatureDifference * 2.5
            )
        );


    // ========================================
    // GAS SCORE - 25
    // ========================================

    const gasScore =
        Math.max(
            0,
            25 -
            (
                gas * 0.30
            )
        );


    const score =
        moistureScore +
        temperatureScore +
        gasScore;


    return Number(
        Math.max(
            0,
            Math.min(
                100,
                score
            )
        ).toFixed(1)
    );

}



// ========================================
// STATUS
// ========================================

function getReportStatus(
    score
) {

    if (score >= 80) {

        return "Healthy";

    }


    if (score >= 60) {

        return "Moderate";

    }


    return "Needs Attention";

}



// ========================================
// RECOMMENDATION
// ========================================

function getReportRecommendation(
    status
) {

    if (
        status === "Healthy"
    ) {

        return (
            "Soil condition is currently healthy. "
            +
            "Maintain the current irrigation pattern "
            +
            "and continue regular monitoring."
        );

    }


    if (
        status === "Moderate"
    ) {

        return (
            "Soil condition is moderate. "
            +
            "Monitor moisture, temperature "
            +
            "and gas stress regularly."
        );

    }


    return (
        "Soil condition needs attention. "
        +
        "Check moisture, temperature "
        +
        "and gas stress before taking corrective action."
    );

}



// ========================================
// PAGE LOAD
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadReport();

    }
);