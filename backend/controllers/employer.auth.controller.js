import Employer from "../models/employer.model.js";
import generateToken from "../utils/generateToken.js";
import saveCookie from "../utils/saveCookie.js";

export const registerEmployer = async (req, res) => {
    try {
        const {
            name, email, password, profilePic, organization
        } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email and password are required" })
        }

        const employer = await Employer.findOne({ email })

        if (employer) {
            return res.status(400).json({ message: "Email already exists" })
        }

        const newEmployer = await Employer.create({
            name, email, password, profilePic, organization
        })

        if (newEmployer) {
            const token = generateToken(newEmployer._id)
            saveCookie(token, res)

            res.status(201).json({
                employer: {
                    id: newEmployer._id,
                    name: newEmployer.name,
                    email: newEmployer.email,
                    profilePic: newEmployer.profilePic,
                    organization: newEmployer.organization,
                    createdAt: newEmployer.createdAt
                },
                message: "Registered successfully"
            })
        } else {
            return res.status(500).json({ message: "Unable to register" })
        }
    } catch (error) {
        console.log("Error in registerEmployer controller : ", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const loginEmployer = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const employer = await Employer.findOne({ email, provider: 'local' })

        if (!employer) {
            return res.status(401).json({ message: "Invalid credentials" })
        }

        const passwordCorrect = await employer.comparePassword(password)

        if (!passwordCorrect) {
            return res.status(401).json({ message: "Invalid credentials" })
        }

        if (employer) {
            const token = generateToken(employer._id)
            saveCookie(token, res)

            res.status(201).json({
                employer: {
                    id: employer._id,
                    name: employer.name,
                    email: employer.email,
                    profilePic: employer.profilePic,
                    organization: employer.organization,
                    createdAt: employer.createdAt
                },
                message: "Logged in successfully"
            })
        } else {
            return res.status(500).json({ message: "Unable to login" })
        }
    } catch (error) {
        console.log("Error in loginEmployer controller : ", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const getEmployerInfo = async (req, res) => {
    try {
        return res.status(200).json(req.employer)
    } catch (error) {
        console.log("Error in getEmployerInfo : ", error)
        return res.status(500).json("Internal sever error")
    }
}

export const logoutEmployer = async (req, res) => {
    try {
        res.cookie('authToken', "", { maxAge: 0, secure: true, sameSite: "None" })
        res.status(200).json({ message: "Logged out successfully" })
    } catch (error) {
        console.log("Error in logout controller : ", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const googleLogin = async (req, res) => {
    try {

    } catch (error) {
        console.log("Error in googleLogin controller : ", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const facebookLogin = async (req, res) => {
    try {

    } catch (error) {
        console.log("Error in facebookLogin controller : ", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}