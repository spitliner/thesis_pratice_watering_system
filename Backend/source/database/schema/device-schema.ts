/* eslint-disable @typescript-eslint/naming-convention */
import mongoose from 'mongoose';

const deviceSchema = new mongoose.Schema({
    id: {type: String, required: true, index: {type: 1, unique: true}},
    userID: {type: String, required: true, index: 1},
    name: {type: String, required: true},
    type: {type: String, required: true},
    apiKey: {type: String, required: true},
    adaUsername: {type: String, required: true},
    feedID: {type: String, required: true},
    settings: {type: String, required: true},
    schedules: {type: [[String]], required: false},
    limit: {type: [Number]},
});

deviceSchema.index({userID: 1, name: 1}, {unique: true});
deviceSchema.index({feedID: 1, adaUsername: 1}, {unique: true});

export default deviceSchema;
