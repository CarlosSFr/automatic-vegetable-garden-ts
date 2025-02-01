#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include <TFT_eSPI.h>

// Credenciais do Wi-Fi
#define WIFI_SSID "CLARO_2GF9CCCB"
#define WIFI_PASSWORD "5DF9CCCB"

// Configuração do Firebase
#define API_KEY "AIzaSyDXcJgq_AMT5vlylZS2_rliSZ1r9xT18xw"
#define DATABASE_URL "https://automatic-garden-824cc-default-rtdb.firebaseio.com"

// Objetos do Firebase
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

bool firebaseConectado = false;

// Configuração da tela TFT
TFT_eSPI tft = TFT_eSPI();

void connectToWiFi() {
  Serial.print("Conectando ao Wi-Fi...");
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }

  Serial.println("\nConectado ao Wi-Fi com IP: " + WiFi.localIP().toString());
}

void connectToFirebase() {
  Serial.println("Conectando ao Firebase...");
  
  config.api_key = API_KEY;
  config.database_url = DATABASE_URL;

  // Tentativa de autenticação anônima
  if (Firebase.signUp(&config, &auth, "", "")) {
    Serial.println("Autenticado no Firebase com sucesso!");
    firebaseConectado = true;
  } else {
    Serial.println("Falha na autenticação: " + String(config.signer.signupError.message.c_str()));
    firebaseConectado = false;
  }

  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}

void setup() {
  Serial.begin(115200);

  // Inicializar tela TFT
  tft.init();
  tft.setRotation(1);
  tft.fillScreen(TFT_BLACK);
  tft.setTextColor(TFT_WHITE, TFT_BLACK);
  tft.setTextSize(2);

  // Conectar ao Wi-Fi
  connectToWiFi();

  // Conectar ao Firebase
  connectToFirebase();
}

void exibirDadosNaTela(float temperatura, float umidade, float umidSoil) {
  tft.fillScreen(TFT_BLACK); // Limpa a tela
  tft.setCursor(10, 30);
  tft.print("Temperatura: " + String(temperatura) + "C");

  tft.setCursor(10, 60);
  tft.print("Umidade: " + String(umidade) + "%");

  tft.setCursor(10, 90);
  tft.print("Umid. Solo: " + String(umidSoil) + "%");
}

void loop() {
  float temperatura = 0, umidade = 0, umidSoil = 0;

  // Revalidar conexão com Wi-Fi se cair
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("Reconectando ao Wi-Fi...");
    connectToWiFi();
  }

  // Revalidar conexão com Firebase se cair
  if (!Firebase.ready()) {
    Serial.println("Firebase desconectado. Tentando reconectar...");
    connectToFirebase();
    delay(2000); // Pequena pausa antes de continuar
  }

  // Ler temperatura
  if (Firebase.RTDB.getFloat(&fbdo, "moduleOne/temp")) {
    temperatura = fbdo.floatData();
    Serial.println("Temperatura: " + String(temperatura) + "C");
  } else {
    Serial.println("Erro ao obter temperatura: " + fbdo.errorReason());
  }

  // Ler umidade
  if (Firebase.RTDB.getFloat(&fbdo, "moduleOne/humid")) {
    umidade = fbdo.floatData();
    Serial.println("Umidade: " + String(umidade) + "%");
  } else {
    Serial.println("Erro ao obter umidade: " + fbdo.errorReason());
  }

  // Ler umidade do solo
  if (Firebase.RTDB.getFloat(&fbdo, "moduleOne/umidSoil")) {
    umidSoil = fbdo.floatData();
    Serial.println("Umidade do Solo: " + String(umidSoil) + "%");
  } else {
    Serial.println("Erro ao obter umidade do solo: " + fbdo.errorReason());
  }

  // Exibir os valores na tela TFT
  exibirDadosNaTela(temperatura, umidade, umidSoil);

  delay(5000); // Atualiza a cada 5 segundos
}
