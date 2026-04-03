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
        trim: true,
        lowerCase: true,
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
        default: "N/A"
    },
    provider: {
        type: String,
        enum: ['local', 'google', 'facebook'],
        default: 'local'
    },

    firebaseUID: {
        type: String
    }
}, { timestamps: true })

employerSchema.pre('save', async function () {
    if (!this.isModified('password') || !this.password) return;
    this.password = await bcrypt.hash(this.password, 10)
})

employerSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

const Employer = mongoose.model('Employer', employerSchema)
export default Employer