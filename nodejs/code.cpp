#include "DHT.h"
#include <WiFi.h>
#include <HTTPClient.h>

const char *ssid = "P314 B9-2G";
const char *password = "31411111";
#define DHTPIN 26     // what digital pin the DHT sensor is connected to
#define DHTTYPE DHT11 // there are multiple kinds of DHT sensors

DHT dht(DHTPIN, DHTTYPE);

void setup()
{
    Serial.begin(115200);
    Serial.println("DHTxx test!");
    dht.begin();
    WiFi.begin(ssid, password);
    Serial.println("Connecting");
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(5000);
        Serial.println("Connecting to WiFi..");
    }
    Serial.println("Connected to the WiFi network");
}
void sendRequest(float temperature, float humidity)
{
    if (WiFi.status() == WL_CONNECTED)
    {
        HTTPClient http;
        http.begin("http://192.168.1.3:27017/dht11?temp=" + String(temperature) + "&humid=" + String(humidity));
        http.addHeader("Content-Type", "text/plain");
        int httpResponseCode = http.POST("request create dht11 data");
        if (httpResponseCode == 200)
        {
            Serial.println("Success");
        }
        else
        {
            Serial.println("Error");
        }
    }
}
void loop()
{
    delay(2000);

    float h = dht.readHumidity();
    float t = dht.readTemperature();

    if (isnan(h) || isnan(t))
    {
        Serial.println("Failed to read from DHT sensor!");
        return;
    }
    Serial.print("Humidity: ");
    Serial.print(h);
    Serial.print(" %\t");
    Serial.print("Temperature: ");
    Serial.print(t);
    Serial.println(" *C ");
    sendRequest(t, h);
}