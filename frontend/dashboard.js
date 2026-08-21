// ========================================
// AGRIMITRA DASHBOARD
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    console.log("Agrimitra Dashboard Loaded");

    // First reading
    updateDashboard();

    // Refresh button
    const refreshBtn = document.getElementById("refreshBtn");

    if (refreshBtn) {

        refreshBtn.addEventListener("click", function () {

            console.log("Refreshing readings...");

            // Generate new sensor reading
            generateReading();

            // Update everything
            updateDashboard();

        });

    }

});


// ========================================
// UPDATE DASHBOARD
// ========================================

function updateDashboard() {

    const moisture = Number(soilData.moisture);
    const temperature = Number(soilData.temperature);
    const gasStress = Number(soilData.gasStress);

    console.log("Current readings:", {
        moisture,
        temperature,
        gasStress
    });


    // ====================================
    // SENSOR READINGS
    // ====================================

    setText(
        "moisture",
        moisture + "%"
    );

    setText(
        "temperature",
        temperature + "°C"
    );


    // ====================================
    // MOISTURE STATUS
    // ====================================

    const moistureState =
        document.getElementById("moistureState");

    if (moistureState) {

        if (moisture < 45) {

            moistureState.textContent = "Low";

        } else if (moisture <= 70) {

            moistureState.textContent = "Good range";

        } else {

            moistureState.textContent = "High";

        }

    }


    // ====================================
    // TEMPERATURE STATUS
    // ====================================

    const tempState =
        document.getElementById("tempState");

    if (tempState) {

        if (
            temperature >= 22 &&
            temperature <= 30
        ) {

            tempState.textContent = "Normal";

        } else {

            tempState.textContent = "Attention";

        }

    }


    // ====================================
    // GAS STRESS
    // ====================================

    const gasElement =
        document.getElementById("gas");

    const gasState =
        document.getElementById("gasState");


    if (gasElement) {

        if (gasStress <= 30) {

            gasElement.textContent = "Low";

        } else if (gasStress <= 60) {

            gasElement.textContent = "Medium";

        } else {

            gasElement.textContent = "High";

        }

    }


    if (gasState) {

        if (gasStress <= 30) {

            gasState.textContent = "No warning";

        } else {

            gasState.textContent = "Warning";

        }

    }


    // ====================================
    // CALCULATE SOIL HEALTH
    // ====================================

    const result =
        calculateSoilHealth(
            moisture,
            temperature,
            gasStress
        );


    console.log(
        "Soil Health:",
        result
    );


    // ====================================
    // UPDATE SCORE
    // ====================================

    setText(
        "score",
        result.score
    );


    // ====================================
    // UPDATE SCORE BAR
    // ====================================

    const scoreBar =
        document.getElementById("scoreBar");

    if (scoreBar) {

        scoreBar.style.width =
            result.score + "%";

    }


    // ====================================
    // UPDATE STATUS BADGE
    // ====================================

    setText(
        "scoreLabel",
        result.status.toUpperCase()
    );


    // ====================================
    // UPDATE SCORE MESSAGE
    // ====================================

    setText(
        "scoreMessage",
        result.recommendation
    );


    // ====================================
    // AI INSIGHT
    // ====================================

    setText(
        "insightTitle",
        result.insightTitle
    );


    setText(
        "insightText",
        result.insightText
    );


    // ====================================
    // UPDATE CHART
    // ====================================

    updateChart(moisture);

}



// ========================================
// SOIL HEALTH CALCULATOR
// ========================================

