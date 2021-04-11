import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import {mock} from 'jest-mock-extended';
import {DeliveryDevice, Employee} from '../../types';
import EmployeesTableRow from './EmployeesTableRow';
import axios, {AxiosError, AxiosResponse} from 'axios';
import {act} from 'react-dom/test-utils';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('EmployeesTableRow component', () => {
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
        deliveryAmount: 12
    });

    const inputValue = '22';

    const event = mock<React.ChangeEvent<HTMLInputElement>>({
        target: {
            value: inputValue
        }
    });

    it('should render EmployeesTableRow component', () => {
        render(
            <table>
                <tbody>
                <EmployeesTableRow {...employeeMock}/>
                </tbody>
            </table>
        );

        expect(screen.getByTestId('name')).toBeInTheDocument();
        expect(screen.getByTestId('name')).toHaveTextContent(`${employeeMock.name} ${employeeMock.surname}`);
        expect(screen.getByTestId('address')).toBeInTheDocument();
        expect(screen.getByTestId('address')).toHaveTextContent(employeeMock.address.city);
        expect(screen.getByTestId('address')).toHaveTextContent(employeeMock.address.zip.toString());
        expect(screen.getByTestId('address')).toHaveTextContent(employeeMock.address.street);
        expect(screen.getByTestId('personalNumber')).toBeInTheDocument();
        expect(screen.getByTestId('personalNumber')).toHaveTextContent(employeeMock.personalNumber.toString());
        expect(screen.getByTestId('deliveryDevice')).toBeInTheDocument();
        expect(screen.getByTestId('deliveryDevice')).toHaveTextContent(employeeMock.deliveryDevice);
        expect(screen.getByTestId('deliveryAmount')).toBeInTheDocument();
        expect(screen.getByTestId('deliveryAmount')).toHaveValue(employeeMock.deliveryAmount.toString());
        expect(screen.getByTestId('deliveryAmount')).toBeDisabled();
        expect(screen.getByTestId('editEmployeeBtn')).toBeInTheDocument();
        expect(screen.getByTestId('saveEmployeeBtn')).toBeInTheDocument();
        expect(screen.getByTestId('saveEmployeeBtn')).toBeDisabled();
        expect(screen.queryByTestId('error')).not.toBeInTheDocument();
    });

    it('should update employee successfully', async () => {
        const response = mock<AxiosResponse>();
        mockedAxios.patch.mockResolvedValue(response);

        render(
            <table>
                <tbody>
                <EmployeesTableRow {...employeeMock}/>
                </tbody>
            </table>
        );

        fireEvent.click(screen.getByTestId('editEmployeeBtn'));

        expect(screen.getByTestId('saveEmployeeBtn')).not.toBeDisabled();
        expect(screen.getByTestId('deliveryAmount')).not.toBeDisabled();

        fireEvent.change(screen.getByTestId('deliveryAmount'), event);
        await act(async () => {
            await fireEvent.click(screen.getByTestId('saveEmployeeBtn'));
        });

        expect(screen.getByTestId('deliveryAmount')).toHaveValue(inputValue)
        expect(screen.getByTestId('deliveryAmount')).toBeDisabled();
        expect(screen.getByTestId('saveEmployeeBtn')).toBeDisabled();
    });

    it('should try to update employee, fail and render error', async () => {
        const error = mock<AxiosError>();
        mockedAxios.patch.mockRejectedValue(error);

        render(
            <table>
                <tbody>
                <EmployeesTableRow {...employeeMock}/>
                </tbody>
            </table>
        );

        fireEvent.click(screen.getByTestId('editEmployeeBtn'));

        expect(screen.getByTestId('saveEmployeeBtn')).not.toBeDisabled();
        expect(screen.getByTestId('deliveryAmount')).not.toBeDisabled();

        fireEvent.change(screen.getByTestId('deliveryAmount'), event);
        await act(async () => {
            await fireEvent.click(screen.getByTestId('saveEmployeeBtn'));
        });

        expect(screen.getByTestId('deliveryAmount')).toHaveValue(employeeMock.deliveryAmount.toString())
        expect(screen.getByTestId('deliveryAmount')).toBeDisabled();
        expect(screen.getByTestId('saveEmployeeBtn')).toBeDisabled();
        expect(screen.getByTestId('error')).toBeInTheDocument();
    });
});
