// Hier könnte die Funktion für die Anzeige je nach Zahl implementiert werden
function displayContentBasedOnNumber(number) {
    var outputDiv = document.getElementById('outputDiv');

    if (typeof number !== 'number') {
        outputDiv.textContent = 'Ungültige Eingabe. Bitte geben Sie eine Zahl ein.';
    } else {
        if (number === 0) {
            outputDiv.textContent = 'Du verbrauchst momentan kein CO2.';
        } else if (number > 0) {
            outputDiv.textContent = 'Die Zahl ist positiv.';
        } else {
            outputDiv.textContent = 'Die Zahl ist negativ.';
        }
    }
}

// Hier muss die Summe der generierten Massen an CO2 stehen.

var exampleNumber = 0;

displayContentBasedOnNumber(exampleNumber);





// Endpoint URL
const apiUrl = 'https://beta4.api.climatiq.io/estimate';

// Your API key (replace with your actual key)
const apiKey = '2EHKF3KSB5MR42GQHR6EQV0JS47D';

// The headers you'll send with the request
const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
};







let countHotel = 0;

const countRoomsInput = document.getElementById('countRooms');
const countNightsInput = document.getElementById('countNights');

// Event Listener für Änderungen in den Input-Feldern
countRoomsInput.addEventListener('input', calculateHotel);
countNightsInput.addEventListener('input', calculateHotel);

// Funktion zum Berechnen und Anzeigen des Gesamtbetrags
function calculateHotel() {
    // Lesen der Werte aus den Input-Feldern und Umwandeln in Zahlen
    const countRooms = parseFloat(countRoomsInput.value);
    const countNights = parseFloat(countNightsInput.value);

    // Überprüfen, ob die eingegebenen Werte gültige Zahlen sind
    if (!isNaN(countRooms) && !isNaN(countNights)) {
        // Multiplizieren der Werte und Anzeigen des Ergebnisses
        countHotel = countRooms * countNights;

        //console.log('Gesamtbetrag:', countHotel);

        // Aktualisieren von postDataHotel mit dem neuen Wert
        updatePostDataHotel(countHotel);

        // Hier Fetch-Aufruf einfügen, nachdem countHotel aktualisiert wurde
        fetch(apiUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(postDataHotel)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            
            //console.log(data);

            showDataHotel(data);

            showTotalCount();

        })
        .catch(error => {
            console.error('There was a problem with the fetch:', error.message);
        });
    } else {
        console.log('Ungültige Eingabe. Bitte geben Sie gültige Zahlen ein.');
    }
}

// Funktion zum Aktualisieren von postDataHotel
function updatePostDataHotel(countHotel) {
    postDataHotel.parameters.number = countHotel;
}

// Sample data for POST (adjust this to the actual data structure required by the API)
const postDataHotel = {
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


function showDataHotel(dataHotel){

    const listElement = document.getElementById("hotelco2");
    listElement.innerHTML = '';
    let hotelc02 = dataHotel.co2e;
    //console.log(dataHotel.co2e);
    listElement.innerHTML = hotelc02 + " kg CO2";

};


function showTotalCount() {

    let countTotal = document.getElementById("hotelco2").innerText;
    console.log(countTotal);
    
    //let countEquipment = dataEquipment.co2e;
    //console.log(countHotel);
};


const postDataEquipment = {

    "emission_factor": {
		"activity_id": "electrical_equipment-type_radio_television_communication_equipment_apparatus",
		"source": "EXIOBASE",
		"region": "CH",
		"year": 2019,
		"source_lca_activity": "unknown",
		"data_version": "^0"
	},
	"parameters": {
		"money": 500,
		"money_unit": "usd"
	}
}


// Travel by medium car or train (both diesel) ///////////////////////////////////////////


const postDataTravelDiesel = {

        "emission_factor": {
            "activity_id": "passenger_vehicle-vehicle_type_car-fuel_source_diesel-distance_na-engine_size_medium",
            "source": "UBA",
            "region": "DE",
            "year": 2020,
            "source_lca_activity": "upstream-fuel_combustion",
            "data_version": "^0"
        },
        "parameters": {
            "passengers": 4,
            "distance": 100,
            "distance_unit": "km"
        }
    }

const postDataTravelTrain = {

    "emission_factor": {
		"activity_id": "passenger_train-route_type_long_distance-fuel_source_diesel",
		"source": "UBA",
		"region": "DE",
		"year": 2020,
		"source_lca_activity": "upstream-fuel_combustion",
		"data_version": "^0"
	},
	"parameters": {
		"passengers": 4,
		"distance": 100,
		"distance_unit": "km"
	}
} 