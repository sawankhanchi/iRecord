import mongoose, {Schema} from 'mongoose';

var recordSchema = new Schema({
    artist: {
        type: String,
        unique: true,
    }, 
    cover: String,
})

export default mongoose.model('record', recordSchema);