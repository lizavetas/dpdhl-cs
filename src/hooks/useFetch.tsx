import {useState} from 'react';
import axios from 'axios';

function useFetch<T>(url: string, errorMessage: string) {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    async function fetchUrl(): Promise<void> {
        try {
            const {data} = await axios.get(url);
            setData(data);
        } catch (error) {
            setError(errorMessage);
        }

        setIsLoading(false);
    }

    return {
        data,
        isLoading,
        error,
        setData,
        fetchUrl
    }
}

export default useFetch;
