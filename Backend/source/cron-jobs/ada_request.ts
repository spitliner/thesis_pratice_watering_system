import axios from "axios";

const adaConnect = {
    async getFeedData(username: string, feedName: string, key : string) {
        try {
            const result = await axios.get(`https://io.adafruit.com/api/v2/${username}/feeds/${feedName}/data`, {
                headers: {
                    "X-AIO-Key": key,
                }
            });
            const resultArr: [{
                id: string,
                value: string,
                feed_id: number,
                feed_key: string,
                created_at: string,
                created_epoch: number,
                expiration: string
            }] = result.data;
            const insertData = resultArr.map(dataPoint => {
                return {
                    id: dataPoint.id,
                    deviceID: dataPoint.feed_key,
                    time: new Date(dataPoint.created_epoch*1000),
                    data: dataPoint.value
                }
            });
            return insertData;
        } catch (error) {
            console.log(error);
            return [];
        }
    },

    async triggerPump(username: string, feedName: string, key : string, time: string) {
        try {
            axios.post(`https://io.adafruit.com/api/v2/${username}/feeds/${feedName}/data`, 
                {
                    value: 'ON'
                }, {
                    headers: {
                        "X-AIO-Key": key,
                    }
                });
            const waitTime = Number(time);
            setTimeout(() => {}, waitTime);
            axios.post(`https://io.adafruit.com/api/v2/${username}/feeds/${feedName}/data`, 
            {
                value: 'OFF'
            }, {
                headers: {
                    "X-AIO-Key": key,
                }
            });
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
};

adaConnect.triggerPump('viluong', 'auto-watering', 'aio_CnpW66XLTayrvT1wyThIPB19Sysp', '12');

export default adaConnect;