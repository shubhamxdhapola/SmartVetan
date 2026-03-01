import mongoose from "mongoose";

const salaryRecordSchema = mongoose.Schema({
    
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true,
    },
    employerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employer",
        required: true,
    },
    month: {
        type: String,
        required: true,
    },

    totalSalary: {
        type: Number,
        required: true,
    },

    totalAdvance: {
        type: Number,
        required: true,
    },

    finalPayable: {
        type: Number,
        required: true,
    },

    status: {
        type: String,
        enum : ['Pending', 'Paid'],
        default: "Pending"
    },
    
    paidDate : Date 

}, { timestamps: true })

const SalaryRecord = mongoose.model('SalaryRecord', salaryRecordSchema)

export default SalaryRecord;