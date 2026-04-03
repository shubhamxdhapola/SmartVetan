import Subscriber from "../models/subscriber.model.js"

export const subscribe = async (req, res) => {
    try {
        const { email } = req.body

        if (!email) {
            return res.status(400).json({ message: "Email is required" })
        }

        const subscriber = await Subscriber.findOne({ email })
        if (subscriber) {
            return res.status(400).json({ message: "Email is already subscribed" })
        }

        const newSubscriber = await Subscriber.create({ email })

        if (newSubscriber) {
            res.status(201).json({ message: "Successfully subscribed" })
        } else {
            res.status(400).json({ message: "Something went wrong, try again" })
        }

    } catch (err) {
        console.log('Error in subscribe controller : ', err)
        res.status(500).json({ message: "Internal server error" })
    }
}