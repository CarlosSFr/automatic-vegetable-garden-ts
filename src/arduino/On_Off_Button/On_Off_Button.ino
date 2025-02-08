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
#define VERDE_ESCURO 0x04004 // Definição da cor verde escuro no formato RGB565

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
  tft.fillScreen(VERDE_ESCURO);  // Aplica o fundo verde escuro
  tft.setTextColor(TFT_WHITE, VERDE_ESCURO);  // Texto branco sobre fundo verde escuro
  tft.setTextFont(2);

  // Conectar ao Wi-Fi
  connectToWiFi();

  // Conectar ao Firebase
  connectToFirebase();
}

void exibirDadosNaTela(float temperatura, float umidSoil) {
  tft.fillScreen(VERDE_ESCURO); // Limpa a tela mantendo o fundo verde escuro

  tft.drawLine(0, 20, 319, 20, 0x1000);  

  tft.setCursor(10, 30);
  tft.print("Temp. solo modulo 1: " + String(temperatura) + "C");
  tft.setCursor(10, 60);
  tft.print("Umid. solo modulo 1: " + String(umidSoil) + "%");

  // Linha de separação - Ocupa toda a largura da tela (0 a 319)
  tft.drawLine(0, 80, 319, 80, 0x1000);  

  tft.setCursor(10, 90);
  tft.print("Temp. solo modulo 2: " + String(temperatura) + "C");
  tft.setCursor(10, 120);
  tft.print("Umid. solo modulo 2: " + String(umidSoil) + "%");

  // Linha de separação
  tft.drawLine(0, 140, 319, 140, TFT_BLACK);  

  tft.setCursor(10, 150);
  tft.print("Temp. solo modulo 3: " + String(temperatura) + "C");
  tft.setCursor(10, 180);
  tft.print("Umid. solo modulo 3: " + String(umidSoil) + "%");

  // Linha de separação final
  tft.drawLine(0, 200, 319, 200, TFT_BLACK);  
}

void loop() {
  float temperaturaOne = 0, umidSoilOne = 0;

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
  if (Firebase.RTDB.getFloat(&fbdo, "moduleOne/tempSoil")) {
    temperaturaOne = fbdo.floatData();
    Serial.println("Temperatura: " + String(temperaturaOne) + "C");
  } else {
    Serial.println("Erro ao obter temperatura: " + fbdo.errorReason());
  }

  // Ler umidade do solo
  if (Firebase.RTDB.getFloat(&fbdo, "moduleOne/umidSoil")) {
    umidSoilOne = fbdo.floatData();
    Serial.println("Umidade do Solo: " + String(umidSoilOne) + "%");
  } else {
    Serial.println("Erro ao obter umidade do solo: " + fbdo.errorReason());
  }

  // Exibir os valores na tela TFT
  exibirDadosNaTela(temperaturaOne, umidSoilOne);

  delay(5000); // Atualiza a cada 5 segundos
}
