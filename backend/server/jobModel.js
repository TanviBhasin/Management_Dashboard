const mongoose = require("mongoose")

const jobSchema = new mongoose.Schema({
    name: { type: String, default: null },
    phone: { type: Number, default: null },
    date: { type: String, default: null },
    inventory: { type: String, default: null },
    image: { type: String, default: 'no-image.jpg' },
    report: { type: String, default: null },
    notes: { type: String, default: null },
    technician: { type: String, default: null },
    amount: { type: String, default: null },
    deadline: { type: String, default: null },
    status: { type: String, default: null },
    createdAt: { type: Date, default: Date.now() },
})

module.exports = new mongoose.model("jobs",jobSchema)