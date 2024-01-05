#include <SPI.h>
#include <MFRC522.h>
#include <ESP32Servo.h>
#include <WiFi.h>
#include "PubSubClient.h"
#include <string.h>
#define RST_PIN         4
#define SS_PIN          5

int UID[4];
int ID1[4] = {179, 42, 138, 253}; // RFID card identifier
Servo MyServo;
static const int servoPin = 13;
MFRC522 mfrc522(SS_PIN, RST_PIN); 
const char* ssid = "StrongerDSLab";
const char* password = "dslab123";
const char* mqttServer = "broker.hivemq.com";
int port = 1883;
WiFiClient espClient;
PubSubClient client(espClient);
String stMac;
char mac[50];
char clientId[50];
int status_door = 0;
int dem = 0;

void setup() 
{  
  Serial.begin(115200);
  randomSeed(analogRead(0));

  delay(10);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  wifiConnect();
  Serial.println(WiFi.localIP());
  Serial.println(WiFi.macAddress());
  stMac = WiFi.macAddress();
  stMac.replace(":", "_");
  Serial.println(stMac);
  client.setServer(mqttServer, port);
  client.setCallback(callback);

  MyServo.attach(servoPin);
  SPI.begin();    
  mfrc522.PCD_Init();
}

void wifiConnect() {
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
}

void mqttReconnect() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    long r = random(1000);
    sprintf(clientId, "clientId-%ld", r);
    
    if (client.connect(clientId)) {
      Serial.print(clientId);
      // client.publish("team_tung_bien_manh_duc_from_device", "hello world");
      client.subscribe("team_tung_bien_manh_duc_to_device");
      Serial.println(" connected");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}
void openDoorByMrfc(){
  Serial.print(status_door);
  if (status_door == 1) {
      MyServo.write(90);
    } else if (status_door == 2) {
      MyServo.write(-90);
    }

  status_door = 0; 
   if (!mfrc522.PICC_IsNewCardPresent()) { 
    return; 
  }

  if (!mfrc522.PICC_ReadCardSerial()) {  
    return;  
  }

  Serial.print("UID của thẻ: ");   

  for (byte i = 0; i < mfrc522.uid.size; i++) { 
    Serial.print(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " ");   
    UID[i] = mfrc522.uid.uidByte[i];
    Serial.print(UID[i]);
  }

  Serial.println("   ");

  if (UID[0] == ID1[0] && UID[1] == ID1[1] && UID[2] == ID1[2] && UID[3] == ID1[3]) {
    dem ++;
    // Serial.print("Biến Đếm: ");
    // Serial.println(dem);

    if ((dem % 2) == 1) {
      status_door = 1;
      Serial.println("OPEN");    
    } else {
      status_door = 2;
      Serial.println("CLOSE");       
    }
  } else {
    Serial.println("SAI THẺ........");
  }
   
  delay(10);
  mfrc522.PICC_HaltA();  
  mfrc522.PCD_StopCrypto1();
}
void callback(char* topic, byte* message, unsigned int length) {
  Serial.print("Message arrived on topic: ");
  // Serial.print(topic);
  // Serial.print(". Message: ");
  String stMessage;
  
  for (int i = 0; i < length; i++) {
    if(char(message[i]) == '"') continue;
    // Serial.print((char)message[i]);
    stMessage += (char)message[i];
  }
  Serial.println();

  if (String(topic) == "team_tung_bien_manh_duc_to_device") {
    Serial.print("Changing output to ");
    // Serial.print(stMessage);
    if (String(stMessage) == "open") {
      // Serial.println("open ----");
      status_door = 1;
      // MyServo.write(90);
    } else if (String(stMessage) == "close") {
      // Serial.println("close -----");
      status_door = 2;
      // MyServo.write(-90);
    }
  }
  openDoorByMrfc();
}

void loop() {
  if (!client.connected()) {
    mqttReconnect();
  }

  client.loop();
  // openDoorByMrfc();
 
}
