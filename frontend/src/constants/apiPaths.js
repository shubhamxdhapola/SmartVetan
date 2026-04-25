const API_PATHS = {
    AUTH: {
        REGISTER: '/api/auth/register',
        LOGIN: '/api/auth/login',
        LOGOUT: '/api/auth/logout',
        GET_EMPLOYER_INFO: '/api/auth/get-employer-info',
        UPDATE_PROFILE: '/api/auth/update-profile',
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
        SEARCH: (searchQuery) => `/api/employee/search?query=${searchQuery}`
    },
    IMAGE_UPLOAD: '/api/upload',
    ADVANCE: {
        GET_ALL: '/api/advance',
        GET_BY_MONTH: (month) => `/api/advance?month=${month}`,
        GET_STATS: (month) => `/api/advance/stats?month=${month}`,
        ADD: (employeeId) => `/api/employee/${employeeId}/advance`,
        GET_BY_EMPLOYEE: (employeeId) => `/api/employee/${employeeId}/advance`,
        UPDATE: (advanceId) => `/api/advance/${advanceId}`,
        DELETE: (advanceId) => `/api/advance/${advanceId}`,
    }

}

export default API_PATHS