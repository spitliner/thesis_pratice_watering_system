import cron from 'cron';
import deviceController from '../controllers/device-controllers.js';

export const pollingFeed = new cron.CronJob('30 */1 * * * *', async () => {
    void deviceController.getDeviceFeed();
});

export const pollingSchedule = new cron.CronJob('0 */1 * * * *', async () => {
    const currentTime = new Date();
    const triggerTime = currentTime.getHours().toString().padStart(2, '0') + ':' + currentTime.getMinutes().toString().padStart(2, '0');

    void deviceController.triggerDeviceSchedules(triggerTime);
});
