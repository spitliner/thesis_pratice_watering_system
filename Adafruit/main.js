// Adafruit account used for project:
// username: viluong
// password: 1234512345ok

const mqtt = require("mqtt");
const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

const client = mqtt.connect("mqtt://io.adafruit.com", {
  username: "viluong",
  password: "aio_fLfl64UWIyKSaWJIV3bVOsUK2jxn",
});

const AIO_FEEDS = ["temperature", "humidity", "auto-watering"];
const AIO_USERNAME = "viluong";

const topic_water = "viluong/feeds/auto-watering";
const topic_temp = "viluong/feeds/temperature";
const topic_humid = "viluong/feeds/humidity";

const topics = AIO_FEEDS.map((feed) => `${AIO_USERNAME}/feeds/${feed}`);

let pumpState = ""; // Keep track of the last received state

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

// Data receive from adafruit
client.on("message", (receivedTopic, message) => {
  console.log(`Received data on topic ${receivedTopic}: ${message.toString()}`);
  if (receivedTopic === topic_water) pumpState = message.toString();
});

client.on("error", (error) => {
  console.error("Error:", error);
});

// send default status to adafruit
const default_pump_status = "OFF";
client.publish(topic_water, default_pump_status);

// schedules receive from Backend
const schedules = [[dayjs().format("HH:mm"), "30"]];

// update data every 10s
setInterval(() => {
  const startTime = schedules[0][0];
  const duration = Number(schedules[0][1]);
  const currentTime = dayjs().format("HH:mm");

  // duration from start time to current
  const timeDifference = dayjs().diff(dayjs(startTime, "HH:mm"), "seconds");

  // send data to adafruit
  AIO_FEEDS.forEach((feed) => {
    const topic = `${AIO_USERNAME}/feeds/${feed}`;

    // if (topic === topic_water) {
    //   if (
    //     currentTime === startTime &&
    //     timeDifference < duration &&
    //     pumpState !== "ON"
    //   ) {
    //     console.log("Turn on pump");
    //     client.publish(topic, "ON");
    //   }

    //   if (timeDifference >= duration && pumpState !== "OFF") {
    //     console.log("Turn off pump");
    //     client.publish(topic, "OFF");
    //   }
    // }
    const value = Math.round(Math.random() * 100).toFixed();
    console.log(`upload data to ${topic}: `, value);
    client.publish(topic, value);
  });
}, 55000);
