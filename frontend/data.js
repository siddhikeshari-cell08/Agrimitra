// ========================================
// AGRIMITRA SENSOR DATA
// ========================================

// Simulated IoT sensor readings
// Later these values can come from ESP8266/API.

let soilData = {

    moisture: 68,
    temperature: 27,
    humidity: 61,
    gasStress: 22,

    healthScore: 82,
    creditPoints: 740

};


// ========================================
// GENERATE NEW SENSOR READING
// ========================================

function generateNewReading() {

    // Moisture: 40% - 80%
    soilData.moisture =
        Math.floor(Math.random() * 41) + 40;


    // Temperature: 22°C - 35°C
    soilData.temperature =
        Math.floor(Math.random() * 14) + 22;


    // Humidity: 45% - 80%
    soilData.humidity =
        Math.floor(Math.random() * 36) + 45;


    // Gas stress: 5 - 70
    soilData.gasStress =
        Math.floor(Math.random() * 66) + 5;


    console.log(
        "New Agrimitra Sensor Reading:",
        soilData
    );

}