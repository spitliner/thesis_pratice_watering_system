import cron from "cron";
import deviceController from "../controllers/device_controllers.js";

const pollingJob = new cron.CronJob("0 */1 * * * *", async () => {
    const currentTime = new Date();
    const triggerTime  = currentTime.getHours().toString().padStart(2, "0") + ":" + currentTime.getMinutes().toString().padStart(2, "0");

    deviceController.triggerDeviceSchedules(triggerTime);
});

export default pollingJob;
