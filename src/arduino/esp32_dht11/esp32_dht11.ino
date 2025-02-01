#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include "addons/TokenHelper.h"
#include "addons/RTDBHelper.h"
#include <OneWire.h>
#include <DallasTemperature.h>

#define DATABASE_URL "https://automatic-garden-824cc-default-rtdb.firebaseio.com"
#define API_KEY "AIzaSyDXcJgq_AMT5vlylZS2_rliSZ1r9xT18xw"

// Wi-Fi credentials
#define WIFI_SSID "CLARO_2GF9CCCB"
#define WIFI_PASSWORD "5DF9CCCB"

#include "DHT.h"

#define DHTPIN 27  // Digital pin connected to the DHT sensor
#define DHTTYPE DHT22  // DHT 22

#define bombOne 25 // Controle da bomba 1
#define bombTwo 33 // Controle da bomba 2
#define bombThree 32 // Controle da bomba 3
const int umidSensorOne = 35; // Sensor de Umidade do Solo 1
const int umidSensorTwo = 34; // Sensor de Umidade do Solo 2
const int umidSensorThree = 39; // Sensor de Umidade do Solo 3

#define ONE_WIRE_BUS 26

OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);

int numberOfDevices;

DeviceAddress tempDeviceAddress; 

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

unsigned long sendDataPrevMillis = 0;
int umidOne = 0;
int umidTwo = 0;
int umidThree = 0;
bool signupOK = false;

bool bombStatus = false;
bool bombOneStatus = false;
bool bombTwoStatus = false;

DHT dht(DHTPIN, DHTTYPE);

void connectToWiFi() {
  Serial.println("Connecting to Wi-Fi...");
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println("\nConnected with IP: " + WiFi.localIP().toString());
}

void setup() {
  pinMode(bombOne, OUTPUT);
  pinMode(bombTwo, OUTPUT);
  pinMode(bombThree, OUTPUT);
  pinMode(umidSensorOne, INPUT);
  pinMode(umidSensorTwo, INPUT);
  pinMode(umidSensorThree, INPUT);
  Serial.begin(115200);
  sensors.begin();
  numberOfDevices = sensors.getDeviceCount();
  dht.begin();

  connectToWiFi();

  config.api_key = API_KEY;
  config.database_url = DATABASE_URL;

  if (Firebase.signUp(&config, &auth, "", "")) {
    Serial.println("Firebase authentication successful");
    signupOK = true;
  } else {
    Serial.printf("Firebase signup error: %s\n", config.signer.signupError.message.c_str());
  }

  config.token_status_callback = tokenStatusCallback;
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}

float roundToOneDecimal(float value) {
  return round(value * 10) / 10.0; // Arredonda para uma casa decimal
}

// Função para converter valores dos sensores de 0-4095 para porcentagem (0-100%)
float convertToPercentage(int sensorValue) {
  return roundToOneDecimal(((4095.0 - sensorValue) / 4095.0) * 100.0);
}

