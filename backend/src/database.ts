import mongoose, {ConnectOptions} from 'mongoose'
import config from './config';

(async () => {
    const mongooseOptions: ConnectOptions = {
        user: config.MONGO_USER,
        pass: config.MONGO_PASS
    }
    const db = await mongoose.connect(`mongodb://${config.MONGO_HOST}/${config.MONGO_DATABASE}`);
    
    if(config.ENV === "DEV") {
        db.connection.dropDatabase().then(() => {
            console.warn("⚠️  DEV Environment. Database has been dropped. ⚠️")
        });
    }
    console.log('Database is connected to: ', db.connection.name);
})()
