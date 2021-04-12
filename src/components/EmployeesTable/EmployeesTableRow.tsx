import {Employee} from '../../types';
import React from 'react';
import useEmployee from './useEmployee';

const EmployeesTableRow: React.FunctionComponent<Employee> = (employee) => {
    const {updateEmployee, saveEmployee, selectedEmployee, editEmployee, error} = useEmployee(employee);

    return (
        <tr>
            <td data-label="Name" data-testid="name">
                {selectedEmployee.name} {selectedEmployee.surname}
            </td>
            <td data-label="Anschrift" data-testid="address">
                {selectedEmployee.address.street}<br/> {employee.address.zip} {employee.address.city}
            </td>
            <td data-label="Personalnummer" data-testid="personalNumber">
                {selectedEmployee.personalNumber}
            </td>
            <td data-label="Zustellmittel" data-testid="deliveryDevice">
                {selectedEmployee.deliveryDevice}
            </td>
            <td data-label="Sendungsmenge">
                <form>
                    <input type="text"
                           data-testid="deliveryAmount"
                           value={selectedEmployee.deliveryAmount}
                           onChange={(e) => {
                               updateEmployee(e)
                           }}
                           disabled={!selectedEmployee.isInProgress}
                    />
                    <div>
                        <button
                            data-testid="editEmployeeBtn"
                            type="button"
                            onClick={editEmployee}
                        >
                            Bearbeiten
                        </button>
                        <button
                            data-testid="saveEmployeeBtn"
                            type="button"
                            disabled={!selectedEmployee.isInProgress}
                            onClick={saveEmployee}>
                            Speichern
                        </button>
                    </div>
                </form>
                {
                    error !== '' && <div data-testid="error">{error}</div>
                }
            </td>
        </tr>
    )
}

export default EmployeesTableRow;
