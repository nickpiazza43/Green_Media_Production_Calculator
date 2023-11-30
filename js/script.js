///// Daten als Javascriptobjekte von der API vorgegeben /////

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
        "number": 1
    }
};


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
        "money": 1,
        "money_unit": "usd"
    }
}



const countPassengerInput = document.getElementById('countPassenger');
const countDistanceInput = document.getElementById('countDistance');

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
        "passengers": 1,
        "distance": 1,
        "distance_unit": "km"
    }
}

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
        "passengers": 1,
        "distance": 1,
        "distance_unit": "km"
    }
}


///// Variablen für die Inputdaten /////

let co2Hotel = 0;
let co2Travel = 0;
let co2Equipment = 0;

let co2Data = [co2Hotel, co2Travel, co2Equipment];


///////// Funktion, welche die Daten fetched und die Funktionen schowData und addData auslöst ////////////

function executeFetch(data, targetId) {
    // API key 
    const apiKey = '2EHKF3KSB5MR42GQHR6EQV0JS47D';

    const apiUrl = 'https://beta4.api.climatiq.io/estimate';

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


            showData(data, targetId);

            addData();

        })
        .catch(error => {
            console.error('There was a problem with the fetch:', error.message);
        });
}


///// Funktion, welche die Kamera je nach CO2-Ausstoss vergrössert /////

function animateCamera(sum) {

    let svg = document.getElementById('camera');
    let blinkLight = document.getElementById('blinkLight');
    let filmRolle = document.getElementById('filmRolle');

    svg.style.transition = 'transform 0.5s ease-in-out';
    blinkLight.style.transition = 'fill 0.5s ease-in-out';
    filmRolle.style.transition = 'fill 0.5s ease-in-out';

    if (sum < 250) {

        svg.style.transform = `scale(1)`;
        blinkLight.setAttribute('fill', 'green')
        filmRolle.setAttribute('fill', 'green')

    } else if (sum < 500) {

        svg.style.transform = `scale(1.2)`;
        blinkLight.setAttribute('fill', 'yellow')
        filmRolle.setAttribute('fill', 'yellow')

    } else if (sum < 1000) {

        svg.style.transform = `scale(1.4)`;
        blinkLight.setAttribute('fill', 'orange')
        filmRolle.setAttribute('fill', 'orange')

    } else if (sum < 2500) {

        svg.style.transform = `scale(1.5)`;
        blinkLight.setAttribute('fill', 'red')
        filmRolle.setAttribute('fill', 'red')

    } else {

        resetAllData();

        alert("Your are generating too much CO\u00B2! Please reconsider your production plans for the sake of the environment.");

    }

};


///// Funktion, welche die CO2-Daten addiert und im HTML darstellt /////

function addData() {

    let sum = 0;

    for (let i = 0; i < co2Data.length; i++) {
        sum += co2Data[i];
    }
    sum = Math.round(sum);

    const listElement = document.getElementById('total');

    listElement.innerHTML = "Du generierst mit deiner Produktion ungefähr " + sum + " kg CO\u2082.";

    animateCamera(sum);

};


///// Funktion, welche die CO2-Daten im HTML darstellt /////

function showData(data, targetId) {
;
    const listElement = document.getElementById(targetId);
    listElement.innerHTML = '';
    let c02 = data.co2e;
    listElement.innerHTML = c02 + " kg CO\u2082";

    if (targetId === 'accommodation_type_hotel_stay') {
        co2Data[0] = data.co2e;
    } else if (targetId === 'electrical_equipment-type_radio_television_communication_equipment_apparatus') {
        co2Data[1] = data.co2e;
    } else if (targetId === 'train_and_car_both_diesel') {
        co2Data[2] = data.co2e;
    } else {
        console.log('Daten können nicht angezeigt werden.');
    };

};

///// Funktion, welche die Inputdaten nach jeder Eingabe updaten je nach Aufbau des Javascriptobjektes /////

function updateData(data, count, id) {
    if (id == 1) {
        data.parameters.number = count;
    } else if (id == 2) {
        data.parameters.money = count;
    } else if (id == 3) {
        data.parameters.passengers = count;
    } else if (id == 4) {
        data.parameters.distance = count;
    } else {
        
        console.log('Daten konnten nicht geupdated werden.');

    }
}

///// Funktion, welche je nach Event, die eingegeben Daten miteinander verrechnet, updatet und an den entsprechenden fetch schickt /////

