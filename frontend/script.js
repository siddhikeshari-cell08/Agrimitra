// ===============================
// AGRIMITRA HOME PAGE
// ===============================

const agrimitraData = {

    score: 82,

    moisture: 68,

    temperature: 27,

    humidity: 61,

    gas: "Low"

};


// Update hero dashboard card

document.getElementById("heroScore").textContent =
    agrimitraData.score;

document.getElementById("heroMoisture").textContent =
    agrimitraData.moisture + "%";

document.getElementById("heroTemp").textContent =
    agrimitraData.temperature + "°C";

document.getElementById("heroHumidity").textContent =
    agrimitraData.humidity + "%";

document.getElementById("heroGas").textContent =
    agrimitraData.gas;