function calculateSoilHealth(
    moisture,
    temperature,
    gasStress
) {


    // ====================================
    // MOISTURE SCORE - 45
    // ====================================

    let moistureScore;


    if (
        moisture >= 50 &&
        moisture <= 70
    ) {

        moistureScore = 45;

    } else if (
        moisture >= 40 &&
        moisture < 50
    ) {

        moistureScore = 36;

    } else if (
        moisture > 70 &&
        moisture <= 80
    ) {

        moistureScore = 36;

    } else if (
        moisture >= 30 &&
        moisture < 40
    ) {

        moistureScore = 24;

    } else if (
        moisture > 80 &&
        moisture <= 90
    ) {

        moistureScore = 24;

    } else {

        moistureScore = 12;

    }


    // ====================================
    // TEMPERATURE SCORE - 30
    // ====================================

    let temperatureScore;


    if (
        temperature >= 22 &&
        temperature <= 30
    ) {

        temperatureScore = 30;

    } else if (
        temperature >= 20 &&
        temperature < 22
    ) {

        temperatureScore = 25;

    } else if (
        temperature > 30 &&
        temperature <= 33
    ) {

        temperatureScore = 25;

    } else if (
        temperature >= 17 &&
        temperature < 20
    ) {

        temperatureScore = 19;

    } else if (
        temperature > 33 &&
        temperature <= 36
    ) {

        temperatureScore = 19;

    } else {

        temperatureScore = 10;

    }


    // ====================================
    // GAS SCORE - 25
    // ====================================

    let gasScore;


    if (gasStress <= 15) {

        gasScore = 25;

    } else if (gasStress <= 30) {

        gasScore = 21;

    } else if (gasStress <= 45) {

        gasScore = 16;

    } else if (gasStress <= 60) {

        gasScore = 11;

    } else {

        gasScore = 5;

    }


    // ====================================
    // FINAL SCORE
    // ====================================

    let score =
        moistureScore +
        temperatureScore +
        gasScore;


    score =
        Math.max(
            0,
            Math.min(
                100,
                score
            )
        );


    // ====================================
    // STATUS + AI INSIGHT
    // ====================================

    let status;
    let recommendation;
    let insightTitle;
    let insightText;


    if (score >= 80) {

        status = "Healthy";

        recommendation =
            "Soil condition is currently healthy. Maintain the current irrigation pattern and continue regular monitoring.";

        insightTitle =
            "Maintain current irrigation";

        insightText =
            "Moisture, temperature and gas stress are currently in a healthy range. Continue monitoring before making the next irrigation decision.";

    }

    else if (score >= 60) {

        status = "Moderate";

        recommendation =
            "Soil condition is moderate. Monitor moisture, temperature and gas stress regularly.";

        insightTitle =
            "Monitor soil conditions";

        insightText =
            "The soil is in a moderate condition. Keep monitoring the latest readings and avoid unnecessary irrigation.";

    }

    else {

        status = "Needs Attention";

        recommendation =
            "Soil condition needs attention. Check moisture, temperature and gas stress.";

        insightTitle =
            "Soil needs attention";

        insightText =
            "Current readings indicate that the soil needs attention. Check moisture and environmental conditions before irrigation.";

    }


    return {

        score: score,

        status: status,

        recommendation: recommendation,

        insightTitle: insightTitle,

        insightText: insightText

    };

}



// ========================================
// SAFE TEXT UPDATE
// ========================================

function setText(id, value) {

    const element =
        document.getElementById(id);

    if (element) {

        element.textContent = value;

    }

}



// ========================================
// MOISTURE CHART
// ========================================

function updateChart(currentMoisture) {

    const chart =
        document.getElementById("chart");

    if (!chart) {
        return;
    }


    const readings = [

        Math.max(
            20,
            currentMoisture - 10
        ),

        Math.max(
            20,
            currentMoisture - 6
        ),

        Math.max(
            20,
            currentMoisture - 3
        ),

        Math.max(
            20,
            currentMoisture + 2
        ),

        Math.max(
            20,
            currentMoisture - 2
        ),

        Math.max(
            20,
            currentMoisture + 5
        ),

        currentMoisture

    ];


    chart.innerHTML = "";


    readings.forEach(function (value) {

        const bar =
            document.createElement("span");


        bar.style.height =
            value + "%";

        bar.style.display =
            "inline-block";

        bar.style.width =
            "10%";

        bar.style.marginRight =
            "3%";

        bar.style.background =
            "#218653";

        bar.style.borderRadius =
            "6px 6px 0 0";

        bar.title =
            value + "%";


        chart.appendChild(bar);

    });

}