import React, {useEffect} from 'react';
import '../../styles/partials/_table.scss';
import useFetch from '../../hooks/useFetch';
import {Employee} from '../../types';
import EmployeesTableRow from './EmployeesTableRow';
import EmployeesTableHead from './EmployeesTableHead';
import {API_URLS} from '../../constants';

const EmployeesTable: React.FunctionComponent = () => {
    const {data: employees, isLoading, error, fetchUrl} = useFetch<Employee[]>(API_URLS.EMPLOYEES_URL, 'error');

    useEffect(() => {
        fetchUrl();
    }, [])


    return (
        <>
            {
                isLoading && <div>Loading...</div>
            }
            {
                error && <div>{error}</div>
            }
            <table className="table">
                <caption>Mitarbeiter der Zustellbasis</caption>
                <EmployeesTableHead/>
                <tbody>
                {
                    employees && employees.map((employee: Employee, index: number) => {
                        return (
                            <EmployeesTableRow {...employee} key={index}/>
                        )
                    })
                }
                </tbody>
            </table>
        </>
    )
}

export default EmployeesTable;
