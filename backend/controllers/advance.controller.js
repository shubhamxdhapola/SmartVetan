import mongoose from "mongoose";
import Advance from "../models/advance.model.js";
import SalaryRecord from '../models/salary.record.model.js'

export const getAdvances = async (req, res) => {
    try {
        const employerId = req.employer._id;
        const advances = await Advance.find({ employerId }).sort({ date: -1 })
        return res.status(200).json({ advances })
    } catch (error) {
        console.log("Error in getAdvances controller : ", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const getEmployeeAdvances = async (req, res) => {
    try {
        const employerId = req.employer._id;
        const employeeId = req.params.employeeId;

        if (!mongoose.Types.ObjectId.isValid(employeeId)) {
            return res.status(400).json({ message: "Invalid employee id" });
        }

        const advances = await Advance.find({ employeeId, employerId })
        return res.status(200).json({ advances })

    } catch (error) {
        console.log("Error in getEmployeeAdvances controller : ", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const addAdvance = async (req, res) => {
    try {
        const employerId = req.employer._id
        const employeeId = req.params.employeeId

        const { amount, note, date } = req.body

        if (!mongoose.Types.ObjectId.isValid(employeeId)) {
            return res.status(400).json({ message: "Invalid employee id" });
        }

        if (!amount || !employeeId || !employerId) {
            return res.status(400).json({
                message: "Amount, employeeId or employerId are required"
            })
        }

        let advance = await Advance.create({
            employerId, employeeId, amount, note, date
        })

        return res.status(201).json({
            advance, message: "Advance added successfully"
        })

    } catch (error) {
        console.log("Error in addAdvance controller : ", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const updateAdvance = async (req, res) => {
    try {
        const id = req.params.advanceId
        const employerId = req.employer._id
        const { amount, note, date } = req.body

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid advance id" });
        }

        const advance = await Advance.findOne({ _id: id, employerId })

        if (!advance) {
            return res.status(404).json({ message: "Advance not exists" })
        }

        const month = advance.date.toISOString().substring(0, 7)

        const isSalaryGenerated = await SalaryRecord.findOne(
            { employeeId: advance.employeeId, employerId, month }
        )

        if (isSalaryGenerated) {
            return res.status(400).json({
                message: "Cannot update advance. Salary already generated for this month"
            })
        }

        const updates = {}
        if (amount) updates.amount = amount
        if (note) updates.note = note
        if (date) updates.date = date

        const updatedAdvance = await Advance.findOneAndUpdate(
            { _id: id, employerId },
            updates,
            { runValidators: true, new: true }
        )

        return res.status(200).json({
            updatedAdvance, message: "Advance updated successfully"
        })

    } catch (error) {
        console.log("Error in updateAdvance controller : ", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const deleteAdvance = async (req, res) => {
    try {
        const id = req.params.advanceId
        const employerId = req.employer._id

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid advance id" });
        }
        const advance = await Advance.findOne({ _id: id, employerId })

        if (!advance) {
            return res.status(404).json({ message: "Advance not exists" })
        }

        const month = advance.date.toISOString().substring(0, 7)

        const isSalaryGenerated = await SalaryRecord.findOne(
            { employeeId: advance.employeeId, employerId, month }
        )

        if (isSalaryGenerated) {
            return res.status(400).json({
                message: "Cannot delete advance. Salary already generated for this month"
            })
        }

        await advance.deleteOne()
        return res.status(200).json({ message: "Advance deleted successfully" })

    } catch (error) {
        console.log("Error in deleteAdvance controller : ", error)
        return res.status(500).json({ messge: "Internal sever error" })
    }
}