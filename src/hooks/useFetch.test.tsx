import {mock} from 'jest-mock-extended';
import axios, {AxiosError, AxiosResponse} from 'axios';
import {act, renderHook} from '@testing-library/react-hooks';
import useFetch from './useFetch';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('useFetch hook', () => {
    const errorMessage = 'anError';

    it('should successfully fetch data', async () => {
        type DataType = {
            id: number
        };
        const data: DataType[] = [
            {id: 1},
            {id: 2}
        ];
        const response = mock<AxiosResponse<DataType[]>>({data});

        mockedAxios.get.mockResolvedValue(response);

        const {result} = renderHook(() => useFetch<DataType[]>('url', errorMessage));

        expect(result.current.isLoading).toBe(true);

        await act(async () => {
            await result.current.fetchUrl()
        });

        expect(result.current.data).toStrictEqual(data);
        expect(result.current.error).toBe('');
        expect(result.current.isLoading).toBe(false);
    });

    it('should fetch data and fail', async () => {
        const error = mock<AxiosError>();

        mockedAxios.get.mockRejectedValue(error);

        const {result} = renderHook(() => useFetch('url', errorMessage));

        expect(result.current.isLoading).toBe(true);

        await act(async () => {
            await result.current.fetchUrl()
        });

        expect(result.current.data).toBe(null);
        expect(result.current.error).toBe(errorMessage);
        expect(result.current.isLoading).toBe(false);
    })
});
