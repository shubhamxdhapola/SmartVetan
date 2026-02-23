import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const employerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: function () {
            return this.provider == 'local'
        },
    },
    profileImage: {
        type: String,
        default: null,
    },
    organization: {
        type: String,
    },
    provider: {
        type: String,
        enum: ['local', 'google', 'facebook'],
        default: 'local'
    },

    firebaseUid: {
        type: String
    }
}, { timestamps: true })

employerSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) return next();
        this.password = await bcrypt.hash(this.password, 10)
    } catch (err) {
        console.log("Error in password hashing : ", err);
        next()
    }
})

employerSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

const Employer = mongoose.model('Employer', employerSchema)
export default Employer