void loop() {
  sensors.requestTemperatures(); 

  float soilTemps[3] = {0.0}; // Array para armazenar as temperaturas dos sensores Dallas
  for (int i = 0; i < 3; i++) { // Considerando que há 3 sensores
    if (sensors.getAddress(tempDeviceAddress, i)) {
      soilTemps[i] = roundToOneDecimal(sensors.getTempC(tempDeviceAddress)); // Arredonda para uma casa decimal
    }
  }

  // Leitura dos sensores de umidade do solo e conversão para porcentagem
  umidOne = analogRead(umidSensorOne);
  umidTwo = analogRead(umidSensorTwo);
  umidThree = analogRead(umidSensorThree);

  float umidOnePercentage = convertToPercentage(umidOne);
  float umidTwoPercentage = convertToPercentage(umidTwo);
  float umidThreePercentage = convertToPercentage(umidThree);

  // Reconnect to Wi-Fi if disconnected
  if (WiFi.status() != WL_CONNECTED) {
    connectToWiFi();
  }

  // Reconnect to Firebase if not ready
  if (!Firebase.ready()) {
    Serial.println("Reconnecting to Firebase...");
    Firebase.begin(&config, &auth);
  }

  // Delay for sensor stability and reduce server load
  delay(1000);

  // Read temperature and humidity
  float humid = dht.readHumidity();
  float temp = dht.readTemperature();

  if (isnan(humid) || isnan(temp)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  // Send data to Firebase at defined intervals
  if (Firebase.ready() && signupOK && (millis() - sendDataPrevMillis > 3000 || sendDataPrevMillis == 0)) {
    sendDataPrevMillis = millis();

    // Send DHT22 data
    if (Firebase.RTDB.setFloat(&fbdo, "moduleOne/temp", temp)) {
      Serial.println("Temperature DHT22: " + String(temp));
    } else {
      Serial.println("Failed to send temperature. Reason: " + fbdo.errorReason());
    }

    if (Firebase.RTDB.setFloat(&fbdo, "moduleOne/humid", humid)) {
      Serial.println("Humidity DHT22: " + String(humid));
    } else {
      Serial.println("Failed to send humidity. Reason: " + fbdo.errorReason());
    }

    // Enviar umidade do solo convertida para porcentagem
    if (Firebase.RTDB.setFloat(&fbdo, "moduleOne/umidSoil", umidOnePercentage)) {
      Serial.println("Humidity soil module One: " + String(umidOnePercentage) + "%");
    } else {
      Serial.println("Failed to send humidity. Reason: " + fbdo.errorReason());
    }

    if (Firebase.RTDB.setFloat(&fbdo, "moduleTwo/umidSoil", umidTwoPercentage)) {
      Serial.println("Humidity soil module Two: " + String(umidTwoPercentage) + "%");
    } else {
      Serial.println("Failed to send humidity. Reason: " + fbdo.errorReason());
    }

    if (Firebase.RTDB.setFloat(&fbdo, "moduleThree/umidSoil", umidThreePercentage)) {
      Serial.println("Humidity soil module Three: " + String(umidThreePercentage) + "%");
    } else {
      Serial.println("Failed to send humidity. Reason: " + fbdo.errorReason());
    }

    // Update bomb statuses from Firebase
    if (Firebase.RTDB.getBool(&fbdo, "moduleOne/bomb")) {
      bombStatus = fbdo.boolData();
      digitalWrite(bombOne, bombStatus);
      Serial.println("Bomb one status: " + String(bombStatus));
    } else {
      Serial.println("Failed to get bomb one status. Reason: " + fbdo.errorReason());
    }

    if (Firebase.RTDB.getBool(&fbdo, "moduleTwo/bomb")) {
      bombOneStatus = fbdo.boolData();
      digitalWrite(bombTwo, bombOneStatus);
      Serial.println("Bomb two status: " + String(bombOneStatus));
    } else {
      Serial.println("Failed to get bomb two status. Reason: " + fbdo.errorReason());
    }

    if (Firebase.RTDB.getBool(&fbdo, "moduleThree/bomb")) {
      bombTwoStatus = fbdo.boolData();
      digitalWrite(bombThree, bombTwoStatus);
      Serial.println("Bomb three status: " + String(bombTwoStatus));
    } else {
      Serial.println("Failed to get bomb three status. Reason: " + fbdo.errorReason());
    }

    for (int i = 0; i < 3; i++) {
      String path = "module" + String(i == 0 ? "One" : (i == 1 ? "Two" : "Three")) + "/tempSoil"; 
      if (Firebase.RTDB.setFloat(&fbdo, path.c_str(), soilTemps[i])) {
        Serial.println("Temperature soil (module " + String(i + 1) + "): " + String(soilTemps[i]));
      } else {
        Serial.println("Failed to send soil temperature for module " + String(i + 1) + ". Reason: " + fbdo.errorReason());
      }
    }
  }
}