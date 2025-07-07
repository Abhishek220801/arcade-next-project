import {Schema, model} from 'mongoose'

const tourSchema = new Schema({
    title: String,
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    isPublic: {type: Boolean, default: false},
    steps: [
        {
            imageUrl: String,
            title: String,
            description: String,
            annotation: String
        }
    ],
    createdAt: {type: Date, default: Date.now}
})

const Tour = model('Tour', tourSchema);

export default Tour;