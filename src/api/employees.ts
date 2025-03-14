export interface Employee {
  id: number
  firstName: string
  lastName: string
}

const EmployeesAPI = {
  async get() {
    const req = await fetch('/api/employees')
    const employees: Employee[] = await req.json()
    return employees
  },
}

if (window.Cypress) {
  // @ts-ignore
  window.EmployeeAPI = EmployeesAPI
}

export default EmployeesAPI
