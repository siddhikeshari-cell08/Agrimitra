// ========================================
// AGRIMITRA DASHBOARD
// AI BACKEND CONNECTION
// ========================================


// ========================================
// PAGE LOAD
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    loadSoilHealth();

    const refreshButton =
        document.getElementById("refreshBtn");

    if (refreshButton) {

        refreshButton.addEventListener("click", refreshReadings);

    }

});


// ========================================
// REFRESH READINGS
// ========================================

async function refreshReadings() {

    const refreshButton =
        document.getElementById("refreshBtn");

    try {

        // Button temporarily disabled
        if (refreshButton) {

            refreshButton.disabled = true;

            refreshButton.textContent =
                "↻ Updating...";

        }


        // ====================================
        // GENERATE NEW SENSOR VALUES
        // ====================================

        generateNewReading();


        console.log(
            "New sensor data:",
            soilData
        );


        // ====================================
        // SEND NEW VALUES TO BACKEND
        // ====================================

        await loadSoilHealth();


    }

    catch (error) {

        console.error(
            "Refresh Error:",
            error
        );

    }

    finally {

        // Enable button again
        if (refreshButton) {

            refreshButton.disabled = false;

            refreshButton.textContent =
                "↻ Refresh Readings";

        }

    }

}


// ========================================
// LOAD SOIL HEALTH FROM FLASK API
// ========================================

async function loadSoilHealth() {

    try {

        const response = await fetch(
            "http://127.0.0.1:5000/api/soil-health",
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


        if (!response.ok) {

            throw new Error(
                "Backend API failed: " +
                response.status
            );

        }


        const data =
            await response.json();


        console.log(
            "Agrimitra AI Response:",
            data
        );


        // ====================================
        // SENSOR DATA
        // ====================================

        const sensor =
            data.sensor_data;


        const soil =
            data.soil_health;


        // ====================================
        // MOISTURE
        // ====================================

        const moistureElement =
            document.getElementById("moisture");

        if (moistureElement) {

            moistureElement.textContent =
                sensor.moisture + "%";

        }


        // ====================================
        // TEMPERATURE
        // ====================================

        const temperatureElement =
            document.getElementById("temperature");

        if (temperatureElement) {

            temperatureElement.textContent =
                sensor.temperature + "°C";

        }


        // ====================================
        // HUMIDITY
        // ====================================

        const humidityElement =
            document.getElementById("humidity");

        if (humidityElement) {

            humidityElement.textContent =
                sensor.humidity + "%";

        }


        // ====================================
        // GAS STRESS
        // ====================================

        const gasElement =
            document.getElementById("gas");

        const gasStateElement =
            document.getElementById("gasState");


        let gasText;
        let gasState;


        if (sensor.gas_stress <= 30) {

            gasText = "Low";
            gasState = "No warning";

        }

        else if (sensor.gas_stress <= 60) {

            gasText = "Medium";
            gasState = "Monitor";

        }

        else {

            gasText = "High";
            gasState = "Warning";

        }


        if (gasElement) {

            gasElement.textContent =
                gasText;

        }


        if (gasStateElement) {

            gasStateElement.textContent =
                gasState;

        }


        // ====================================
        // SOIL HEALTH SCORE
        // ====================================

        const scoreElement =
            document.getElementById("score");


        if (scoreElement) {

            scoreElement.textContent =
                soil.score;

        }


        // ====================================
        // SCORE BAR
        // ====================================

        const scoreBar =
            document.getElementById("scoreBar");


        if (scoreBar) {

            scoreBar.style.width =
                soil.score + "%";

        }


        // ====================================
        // STATUS
        // ====================================

        const scoreLabel =
            document.getElementById("scoreLabel");


        if (scoreLabel) {

            scoreLabel.textContent =
                soil.status.toUpperCase();

        }


        // ====================================
        // SCORE MESSAGE
        // ====================================

        const scoreMessage =
            document.getElementById("scoreMessage");


        if (scoreMessage) {

            if (soil.status === "Healthy") {

                scoreMessage.textContent =
                    "Your monitored soil is currently in a healthy range.";

            }

            else if (soil.status === "Moderate") {

                scoreMessage.textContent =
                    "Your soil requires attention. Continue monitoring the field.";

            }

            else {

                scoreMessage.textContent =
                    "Your soil requires immediate attention. Check field conditions.";

            }

        }


        // ====================================
        // AI INSIGHT TITLE
        // ====================================

        const insightTitle =
            document.getElementById("insightTitle");


        if (insightTitle) {

            insightTitle.textContent =
                soil.status + " soil condition";

        }


        // ====================================
        // AI RECOMMENDATION
        // ====================================

        const insightText =
            document.getElementById("insightText");


        if (insightText) {

            insightText.textContent =
                soil.recommendation;

        }


        console.log(
            "Dashboard updated successfully."
        );

    }


    catch (error) {

        console.error(
            "Agrimitra AI Error:",
            error
        );


        const insightTitle =
            document.getElementById("insightTitle");


        const insightText =
            document.getElementById("insightText");


        if (insightTitle) {

            insightTitle.textContent =
                "AI service unavailable";

        }


        if (insightText) {

            insightText.textContent =
                "Please make sure the Agrimitra Flask backend is running.";

        }

    }

}