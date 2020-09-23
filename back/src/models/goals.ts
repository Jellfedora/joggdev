import { Schema, model, Document } from 'mongoose';

// on crée une interface pour que Typescript sache ce qu'il y a dans nos documents!
interface IGoal extends Document {
    title: string,
    value: string,
    is_old: boolean,
    created_at: Date,
    updated_at: Date
}

// definir le schema de données de notre model
const goalSchema = new Schema({
    title: String,
    value: String,
    is_old: Boolean,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
},
    {
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    });



// on laisse mongoose créer tout seul le model à parti du chema (+qqs options)
const Goal = model<IGoal>('Goal', goalSchema, 'goals');

// on exporte  !
export { Goal, IGoal };