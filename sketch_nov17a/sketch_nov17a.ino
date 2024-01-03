#include "DHT.h"
#include <WiFi.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

#define SCREEN_WIDTH 128 // OLED display width, in pixels
#define SCREEN_HEIGHT 64 // OLED display height, in pixels
// Declaration for an SSD1306 display connected to I2C (SDA, SCL pins)
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);


const char *ssid = "P314 B9-2G";
const char *password = "31411111";
#define DHTPIN 26     // what digital pin the DHT sensor is connected to
#define DHTTYPE DHT11 // there are multiple kinds of DHT sensors

DHT dht(DHTPIN, DHTTYPE);

const char *serverIp = "192.168.1.16";
const int serverPort = 3000;

void setup() {
    Serial.begin(115200);
    dht.begin();
    
    WiFi.begin(ssid, password);

    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.println("Connecting to WiFi...");
    }

    Serial.println("Connected to WiFi");
    if(!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) { // Address 0x3D for 128x64
    Serial.println(F("SSD1306 allocation failed"));
    for(;;);
  }
  delay(2000);
  display.clearDisplay();

  display.setTextSize(1);
  display.setTextColor(WHITE);
  display.setCursor(0, 10);
  // Display static text
  display.println("Hello, world!");
  display.display(); 
}

void sendRequest(float temperature, float humidity) {
    if (WiFi.status() == WL_CONNECTED) {
        WiFiClient client;
        
        // Use String formatting for a cleaner URL
        String url = "http://192.168.1.16:3000/dht11?temperature=" + String(temperature) + "&humidity=" + String(humidity);

        // Print the URL for debugging
        Serial.print("Sending request to: ");
        Serial.println(url);

        // Connect to the server
        if (client.connect(serverIp, serverPort)) {
            // Send HTTP request
            client.println("POST " + url + " HTTP/1.1");
            client.println("Host: " + String(serverIp));
            client.println("Connection: close");
            client.println("Content-Type: application/x-www-form-urlencoded");
            client.println();

            // Read the response
            while (client.connected()) {
                String line = client.readStringUntil('\r');
                Serial.print(line);
            }
            client.stop();
        } else {
            Serial.println("Failed to connect to the server");
        }
    } else {
        Serial.println("Not connected to WiFi");
    }
}

void loop() {
    delay(2000);

    float h = dht.readHumidity();
    float t = dht.readTemperature();

    if (isnan(h) || isnan(t)) {
        Serial.println("Failed to read from DHT sensor!");
        return;
    }

    Serial.print("Humidity: ");
    Serial.print(h);
    Serial.print(" %\t");
    Serial.print("Temperature: ");
    Serial.print(t);
    Serial.println(" *C ");
display.clearDisplay();
display.setCursor(0, 10);
display.println("Temperature: " + String(h) + " °C");
display.println("Humidity: " + String(t) + " %");
display.display();
    sendRequest(t, h);
}
