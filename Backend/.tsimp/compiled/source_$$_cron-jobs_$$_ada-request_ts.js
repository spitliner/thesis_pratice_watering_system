/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios';
import typia from 'typia';
const adaConnect = {
    async getFeedData(username, deviceID, feedName, key) {
        try {
            const result = await axios.get(`https://io.adafruit.com/api/v2/${username}/feeds/${feedName}/data`, {
                headers: {
                    'X-AIO-Key': key,
                },
            });
            const resultArray = result.data;
            if (!typia.is(resultArray)) {
                return [];
            }
            const insertData = resultArray.map(dataPoint => ({
                id: dataPoint.id,
                deviceID,
                time: new Date(dataPoint.created_epoch * 1000),
                data: dataPoint.value,
            }));
            return insertData;
        }
        catch (error) {
            console.log(error);
            return [];
        }
    },
    async triggerPumpSchedule(username, feedName, key, time) {
        try {
            await axios.post(`https://io.adafruit.com/api/v2/${username}/feeds/${feedName}/data`, {
                value: 'ON',
            }, {
                headers: {
                    'X-AIO-Key': key,
                },
            });
            const waitTime = Number(time) * 1000;
            setTimeout(async () => {
                await axios.post(`https://io.adafruit.com/api/v2/${username}/feeds/${feedName}/data`, {
                    value: 'OFF',
                }, {
                    headers: {
                        'X-AIO-Key': key,
                    },
                });
            }, waitTime);
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    },
    async modifiedStatus(username, feedName, key, value) {
        try {
            await axios.post(`https://io.adafruit.com/api/v2/${username}/feeds/${feedName}/data`, {
                value,
            }, {
                headers: {
                    'X-AIO-Key': key,
                },
            });
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    },
};
export default adaConnect;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRhLXJlcXVlc3QuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvYXAxL0Rlc2t0b3AvVGhlc2lzL3RoZXNpc19wcmF0aWNlX3dhdGVyaW5nX3N5c3RlbS9CYWNrZW5kL3NvdXJjZS8iLCJzb3VyY2VzIjpbImNyb24tam9icy9hZGEtcmVxdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSx5REFBeUQ7QUFDekQsT0FBTyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBQzFCLE9BQU8sS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUUxQixNQUFNLFVBQVUsR0FBRztJQUNmLEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBZ0IsRUFBRSxRQUFnQixFQUFFLFFBQWdCLEVBQUUsR0FBVztRQUMvRSxJQUFJLENBQUM7WUFDRCxNQUFNLE1BQU0sR0FBRyxNQUFNLEtBQUssQ0FBQyxHQUFHLENBQUMsa0NBQWtDLFFBQVEsVUFBVSxRQUFRLE9BQU8sRUFBRTtnQkFDaEcsT0FBTyxFQUFFO29CQUNMLFdBQVcsRUFBRSxHQUFHO2lCQUNuQjthQUNKLENBQUMsQ0FBQztZQUVILE1BQU0sV0FBVyxHQUFZLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDekMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBUVQsV0FBVyxDQUFDLEVBQUUsQ0FBQztnQkFDZixPQUFPLEVBQUUsQ0FBQztZQUNkLENBQUM7WUFFRCxNQUFNLFVBQVUsR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDN0MsRUFBRSxFQUFFLFNBQVMsQ0FBQyxFQUFFO2dCQUNoQixRQUFRO2dCQUNSLElBQUksRUFBRSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztnQkFDOUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxLQUFLO2FBQ3hCLENBQUMsQ0FBQyxDQUFDO1lBQ0osT0FBTyxVQUFVLENBQUM7UUFDdEIsQ0FBQztRQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7WUFDYixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25CLE9BQU8sRUFBRSxDQUFDO1FBQ2QsQ0FBQztJQUNMLENBQUM7SUFFRCxLQUFLLENBQUMsbUJBQW1CLENBQUMsUUFBZ0IsRUFBRSxRQUFnQixFQUFFLEdBQVcsRUFBRSxJQUFZO1FBQ25GLElBQUksQ0FBQztZQUNELE1BQU0sS0FBSyxDQUFDLElBQUksQ0FBQyxrQ0FBa0MsUUFBUSxVQUFVLFFBQVEsT0FBTyxFQUNoRjtnQkFDSSxLQUFLLEVBQUUsSUFBSTthQUNkLEVBQUU7Z0JBQ0MsT0FBTyxFQUFFO29CQUNMLFdBQVcsRUFBRSxHQUFHO2lCQUNuQjthQUNKLENBQUMsQ0FBQztZQUNQLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDckMsVUFBVSxDQUFDLEtBQUssSUFBSSxFQUFFO2dCQUNsQixNQUFNLEtBQUssQ0FBQyxJQUFJLENBQUMsa0NBQWtDLFFBQVEsVUFBVSxRQUFRLE9BQU8sRUFDaEY7b0JBQ0ksS0FBSyxFQUFFLEtBQUs7aUJBQ2YsRUFBRTtvQkFDQyxPQUFPLEVBQUU7d0JBQ0wsV0FBVyxFQUFFLEdBQUc7cUJBQ25CO2lCQUNKLENBQUMsQ0FBQztZQUNYLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUNiLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuQixPQUFPLEtBQUssQ0FBQztRQUNqQixDQUFDO0lBQ0wsQ0FBQztJQUVELEtBQUssQ0FBQyxjQUFjLENBQUMsUUFBZ0IsRUFBRSxRQUFnQixFQUFFLEdBQVcsRUFBRSxLQUFhO1FBQy9FLElBQUksQ0FBQztZQUNELE1BQU0sS0FBSyxDQUFDLElBQUksQ0FBQyxrQ0FBa0MsUUFBUSxVQUFVLFFBQVEsT0FBTyxFQUNoRjtnQkFDSSxLQUFLO2FBQ1IsRUFBRTtnQkFDQyxPQUFPLEVBQUU7b0JBQ0wsV0FBVyxFQUFFLEdBQUc7aUJBQ25CO2FBQ0osQ0FBQyxDQUFDO1lBQ1AsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7WUFDYixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25CLE9BQU8sS0FBSyxDQUFDO1FBQ2pCLENBQUM7SUFDTCxDQUFDO0NBQ0osQ0FBQztBQUVGLGVBQWUsVUFBVSxDQUFDIn0=