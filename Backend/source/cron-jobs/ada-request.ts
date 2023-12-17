import axios from 'axios';

const adaConnect = {
    async getFeedData(username: string, feedName: string, key : string) {
        try {
            const result = await axios.get(`https://io.adafruit.com/api/v2/${username}/feeds/${feedName}/data`, {
                headers: {
                    'X-AIO-Key': key,
                }
            });
            const resultArray: [{
                id: string,
                value: string,
                feed_id: number,
                feed_key: string,
                created_at: string,
                created_epoch: number,
                expiration: string
            }] = result.data;
            const insertData = resultArray.map(dataPoint => ({
                id: dataPoint.id,
                deviceID: dataPoint.feed_key,
                time: new Date(dataPoint.created_epoch * 1000),
                data: dataPoint.value,
            }));
            return insertData;
        } catch (error) {
            console.log(error);
            return [];
        }
    },

    async triggerPump(username: string, feedName: string, key : string, time: string) {
        try {
            await axios.post(`https://io.adafruit.com/api/v2/${username}/feeds/${feedName}/data`, 
                {
                    value: 'ON',
                }, {
                    headers: {
                        'X-AIO-Key': key,
                    },
                });
            const waitTime = Number(time);
            setTimeout(() => {}, waitTime);
            await axios.post(`https://io.adafruit.com/api/v2/${username}/feeds/${feedName}/data`, 
                {
                    value: 'OFF',
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
