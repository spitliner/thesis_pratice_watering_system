import axios from "axios";
const adaConnect = {
    async getFeedData(username, feedName, key) {
        try {
            const result = await axios.get(`https://io.adafruit.com/api/v2/${username}/feeds/${feedName}/data`, {
                headers: {
                    "X-AIO-Key": key,
                }
            });
            const resultArr = result.data;
            const insertData = resultArr.map(dataPoint => {
                return {
                    id: dataPoint.id,
                    deviceID: dataPoint.feed_key,
                    time: new Date(dataPoint.created_epoch * 1000),
                    data: dataPoint.value
                };
            });
            return insertData;
        }
        catch (error) {
            console.log(error);
            return [];
        }
    },
    async triggerPump(username, feedName, key, time) {
        try {
            axios.post(`https://io.adafruit.com/api/v2/${username}/feeds/${feedName}/data`, {
                value: 'ON'
            }, {
                headers: {
                    "X-AIO-Key": key,
                }
            });
            const waitTime = Number(time);
            setTimeout(() => { }, waitTime);
            axios.post(`https://io.adafruit.com/api/v2/${username}/feeds/${feedName}/data`, {
                value: 'OFF'
            }, {
                headers: {
                    "X-AIO-Key": key,
                }
            });
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
};
export default adaConnect;
