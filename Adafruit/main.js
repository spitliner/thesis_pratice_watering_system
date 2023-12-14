const mqtt = require("mqtt");
const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

const client = mqtt.connect("mqtt://io.adafruit.com", {
  username: "viluong",
  password: "aio_RIdw74keavoQzqvfKWHrisPfscjr",
});

const AIO_FEEDS = ["temperature", "humidity", "auto-watering"];
const AIO_USERNAME = "viluong";

const topic_water = "viluong/feeds/auto-watering";
const topic_temp = "viluong/feeds/temperature";
const topic_humid = "viluong/feeds/humidity";

const topics = AIO_FEEDS.map((feed) => `${AIO_USERNAME}/feeds/${feed}`);

client.on("connect", () => {
  console.log("Connected to Adafruit IO");
  topics.forEach((topic) => {
    client.subscribe(topic, (err) => {
      if (!err) {
        console.log(`Subscribed to ${topic} feed`);
      } else {
        console.log(`Error: `, err);
      }
    });
  });
});

client.on("message", (receivedTopic, message) => {
  console.log(`Received data on topic ${receivedTopic}: ${message.toString()}`);
});

client.on("error", (error) => {
  console.error("Error:", error);
});

const defaultWaterStatus = "OFF";
client.publish(topic_water, defaultWaterStatus);

const schedules = [["15:59", "30"]];

setInterval(() => {
  const startTime = schedules[0][0];
  const offTime = dayjs(startTime, "HH:mm")
    .add(Number(schedules[0][1]), "second")
    .format("HH:mm");

  AIO_FEEDS.forEach((feed) => {
    const topic = `${AIO_USERNAME}/feeds/${feed}`;
    const time = dayjs().format("HH:mm");
    if (topic === topic_water) {
      if (time === startTime) {
        client.publish(topic, "ON");
      }
      if (time === offTime) {
        client.publish(topic, "OFF");
      }
    }
  });
}, 60000);
