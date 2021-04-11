import {useState} from 'react';
import axios from 'axios';

function usePatch<T>(url: string, errorMessage: string) {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    async function patchUrl(data: T): Promise<void> {
        try {
            await axios.patch(url, data);
        } catch (error) {
            setError(errorMessage);
            throw error;
        }
        setIsLoading(false);
    }

    return {
        patchUrl,
        isLoading,
        error
    }
}

export default usePatch;
