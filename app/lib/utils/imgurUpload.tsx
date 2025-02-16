import axios from 'axios';

export const uploadToImgur = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append('image', file);

    try {
        const response = await axios.post('https://api.imgur.com/3/upload', formData, {
            headers: {
                Authorization: process.env.NEXT_PUBLIC_IMGUR_CLIENT_ID,
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data.data.link;
    } catch (error) {
        console.error('Error uploading to Imgur:', error);
        return null;
    }
};