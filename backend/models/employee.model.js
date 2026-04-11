import mongoose from "mongoose";

const employeeSchema = mongoose.Schema({
    employerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employer'
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        maxlength: [10, "Phone number cannot exceed 10 digits"],
        minlength: [10, "Phone number must be exactly 10 digits"],
        match: [/^\d{10}$/, "Phone number must contain exactly 10 digits"]
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowerCase: true,
    },
    salary: {
        type: Number,
        required: true,
        default: 0
    },
    designation: {
        type: String,
        default : "N/A"
    },
    address: {
        type: String,
    },
    aadhar: {
        type: String,
        unique: true,
        required: true,
        maxlength: [12, "Aadhaar number cannot exceed 12 digits"],
        minlength: [12, "Aadhaar number must be exactly 12 digits"],
        match: [/^\d{12}$/, "Aadhaar must contain exactly 12 digits"]
    },
    profilePic: {
        type: String,
        default: null,
    }
}, { timestamps: true })

const Employee = mongoose.model('Employee', employeeSchema)
export default Employee;