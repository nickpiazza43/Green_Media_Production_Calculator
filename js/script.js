
///// Daten als Javascriptobjekte von der API vorgegeben /////

let countHotel = 1;
const countRoomsInput = document.getElementById('countRooms');
const countNightsInput = document.getElementById('countNights');

const dataHotel = {
    "emission_factor": {
        "activity_id": "accommodation_type_hotel_stay",
        "source": "BEIS",
        "region": "CH",
        "year": 2023,
        "source_lca_activity": "unknown",
        "data_version": "^0"
    },
    "parameters": {
        "number": countHotel
    }
};


let countEquipment = 1;
const countMoneyInput = document.getElementById('countMoney');

const dataEquipment = {

    "emission_factor": {
        "activity_id": "electrical_equipment-type_radio_television_communication_equipment_apparatus",
        "source": "EXIOBASE",
        "region": "CH",
        "year": 2019,
        "source_lca_activity": "unknown",
        "data_version": "^0"
    },
    "parameters": {
        "money": countEquipment,
        "money_unit": "usd"
    }
}


let countTravelCarP = 1;
let countTravelCarD = 1;
const countPassengerTrainInput = document.getElementById('countPassengerTrain');
const countKilometerTrainInput = document.getElementById('countKilometerTrain');

const dataTravelCar = {

    "emission_factor": {
        "activity_id": "passenger_vehicle-vehicle_type_car-fuel_source_diesel-distance_na-engine_size_medium",
        "source": "UBA",
        "region": "DE",
        "year": 2020,
        "source_lca_activity": "upstream-fuel_combustion",
        "data_version": "^0"
    },
    "parameters": {
        "passengers": countTravelCarP,
        "distance": countTravelCarD,
        "distance_unit": "km"
    }
}


let countTravelTrainP = 1;
let countTravelTrainD = 1;

const dataTravelTrain = {

    "emission_factor": {
        "activity_id": "passenger_train-route_type_long_distance-fuel_source_diesel",
        "source": "UBA",
        "region": "DE",
        "year": 2020,
        "source_lca_activity": "upstream-fuel_combustion",
        "data_version": "^0"
    },
    "parameters": {
        "passengers": countTravelTrainP,
        "distance": countTravelTrainD,
        "distance_unit": "km"
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////



function executeFetch(data, targetId) {
    // Your API key (replace with your actual key)
    const apiKey = '2EHKF3KSB5MR42GQHR6EQV0JS47D';

    const apiUrl = 'https://beta4.api.climatiq.io/estimate';
    //const otherApiUrl = 'https://example.com/api/other';

    // The headers you'll send with the request
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {

            //console.log(data, targetId);
            
            showData(data, targetId);

        })
        .catch(error => {
            console.error('There was a problem with the fetch:', error.message);
        });
}

///// Funktion, welche die CO2-Daten im HTML darstellt /////

function showData(data, targetId) {

    const listElement = document.getElementById(targetId);
    listElement.innerHTML = '';
    let c02 = data.co2e;
    console.log(data.co2e);
    listElement.innerHTML = c02 + " kg CO2";
};

///// Funktion, welche die Inputdaten nach jeder Eingabe updaten je nach Aufbau des Javascriptobjektes /////

function updateData(data, count, id) {
    if(id == 1){
        data.parameters.number = count;
    } else if (id == 2){
        data.parameters.money = count;
    }
}

///// Funktion, welche je nach Event, die eingegeben Daten miteinander verrechnet, updatet und an den entsprechenden fetch schickt /////

function handleInput(event) {
    const inputId = event.target.id;
    let data, targetId;
    //console.log(inputId,data,targetId)

    if (inputId === 'countRooms' || inputId === 'countNights') {

        data = dataHotel;
        targetId = 'accommodation_type_hotel_stay';

        const countRooms = parseFloat(countRoomsInput.value);
        const countNights = parseFloat(countNightsInput.value);

        // Überprüfen, ob die eingegebenen Werte gültige Zahlen sind
        if (!isNaN(countRooms) && !isNaN(countNights)) {
            // Multiplizieren der Werte und Anzeigen des Ergebnisses
            countHotel = countRooms * countNights;

            // Aktualisieren von postDataHotel mit dem neuen Wert
            updateData(data, countHotel, 1);

        } else {
            console.log('Ungültige Eingabe. Bitte geben Sie gültige Zahlen ein.');
        }

    } else if (inputId === 'countMoney') {

        data = dataEquipment;
        targetId = 'electrical_equipment-type_radio_television_communication_equipment_apparatus';

        const countMoney = parseFloat(countMoneyInput.value);

        // Überprüfen, ob die eingegebenen Werte gültige Zahlen sind
        if (!isNaN(countMoney)) {
            // Multiplizieren mit dem Wechselkurs zu USD und Anzeigen des Ergebnisses
            countEquipment = countMoney * 1.1;
            console.log(countEquipment);
             updateData(data, countEquipment,2);

        } else {
            console.log('Ungültige Eingabe. Bitte geben Sie gültige Zahlen ein.');
        }

    }

    if (data && targetId) {
        executeFetch(data, targetId);
    }
};


// Füge weitere Bedingungen hinzu, wenn benötigt...

// Fetch nur ausführen, wenn data und targetId gesetzt sind




// Event Listener für Input-Felder
const inputFields = document.querySelectorAll('.inputField');

inputFields.forEach(inputField => {
    inputField.addEventListener('change', handleInput);
});






/*function handleInput(event) {
    const inputId = event.target.id;
    let data, targetId;

    // Je nach ID des Inputs die entsprechenden Daten und Ziel-ID festlegen
    switch (inputId) {
        case 'countRooms':
        case 'countNights':
            data = dataHotel;
            targetId = 'accommodation_type_hotel_stay';
            break;
        case 'countEquipment':
            data = dataEquipment;
            targetId = 'electrical_equipment-type_radio_television_communication_equipment_apparatus';
            break;
        // Füge weitere Cases hinzu, wenn benötigt...
    }

    // Fetch nur ausführen, wenn data und targetId gesetzt sind
    if (data && targetId) {
        executeFetch(apiUrl, data, targetId);
      //  showData(data, targetId); // Hier wird die showData-Funktion aufgerufen
    }
}*/



/*// Funktion zum Aktualisieren
function updateData(constData) {
    constData.parameters.number = constData;
}

//const countNights = parseFloat(countNightsInput.value);

const collections = document.querySelectorAll('.inputField');
//console.log(collections);

collections.forEach(collection => {
    collection.addEventListener('input', function() {

        console.log('Input!!');

    });
});*/


/*let countHotel = 10;

function updateDatas(countHotel) {
    data.parameters.number = countHotel;
}*/

