const mongoose = require('mongoose');

const MakeupSchema = new mongoose.Schema({
    id: { type: Number, required: true }, // Number (instead of a string)
    brand: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true }, // Number (to handle $numberDouble)
    description: { type: String, required: true },
    product_type: { type: String, required: true },
    api_featured_image: { type: String, required: true }
}, {
    timestamps: true 
});

const MakeupModel = mongoose.model('Makeup', MakeupSchema);

module.exports = MakeupModel;
