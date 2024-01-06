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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3Jvbi1yZXF1ZXN0LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2FwMS9EZXNrdG9wL1RoZXNpcy90aGVzaXNfcHJhdGljZV93YXRlcmluZ19zeXN0ZW0vQmFja2VuZC9zb3VyY2UvIiwic291cmNlcyI6WyJjcm9uLWpvYnMvY3Jvbi1yZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sSUFBSSxNQUFNLE1BQU0sQ0FBQztBQUN4QixPQUFPLGdCQUFnQixNQUFNLHNDQUFzQyxDQUFDO0FBRXBFLE1BQU0sQ0FBQyxNQUFNLFdBQVcsR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDckUsS0FBSyxnQkFBZ0IsQ0FBQyxhQUFhLEVBQUUsQ0FBQztBQUMxQyxDQUFDLENBQUMsQ0FBQztBQUVILE1BQU0sQ0FBQyxNQUFNLGVBQWUsR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ3hFLE1BQU0sV0FBVyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7SUFDL0IsTUFBTSxXQUFXLEdBQUcsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLFdBQVcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBRXBJLEtBQUssZ0JBQWdCLENBQUMsc0JBQXNCLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDOUQsQ0FBQyxDQUFDLENBQUMifQ==