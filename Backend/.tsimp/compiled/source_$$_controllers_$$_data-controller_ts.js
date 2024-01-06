/* eslint-disable unicorn/explicit-length-check */
import dataModel from '../database/models/data-model.js';
import deviceModel from '../database/models/device-model.js';
const dataController = {
    async getData(deviceID, userID) {
        try {
            const deviceData = await deviceModel.getDeviceData(deviceID);
            if (null === deviceData) {
                return {
                    error: 'Device not found',
                };
            }
            if (userID !== deviceData.userID) {
                return {
                    error: 'Device not belong to user',
                };
            }
            return await dataModel.getData(deviceID);
        }
        catch (error) {
            console.log(error);
            return {
                error: 'Database error',
            };
        }
    },
    async getDataWithin(deviceID, userID, afterDate) {
        try {
            const deviceData = await deviceModel.getDevice(deviceID);
            if (null === deviceData) {
                return {
                    error: 'Device not found',
                };
            }
            if (userID !== deviceData.userID) {
                return {
                    error: 'Device not belong to user',
                };
            }
            return await dataModel.getDataWithin(deviceID, afterDate);
        }
        catch (error) {
            console.log(error);
            return {
                error: 'Database error',
            };
        }
    },
    async insertFeed(deviceID, userID, feed) {
        try {
            if (0 === feed.length) {
                return {
                    error: 'No data to insert',
                };
            }
            const deviceData = await deviceModel.getDevice(deviceID);
            if (null === deviceData) {
                return {
                    error: 'Device not found',
                };
            }
            if (userID !== deviceData.userID) {
                return {
                    error: 'Device not belong to user',
                };
            }
            return {
                result: await dataModel.insertData(feed),
            };
        }
        catch (error) {
            console.log(error);
            return {
                error: 'Database error',
            };
        }
    },
};
export default dataController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2FwMS9EZXNrdG9wL1RoZXNpcy90aGVzaXNfcHJhdGljZV93YXRlcmluZ19zeXN0ZW0vQmFja2VuZC9zb3VyY2UvIiwic291cmNlcyI6WyJjb250cm9sbGVycy9kYXRhLWNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsa0RBQWtEO0FBQ2xELE9BQU8sU0FBUyxNQUFNLGtDQUFrQyxDQUFDO0FBQ3pELE9BQU8sV0FBVyxNQUFNLG9DQUFvQyxDQUFDO0FBRTdELE1BQU0sY0FBYyxHQUFHO0lBQ25CLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBZ0IsRUFBRSxNQUFjO1FBQzFDLElBQUksQ0FBQztZQUNELE1BQU0sVUFBVSxHQUFHLE1BQU0sV0FBVyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM3RCxJQUFJLElBQUksS0FBSyxVQUFVLEVBQUUsQ0FBQztnQkFDdEIsT0FBTztvQkFDSCxLQUFLLEVBQUUsa0JBQWtCO2lCQUM1QixDQUFDO1lBQ04sQ0FBQztZQUVELElBQUksTUFBTSxLQUFLLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDL0IsT0FBTztvQkFDSCxLQUFLLEVBQUUsMkJBQTJCO2lCQUNyQyxDQUFDO1lBQ04sQ0FBQztZQUVELE9BQU8sTUFBTSxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzdDLENBQUM7UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuQixPQUFPO2dCQUNILEtBQUssRUFBRSxnQkFBZ0I7YUFDMUIsQ0FBQztRQUNOLENBQUM7SUFDTCxDQUFDO0lBRUQsS0FBSyxDQUFDLGFBQWEsQ0FBQyxRQUFnQixFQUFFLE1BQWMsRUFBRSxTQUFlO1FBQ2pFLElBQUksQ0FBQztZQUNELE1BQU0sVUFBVSxHQUFHLE1BQU0sV0FBVyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN6RCxJQUFJLElBQUksS0FBSyxVQUFVLEVBQUUsQ0FBQztnQkFDdEIsT0FBTztvQkFDSCxLQUFLLEVBQUUsa0JBQWtCO2lCQUM1QixDQUFDO1lBQ04sQ0FBQztZQUVELElBQUksTUFBTSxLQUFLLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDL0IsT0FBTztvQkFDSCxLQUFLLEVBQUUsMkJBQTJCO2lCQUNyQyxDQUFDO1lBQ04sQ0FBQztZQUVELE9BQU8sTUFBTSxTQUFTLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUM5RCxDQUFDO1FBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztZQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbkIsT0FBTztnQkFDSCxLQUFLLEVBQUUsZ0JBQWdCO2FBQzFCLENBQUM7UUFDTixDQUFDO0lBQ0wsQ0FBQztJQUVELEtBQUssQ0FBQyxVQUFVLENBQUMsUUFBZ0IsRUFBRSxNQUFjLEVBQUUsSUFBcUU7UUFDcEgsSUFBSSxDQUFDO1lBQ0QsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNwQixPQUFPO29CQUNILEtBQUssRUFBRSxtQkFBbUI7aUJBQzdCLENBQUM7WUFDTixDQUFDO1lBRUQsTUFBTSxVQUFVLEdBQUcsTUFBTSxXQUFXLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3pELElBQUksSUFBSSxLQUFLLFVBQVUsRUFBRSxDQUFDO2dCQUN0QixPQUFPO29CQUNILEtBQUssRUFBRSxrQkFBa0I7aUJBQzVCLENBQUM7WUFDTixDQUFDO1lBRUQsSUFBSSxNQUFNLEtBQUssVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUMvQixPQUFPO29CQUNILEtBQUssRUFBRSwyQkFBMkI7aUJBQ3JDLENBQUM7WUFDTixDQUFDO1lBRUQsT0FBTztnQkFDSCxNQUFNLEVBQUUsTUFBTSxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQzthQUMzQyxDQUFDO1FBQ04sQ0FBQztRQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7WUFDYixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25CLE9BQU87Z0JBQ0gsS0FBSyxFQUFFLGdCQUFnQjthQUMxQixDQUFDO1FBQ04sQ0FBQztJQUNMLENBQUM7Q0FDSixDQUFDO0FBRUYsZUFBZSxjQUFjLENBQUMifQ==