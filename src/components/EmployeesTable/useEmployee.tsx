import usePatch from '../../hooks/usePatch';
import {Employee} from '../../types';
import {ChangeEvent, useState} from 'react';
import {API_URLS} from '../../constants';

type UseEmployee = {
    updateEmployee: (event: ChangeEvent<HTMLInputElement>) => void,
    saveEmployee: () => void,
    selectedEmployee: Employee,
    editEmployee: () => void,
    error: string
}

function useEmployee(employee: Employee): UseEmployee {
    const [selectedEmployee, setSelectedEmployee] = useState<Employee>(employee);
    const {patchUrl, error} = usePatch<{ deliveryAmount: number }>(
        API_URLS.EMPLOYEE_URL(selectedEmployee.id),
        `Ein unerwarteter Fehler ist aufgetreten. Die Änderungen konnten nicht gespeichert werden.`
    );
    const currentDeliveryAmount = employee.deliveryAmount;

    function isNumber(value: string) {
        const reg = /^\d+$/;
        return !(value.match(reg) === null && value !== '');
    }

    function updateEmployee(event: ChangeEvent<HTMLInputElement>) {
        if (isNumber(event.currentTarget.value)) {
            setSelectedEmployee({
                ...selectedEmployee,
                deliveryAmount: parseInt(event.currentTarget.value) || 0
            });
        }
    }

    async function saveEmployee() {
        try {
            await patchUrl({deliveryAmount: selectedEmployee.deliveryAmount});
            setSelectedEmployee({
                ...selectedEmployee,
                deliveryAmount:  selectedEmployee.deliveryAmount,
                isInProgress: false,
            });
        } catch (error) {
            setSelectedEmployee({
                ...selectedEmployee,
                deliveryAmount: currentDeliveryAmount,
                isInProgress: false,
            });
        }
    }

    function editEmployee() {
        setSelectedEmployee({
            ...selectedEmployee,
            isInProgress: true
        });
    }

    return {
        updateEmployee,
        saveEmployee,
        selectedEmployee,
        editEmployee,
        error
    }
}

export default useEmployee;
