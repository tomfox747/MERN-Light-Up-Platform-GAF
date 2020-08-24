import db from '../../db';

const { model, Schema } = db;

const startFactorySchema = new Schema({
    'password': { type: String, required: true }

}, { collection: 'superUser' });

const startFactoryModel = model('superUser', startFactorySchema);

export default startFactoryModel;