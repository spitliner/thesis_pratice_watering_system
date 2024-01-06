declare const adaConnect: {
    getFeedData(username: string, deviceID: string, feedName: string, key: string): Promise<{
        id: string;
        deviceID: string;
        time: Date;
        data: string;
    }[]>;
    triggerPumpSchedule(username: string, feedName: string, key: string, time: string): Promise<boolean>;
    modifiedStatus(username: string, feedName: string, key: string, value: string): Promise<boolean>;
};
export default adaConnect;
//# sourceMappingURL=ada-request.d.ts.map