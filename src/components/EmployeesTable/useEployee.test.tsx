import {mock} from 'jest-mock-extended';
import {act, renderHook} from '@testing-library/react-hooks';
import {DeliveryDevice, Employee} from '../../types';
import useEmployee from './useEmployee';
import React from 'react';
import axios, {AxiosResponse} from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('useEmployee hook', () => {
    const employeeMock = mock<Employee>({
        id: 1,
        name: 'aName',
        surname: 'aSurname',
        personalNumber: 1234,
        address: {
            street: 'aStreet',
            zip: 12345,
            city: 'aCity'
        },
        deliveryDevice: DeliveryDevice.Bicycle,
        deliveryAmount: 12,
        isInProgress: false
    });

    it('should render useEmployee', () => {
        const {result} = renderHook(() => useEmployee(employeeMock));

        expect(result.current.selectedEmployee).toStrictEqual(employeeMock);
        expect(result.current.selectedEmployee.isInProgress).toBe(false);
        expect(result.current.error).toBe('');
    });

    it('should call editEmployee and set inProgress to true', () => {
        const {result} = renderHook(() => useEmployee(employeeMock));

        act(() => {
            result.current.editEmployee();
        });

        expect(result.current.selectedEmployee.isInProgress).toBe(true);
    });

    it('should update deliveryAmount value', () => {
        const {result} = renderHook(() => useEmployee(employeeMock));
        const event = mock<React.ChangeEvent<HTMLInputElement>>({
            currentTarget: {
                value: '22'
            }
        })

        act(() => {
            result.current.updateEmployee(event);
        });

        expect(result.current.selectedEmployee.deliveryAmount).toBe(parseInt(event.currentTarget.value));
    });

    it('should save deliveryAmount successfully', async () => {
        const response = mock<AxiosResponse>();

        mockedAxios.patch.mockResolvedValue(response);

        const {result} = renderHook(() => useEmployee(employeeMock));
        const event = mock<React.ChangeEvent<HTMLInputElement>>({
            currentTarget: {
                value: '22'
            }
        })

        act(() => {
            result.current.updateEmployee(event);
        });

        await act(async () => {
            await result.current.saveEmployee();
        });

        expect(result.current.selectedEmployee.deliveryAmount).toBe(parseInt(event.currentTarget.value));
        expect(result.current.error).toBe('');
    });

    it('should try to update deliveryAmount, fail and set error', async () => {
        const response = mock<AxiosResponse>();

        mockedAxios.patch.mockRejectedValue(response);

        const {result} = renderHook(() => useEmployee(employeeMock));
        const event = mock<React.ChangeEvent<HTMLInputElement>>({
            currentTarget: {
                value: '22'
            }
        });

        act(() => {
            result.current.updateEmployee(event);
        });

        await act(async () => {
            await result.current.saveEmployee();
        });

        expect(result.current.selectedEmployee.deliveryAmount).toBe(employeeMock.deliveryAmount);
        expect(result.current.error).toBe(`Ein unerwarteter Fehler ist aufgetreten. Die Änderungen konnten nicht gespeichert werden.`);
    });
});
