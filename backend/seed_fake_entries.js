import 'dotenv/config';
import connectDB from './config/db.js';
import mongoose from 'mongoose';
import Employee from './models/employee.model.js';
import Advance from './models/advance.model.js';
import SalaryRecord from './models/salary.record.model.js';

const employerId = '69c2f14a74e1d29f138ce48f';

const runSeed = async () => {
    try {
        await connectDB();
        console.log("Seeding fake entries...");

        // Fake Employees
        const fakeEmployees = [
            {
                employerId,
                name: "Rahul Sharma",
                phone: "9123456780",
                email: "rahul.শarma@example.com",
                salary: 20000,
                designation: "Worker",
                address: "Delhi",
                aadhar: "100000000001"
            },
            {
                employerId,
                name: "Amit Kumar",
                phone: "9123456781",
                email: "amit.kumar@example.com",
                salary: 25000,
                designation: "Supervisor",
                address: "Noida",
                aadhar: "100000000002"
            },
            {
                employerId,
                name: "Suresh Singh",
                phone: "9123456782",
                email: "suresh.singh@example.com",
                salary: 18000,
                designation: "Helper",
                address: "Gurgaon",
                aadhar: "100000000003"
            }
        ];

        const createdEmployees = [];
        for (const emp of fakeEmployees) {
            let existing = await Employee.findOne({ phone: emp.phone });
            if (!existing) {
                existing = await Employee.create(emp);
                console.log(`Created Employee: ${existing.name}`);
            } else {
                console.log(`Employee already exists: ${existing.name}`);
            }
            createdEmployees.push(existing);
        }

        // Fake Advances starting Jan 2026
        const advances = [
            {
                employerId,
                employeeId: createdEmployees[0]._id, // Rahul
                amount: 5000,
                reason: "Medical emergency",
                date: new Date("2026-01-10T10:00:00Z")
            },
            {
                employerId,
                employeeId: createdEmployees[0]._id, // Rahul
                amount: 2000,
                reason: "Personal",
                date: new Date("2026-01-25T10:00:00Z")
            },
            {
                employerId,
                employeeId: createdEmployees[1]._id, // Amit
                amount: 10000,
                reason: "Family event",
                date: new Date("2026-01-15T12:00:00Z")
            },
            {
                employerId,
                employeeId: createdEmployees[2]._id, // Suresh
                amount: 3000,
                reason: "Travel expenses",
                date: new Date("2026-01-20T09:00:00Z")
            },
            // Feb 2026 Advances
            {
                employerId,
                employeeId: createdEmployees[0]._id, // Rahul
                amount: 1500,
                reason: "Miscellaneous",
                date: new Date("2026-02-05T09:00:00Z")
            },
            {
                employerId,
                employeeId: createdEmployees[2]._id, // Suresh
                amount: 5000,
                reason: "Repair",
                date: new Date("2026-02-14T09:00:00Z")
            }
        ];

        for (const adv of advances) {
            const createdAdv = await Advance.create(adv);
            console.log(`Created Advance of ${createdAdv.amount} for Employee ID ${adv.employeeId} on ${createdAdv.date.toISOString().split('T')[0]}`);
        }

        // Fake Salary Records to show deductions
        // Rahul - Jan 2026: Salary 20000, Advance (5000+2000=7000) -> Payable 13000
        // Amit - Jan 2026: Salary 25000, Advance 10000 -> Payable 15000
        // Suresh - Jan 2026: Salary 18000, Advance 3000 -> Payable 15000
        const salaryRecords = [
            {
                employeeId: createdEmployees[0]._id,
                employerId,
                month: "2026-01",
                totalSalary: 20000,
                totalAdvance: 7000,
                finalPayable: 13000,
                status: "Paid",
                paidDate: new Date("2026-02-01T00:00:00Z")
            },
            {
                employeeId: createdEmployees[1]._id,
                employerId,
                month: "2026-01",
                totalSalary: 25000,
                totalAdvance: 10000,
                finalPayable: 15000,
                status: "Paid",
                paidDate: new Date("2026-02-02T00:00:00Z")
            },
            {
                employeeId: createdEmployees[2]._id,
                employerId,
                month: "2026-01",
                totalSalary: 18000,
                totalAdvance: 3000,
                finalPayable: 15000,
                status: "Paid",
                paidDate: new Date("2026-02-01T12:00:00Z")
            },
            // Feb 2026 (Pending)
            {
                employeeId: createdEmployees[0]._id,
                employerId,
                month: "2026-02",
                totalSalary: 20000,
                totalAdvance: 1500,
                finalPayable: 18500,
                status: "Pending"
            },
            {
                employeeId: createdEmployees[2]._id,
                employerId,
                month: "2026-02",
                totalSalary: 18000,
                totalAdvance: 5000,
                finalPayable: 13000,
                status: "Pending"
            }
        ];

        for (const sr of salaryRecords) {
            const existing = await SalaryRecord.findOne({ employeeId: sr.employeeId, month: sr.month });
            if (!existing) {
                await SalaryRecord.create(sr);
                console.log(`Created Salary Record for ID ${sr.employeeId} for month ${sr.month}`);
            } else {
                console.log(`Salary Record for ID ${sr.employeeId} for month ${sr.month} already exists`);
            }
        }

        console.log("Seeding complete! You can view these entries in the UI.");
        process.exit(0);
    } catch (err) {
        console.error("Error during seeding:", err);
        process.exit(1);
    }
}

runSeed();
