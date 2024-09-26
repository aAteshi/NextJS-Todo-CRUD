//make todo model mongoose schema

import mongoose, { Schema, model } from 'mongoose';

export const todoSchema = new Schema({
    name: String,
    description: String,
    status: Boolean,
    duedate: String
});

export interface ITodo {
    _id?: string;
    name: string;
    description: string;
    status: boolean;
    duedate: string;
}

export default mongoose.models.todos || model('todos', todoSchema);
