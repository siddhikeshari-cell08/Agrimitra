// ========================================
// AGRIMITRA SENSOR DATA
// ========================================

const soilData = {

    moisture: 68,
    temperature: 27,
    gasStress: 22,

    creditPoints: 740

};


// ========================================
// GENERATE NEW SENSOR READING
// ========================================

function generateReading() {

    // Moisture: 30 - 85
    soilData.moisture =
        Math.floor(
            Math.random() * 56
        ) + 30;


    // Temperature: 18 - 36
    soilData.temperature =
        Math.floor(
            Math.random() * 19
        ) + 18;


    // Gas stress: 5 - 70
    soilData.gasStress =
        Math.floor(
            Math.random() * 66
        ) + 5;


    console.log(
        "NEW SENSOR READING:",
        soilData
    );

}


// ========================================
// GET CURRENT DATA
// ========================================

function getSoilData() {

    return {

        moisture:
            Number(soilData.moisture),

        temperature:
            Number(soilData.temperature),

        gasStress:
            Number(soilData.gasStress)

    };

}