
export const BASE_URL = 'http://localhost:8000';

// utils/apiPaths.js
export const API_PATHS = {
    AUTH :{
        REGISTER: "/api/auth/register",     //register
        LOGIN: "/api/auth/login", // User login
        GET_PROFILE: "/api/auth/profile"  // Get user profile
    },

    RESUME : {
        CREATE: "/api/resume", //post - create a new resume
        GET_ALL: "/api/resume",  // get all resumes
        GET_BY_ID: (id) => `/api/resume/${id}`,
        UPDATE: (id) => `/api/resume/${id}`,
        DELETE: (id) => `/api/resume/${id}`,
        UPLOAD_IMAGES: (id) => `/api/resume/${id}/upload-images`,
    },

    IMAGE :{
        UPLOAD_IMAGE: "/api/auth/upload-image", 
    }

};