const API_PATHS = {
    AUTH: {
        REGISTER: '/api/auth/register',
        LOGIN: '/api/auth/login',
        LOGOUT: '/api/auth/logout',
        GET_EMPLOYER_INFO: '/api/auth/get-employer-info',
        GOOGLE_SIGNIN: '/api/auth/google-signin'
    },
    SUBSCRIBE: '/api/subscribe',
    DASHBOARD: {
        SUMMARY: '/api/dashboard',
        HISTORY: (month) => `/api/dashboard/history?month=${month}`
    },
    EMPLOYEE: {
        GET_ALL: '/api/employee/',
        ADD: '/api/employee/',
        GET: (employeeId) => `/api/employee/${employeeId}`,
        UPDATE: (employeeId) => `/api/employee/${employeeId}`,
        DELETE: (employeeId) => `/api/employee/${employeeId}`,
    },
    IMAGE_UPLOAD : '/api/upload'
}

export default API_PATHS