function handleInput(event) {


    const inputId = event.target.id;
    let data, targetId;
    //console.log(inputId, data, targetId)


    if (inputId === 'countRooms' || inputId === 'countNights') {

        data = dataHotel;
        targetId = 'accommodation_type_hotel_stay';
        //console.log(inputId,data,targetId)

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
            // Multiplizieren mit dem Wechselkurs zu USD
            countEquipment = countMoney * 1.1;

            updateData(data, countEquipment, 2);

        } else {
            console.log('Ungültige Eingabe. Bitte geben Sie gültige Zahlen ein.');
        }

    } else if (inputId === 'countPassenger' || inputId === 'countDistance' || inputId === 'vehicle1' || inputId === 'vehicle2') {

        if (document.getElementById('vehicle1').checked) {

            data = dataTravelTrain;
            targetId = 'train_and_car_both_diesel';

            const countPassenger = parseFloat(countPassengerInput.value);
            const countDistance = parseFloat(countDistanceInput.value);

            // Überprüfen, ob die eingegebenen Werte gültige Zahlen sind
            if (!isNaN(countPassenger) && !isNaN(countDistance)) {

                updateData(data, countPassenger, 3);
                updateData(data, countDistance, 4);

            } else {
                console.log('Bitte geben Sie gültige Zahlen ein.');
            }

        } else if (document.getElementById('vehicle2').checked) {

            data = dataTravelCar;
            targetId = 'train_and_car_both_diesel';

            const countPassenger = parseFloat(countPassengerInput.value);
            const countDistance = parseFloat(countDistanceInput.value);

            // Überprüfen, ob die eingegebenen Werte gültige Zahlen sind
            if (!isNaN(countPassenger) && !isNaN(countDistance)) {
                // Multiplizieren der Werte und Anzeigen des Ergebnisses
 
                updateData(data, countPassenger, 3);
                updateData(data, countDistance, 4);

            }

        }

    } else {

        console.log('Ungültige Eingabe. Bitte geben Sie gültige Zahlen ein.');
    }

    if (data != null && targetId != null) {

        executeFetch(data, targetId);
    }
};



//////// Event Listener für alle Input-Felder ////////
const inputFields = document.querySelectorAll('.inputField');

inputFields.forEach(inputField => {
    inputField.addEventListener('change', handleInput);
});


//////// Funktion für Checkboxen für alle Input-Felder ////////
function selectThisCheckbox(checkBox) {
    let checkboxes = document.querySelectorAll('.checkbox');
    checkboxes.forEach(function (currentCheckbox) {
        if (currentCheckbox !== checkBox) {
            currentCheckbox.checked = false;
        }
    });

    checkboxes.forEach(function (currentCheckbox) {
        currentCheckbox.parentElement.classList.remove('selected');
    });
    checkBox.parentElement.classList.add('selected');
}


//////// Funktion, um alle Daten zu reseten ////////

function resetAllData() {

    animateCamera(0);

    let co2Emissions = document.querySelectorAll('.co2Emission');
    co2Emissions.forEach(co2emission => {
        co2emission.innerHTML = '0 kg CO\u2082';
    });

    co2Data = [0,0,0]

    addData();


}
































/*
const co2Emissions = document.querySelectorAll('.co2Emission');
console.log(co2Emissions);
*/


/*
function animateCamera() {
    let bild = document.getElementById('animiertesBild');

    // Berechne die Transformation basierend auf dem Wert
    let rotationGrad = wert * 10; // Beispiel: Drehung um 10 Grad pro Einheit

    // Wende die Transformation auf das Bild an
    bild.style.transform = `rotate(${rotationGrad}deg)`;
}

// Beispielaufruf der Funktion mit einem Wert
animateCamera(10);



const ages = [32, 33, 16, 40];
const result = ages.filter(checkAdult);

function checkAdult(age) {
  return age >= 18;
}

let sum = 0;
const numbers = [65, 44, 12, 4];
numbers.forEach(myFunction);

function myFunction(item) {
  sum += item;
}


const numbers = [15.5, 2.3, 1.1, 4.7];
document.getElementById("demo").innerHTML = numbers.reduce(getSum, 0);

function getSum(total, num) {
  return total + Math.round(num);
}



// von stackoverflow
function filter_list(l) {
    return l.filter(x => typeof x === "number");
  }
  console.log(filter_list([1,2,'a','b']))

//von matlab
//newStr = erase(str,match) deletes all occurrences of match in str. The erase function returns the remaining text as newStr.
//If match is an array, then erase deletes every occurrence of every element of match in str. The str and match arguments do not need to be the same size.
  newStr = erase(str,match)


//von matlab
txt = 'Model1__DK1_5450.0 '
pat = digitsPattern;
onlyNumbers = extract(txt, pat)

//https://thispointer.com/javascript-remove-non-numeric-characters-from-string/


*/




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
