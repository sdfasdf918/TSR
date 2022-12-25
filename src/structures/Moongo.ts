import mongoose from 'mongoose';
import Data from "../typings/mongodb";

mongoose.set('strictQuery', true);

function connect(MongoURL: Data) {
    if (!MongoURL.NAME) MongoURL.NAME = "Data";

    if (MongoURL.NAME.includes("/")) {

       return mongoose.connect(`${MongoURL.MongoURL}${MongoURL.NAME}`)

    } else {

       return mongoose.connect(`${MongoURL.MongoURL}/Data`)

    }

}
export default connect