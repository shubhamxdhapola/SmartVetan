import admin from "../config/firebase-admin.js";
import Employer from "../models/employer.model.js";
import generateToken from "../utils/generateToken.js";
import saveCookie from "../utils/saveCookie.js";

export const registerEmployer = async (req, res) => {
    try {
        const {
            name, email, password, profileImage, organization
        } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email and password are required" })
        }

        const employer = await Employer.findOne({ email })

        if (employer) {
            return res.status(400).json({ message: "Email already exists" })
        }

        const newEmployer = await Employer.create({
            name, email, password, profileImage, organization
        })

        if (newEmployer) {
            const token = generateToken(newEmployer._id)
            saveCookie(token, res)

            res.status(201).json({
                employer: {
                    id: newEmployer._id,
                    name: newEmployer.name,
                    email: newEmployer.email,
                    profileImage: newEmployer.profileImage,
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
                    profileImage: employer.profileImage,
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
        return res.status(200).json({ employer: req.employer })
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

export const googleSignin = async (req, res) => {
    try {
        const token = req?.headers?.authorization?.split(" ")[1];
        if (!token) {
            return res.status(400).json({ message: "No token provided" })
        }

        const decoded = await admin.auth().verifyIdToken(token);

        let employer = await Employer.findOne({ firebaseUID: decoded?.uid })

        if (!employer) {
            const existingEmployer = await Employer.findOne({ email: decoded?.email })

            if (existingEmployer && existingEmployer.provider === 'local') {
                return res.status(400).json({ message: "Email already exists" })
            }

            employer = await Employer.create({
                name: decoded?.name || decoded?.email?.split('@')[0],
                email: decoded?.email,
                provider: 'google',
                firebaseUID: decoded?.uid,
                profileImage: decoded?.picture,
            })
        }
        const jwtToken = generateToken(employer?._id)
        saveCookie(jwtToken, res)

        return res.status(200).json({
            employer: {
                id: employer._id,
                name: employer.name,
                email: employer.email,
                profileImage: employer.profileImage,
                organization: employer.organization,
                createdAt: employer.createdAt
            },
            message: "Signed in successfully"
        })

    } catch (error) {
        console.log("Error in googleSignin controller : ", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}
