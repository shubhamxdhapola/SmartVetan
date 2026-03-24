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