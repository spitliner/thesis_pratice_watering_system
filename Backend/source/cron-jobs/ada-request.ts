/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios';
import typia from 'typia';

const adaConnect = {
    async getFeedData(username: string, deviceID: string, feedName: string, key: string) {
        try {
            const result = await axios.get(`https://io.adafruit.com/api/v2/${username}/feeds/${feedName}/data`, {
                headers: {
                    'X-AIO-Key': key,
                },
            });

            const resultArray: unknown = result.data;
            if (!typia.is<Array<{
                id: string;
                value: string;
                feed_id: number;
                feed_key: string;
                created_at: string;
                created_epoch: number;
                expiration: string;
            }>>(resultArray)) {
                return [];
            }

            const insertData = resultArray.map(dataPoint => ({
                id: dataPoint.id,
                deviceID,
                time: new Date(dataPoint.created_epoch * 1000),
                data: dataPoint.value,
            }));
            return insertData;
        } catch (error) {
            console.log(error);
            return [];
        }
    },

    async triggerPumpSchedule(username: string, feedName: string, key: string, time: string) {
        try {
            await axios.post(`https://io.adafruit.com/api/v2/${username}/feeds/${feedName}/data`,
                {
                    value: 'ON',
                }, {
                    headers: {
                        'X-AIO-Key': key,
                    },
                });
            const waitTime = Number(time) * 1000;
            setTimeout(async () => {
                await axios.post(`https://io.adafruit.com/api/v2/${username}/feeds/${feedName}/data`,
                    {
                        value: 'OFF',
                    }, {
                        headers: {
                            'X-AIO-Key': key,
                        },
                    });
            }, waitTime);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    },

    async modifiedStatus(username: string, feedName: string, key: string, value: string) {
        try {
            await axios.post(`https://io.adafruit.com/api/v2/${username}/feeds/${feedName}/data`,
                {
                    value,
                }, {
                    headers: {
                        'X-AIO-Key': key,
                    },
                });
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
};

export default adaConnect;
