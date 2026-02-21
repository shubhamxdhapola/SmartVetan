import jwt from 'jsonwebtoken'
import Employer from '../models/employer.model.js';

export const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.authToken;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No token provided" })
        }
        jwt.verify(token, process.env.JWT_SECRET, async (error, decodedToken) => {
            if (error) return res.status(401).json({ message: "Unauthorized - Invalid token" })
            const employer = await Employer.findById(decodedToken.id).select('-password')
            if (!employer) return res.status(404).json({ message: 'Employer not found' })
            req.employer = employer
            next()
        })
    } catch (error) {
        console.log("Error in authenticate middleware : ", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}