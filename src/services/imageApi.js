import axios from "axios";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const upload = async (image) => {
    try {
        const response = await axios.post(apiBaseUrl + '/api/v1/images/upload', image, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return { success: false };
    }
};

export default {
    upload
}