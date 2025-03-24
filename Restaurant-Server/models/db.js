import mongoose from "mongoose";

// Menu Schema
const menuSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    }
}, { 
    timestamps: true,
    toJSON: { 
        virtuals: true,
        transform: (doc, ret) => {
            ret.id = ret._id.toString();
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    },
    toObject: { virtuals: true }
});

// Item Schema
const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    menu: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu",
        required: true
    },
    category: {
        type: String,
        enum: ['Drinks', 'Foods', 'Brunch', 'Snacks', 'Dessert'],
        required: true
    }
}, { 
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id.toString();
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
});

export const Menu = mongoose.model("Menu", menuSchema);
export const Item = mongoose.model("Item", itemSchema);