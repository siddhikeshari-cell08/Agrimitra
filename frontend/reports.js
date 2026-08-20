// ========================================
// AGRIMITRA REPORT LOGIC
// ========================================


async function loadReport() {

    try {

        // ========================================
        // GET CURRENT SENSOR DATA
        // ========================================

        const response = await fetch(
        "https://agrimitra-1-ys6e.onrender.com/api/soil-health",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    moisture: soilData.moisture,

                    temperature: soilData.temperature,

                    humidity: soilData.humidity,

                    gas_stress: soilData.gasStress

                })
            }
        );


        // ========================================
        // CHECK RESPONSE
        // ========================================

        if (!response.ok) {

            throw new Error(
                "Server returned " + response.status
            );

        }


        const data = await response.json();


        console.log(
            "Agrimitra Report Data:",
            data
        );


        // ========================================
        // GET BACKEND DATA
        // ========================================

        const soil =
            data.soil_health;

        const sensor =
            data.sensor_data;


        // ========================================
        // SOIL HEALTH SCORE
        // ========================================

        const scoreElement =
            document.getElementById(
                "reportScore"
            );


        if (scoreElement) {

            scoreElement.innerHTML =
                `${soil.score}<small>/100</small>`;

        }


        // ========================================
        // HEALTH STATUS
        // ========================================

        const statusElement =
            document.getElementById(
                "reportStatus"
            );


        if (statusElement) {

            statusElement.textContent =
                soil.status.toUpperCase();

        }


        // ========================================
        // SOIL MOISTURE
        // ========================================

        const moistureElement =
            document.getElementById(
                "reportMoisture"
            );


        if (moistureElement) {

            moistureElement.textContent =
                `${sensor.moisture}%`;

        }


        // ========================================
        // MOISTURE STATUS
        // ========================================

        const moistureStatus =
            document.getElementById(
                "moistureStatus"
            );


        if (moistureStatus) {

            if (sensor.moisture < 45) {

                moistureStatus.textContent =
                    "Low";

            }

            else if (sensor.moisture <= 70) {

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
                `${sensor.temperature}°C`;

        }


        // ========================================
        // TEMPERATURE STATUS
        // ========================================

        const temperatureStatus =
            document.getElementById(
                "temperatureStatus"
            );


        if (temperatureStatus) {

            if (
                sensor.temperature >= 22 &&
                sensor.temperature <= 32
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
        // HUMIDITY
        // ========================================

        const humidityElement =
            document.getElementById(
                "reportHumidity"
            );


        if (humidityElement) {

            humidityElement.textContent =
                `${sensor.humidity}%`;

        }


        // ========================================
        // HUMIDITY STATUS
        // ========================================

        const humidityStatus =
            document.getElementById(
                "humidityStatus"
            );


        if (humidityStatus) {

            if (
                sensor.humidity >= 45 &&
                sensor.humidity <= 75
            ) {

                humidityStatus.textContent =
                    "Moderate";

            }

            else {

                humidityStatus.textContent =
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

            if (sensor.gas_stress <= 30) {

                gasElement.textContent =
                    "Low";

            }

            else if (sensor.gas_stress <= 60) {

                gasElement.textContent =
                    "Medium";

            }

            else {

                gasElement.textContent =
                    "High";

            }

        }


        // ========================================
        // GAS STATUS
        // ========================================

        const gasStatusElement =
            document.getElementById(
                "gasStatus"
            );


        if (gasStatusElement) {

            if (sensor.gas_stress <= 30) {

                gasStatusElement.textContent =
                    "Normal";

            }

            else {

                gasStatusElement.textContent =
                    "Warning";

            }

        }


        // ========================================
        // AI RECOMMENDATION
        // ========================================

        const recommendationElement =
            document.getElementById(
                "aiRecommendation"
            );


        if (recommendationElement) {

            recommendationElement.textContent =
                soil.recommendation;

        }


        // ========================================
        // CREDIT POINTS
        // ========================================

        const creditElement =
            document.getElementById(
                "reportCredit"
            );


        if (creditElement) {

            creditElement.textContent =
                soilData.creditPoints;

        }


        // ========================================
        // REPORT ID
        // ========================================

        const reportIdElement =
            document.getElementById(
                "reportId"
            );


        if (reportIdElement) {

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


            reportIdElement.textContent =
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


        // ========================================
        // DESCRIPTION
        // ========================================

        const description =
            document.getElementById(
                "reportDescription"
            );


        if (description) {

            description.textContent =
                "This report is generated from the latest monitored soil readings and the Agrimitra AI soil-health analysis engine.";

        }


        console.log(
            "Agrimitra report loaded successfully."
        );

    }


    catch (error) {

        console.error(
            "Agrimitra Report Error:",
            error
        );


        const recommendationElement =
            document.getElementById(
                "aiRecommendation"
            );


        if (recommendationElement) {

            recommendationElement.textContent =
                "AI service unavailable. Please make sure the Agrimitra backend server is running.";

        }

    }

}


// ========================================
// LOAD REPORT WHEN PAGE OPENS
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadReport();

    }
);