/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios';
import typia from 'typia';
const adaConnect = {
    async getFeedData(username, feedName, key) {
        try {
            const result = await axios.get(`https://io.adafruit.com/api/v2/${username}/feeds/${feedName}/data`, {
                headers: {
                    'X-AIO-Key': key,
                },
            });
            const resultArray = result.data;
            if (!(input => {
                const $io0 = input => "string" === typeof input.id && "string" === typeof input.value && "number" === typeof input.feed_id && "string" === typeof input.feed_key && "string" === typeof input.created_at && "number" === typeof input.created_epoch && "string" === typeof input.expiration;
                return Array.isArray(input) && input.every(elem => "object" === typeof elem && null !== elem && $io0(elem));
            })(resultArray)) {
                return [];
            }
            const insertData = resultArray.map(dataPoint => ({
                id: dataPoint.id,
                deviceID: dataPoint.feed_key,
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
    async triggerPump(username, feedName, key, time) {
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
};
export default adaConnect;
