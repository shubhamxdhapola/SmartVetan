import { toast } from "sonner"

export const validateRegisterForm = (name, email, password) => {
    if (!name.trim()) return toast.error("Name is required")
    if (!email.trim()) return toast.error("Email is required")
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))
        return toast.error("Invalid email format");
    if (!password.trim()) return toast.error("Password is required")
    return true
}
export const validateLoginForm = (email, password) => {
    if (!email.trim()) return toast.error("Email is required")
    if (!password.trim()) return toast.error("Password is required")
    return true
}

export const getFormattedMonth = (month) => {
    const date = new Date(month + "-01");
    const formattedMonth = date.toLocaleString("en-US", {
        month: "long",
        year: "numeric",
    });
    return formattedMonth
}

export const getMonthsArray = (joiningDateISO) => {
    const result = [];

    const start = new Date(joiningDateISO);
    const today = new Date();

    // move to first day of joining month
    start.setDate(1);

    // move to previous month of current date
    const end = new Date(today.getFullYear(), today.getMonth(), 0);

    while (start <= end) {
        const label = start.toLocaleString("en-US", {
            month: "long",
            year: "numeric",
        })
        const value = `${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2, "0")}`
        result.push({ label: label, value: value });

        // move to next month
        start.setMonth(start.getMonth() + 1);
    }

    return result.reverse()
};

export const getDate = () => {
    return new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
    })
}

export const formatDate = (date) => {
    if (!date) return "—"
    return new Date(date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    })
}

export const getTime = () => {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });

    const time = formattedTime.split(':').join(" : ")
    return time.toUpperCase();
}

export const validateEmployeeForm = (name, phone, email, salary, aadhar) => {
    if (!name.trim()) return toast.error("Name is required")
    if (!phone.trim()) return toast.error("Phone no. is required")
    if (!aadhar.trim()) return toast.error("Aadhar no. is required")
    if (!salary) return toast.error("Salary is required")
    if (Number(salary) <= 0) return toast.error("Salary should be greater than 0")
    if (email && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))
        return toast.error("Invalid email format");
    return true
}

export const validateAdvanceForm = (employeeId, amount, reason) => {
    if (!employeeId) return toast.error("Please select an employee")
    if (!amount) return toast.error("Amount is required")
    if (Number(amount) <= 0) return toast.error("Amount should be greater than 0")
    if (!reason.trim()) return toast.error("Reason is required")
    return true
}
