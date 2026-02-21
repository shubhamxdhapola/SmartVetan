import jwt from 'jsonwebtoken'

const generateToken = (employerId) => {
    return jwt.sign({ id: employerId }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    })
}

export default generateToken