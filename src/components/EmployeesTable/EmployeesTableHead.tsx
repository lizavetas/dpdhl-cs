import React from 'react';

const EmployeesTableHead: React.FunctionComponent = () => {
    return (
        <thead>
        <tr>
            <th scope="col">Name</th>
            <th scope="col">Anschrift</th>
            <th scope="col">Personalnummer</th>
            <th scope="col">Zustellmittel</th>
            <th scope="col">Sendungsmenge</th>
        </tr>
        </thead>
    )
}

export default EmployeesTableHead;
