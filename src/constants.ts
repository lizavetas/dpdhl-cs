export const API_URLS = {
    EMPLOYEES_URL: `http://localhost:3004/api/employees`,
    EMPLOYEE_URL: (employeeId: number) => `http://localhost:3004/api/employees/${employeeId}`
}
