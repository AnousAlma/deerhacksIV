export const uploadToCloudinary = async (file: File): Promise<string | null> => {
    try {
        // Convert the file to a base64 string
        const fileDataUrl = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = () => reject(reader.error);
            reader.readAsDataURL(file);
        });

        // Upload the file to the backend API
        const response = await fetch('/api/images/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ file: fileDataUrl }),
        });

        if (!response.ok) {
            throw new Error('Failed to upload file');
        }

        const data = await response.json();
        return data.url; // Return the secure URL
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        return null;
    }
};