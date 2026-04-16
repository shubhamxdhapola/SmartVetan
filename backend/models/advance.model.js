import mongoose from "mongoose";

const advanceSchema = mongoose.Schema({

    employerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employer'
    },

    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    },

    amount: {
        type: Number,
        required: true,
        min: [1, "Amount must be greater than 0"]
    },

    note: {
        type: String,
        maxLenght: 200
    },

    date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true })

const Advance = mongoose.model('Advance', advanceSchema)
export default Advance;