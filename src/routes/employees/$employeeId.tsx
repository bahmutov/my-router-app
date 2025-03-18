import { createFileRoute } from '@tanstack/react-router'
import EmployeesAPI from '../../api/employees'

export const Route = createFileRoute('/employees/$employeeId')({
  component: RouteComponent,
  loader: ({ params: { employeeId } }) => {
    const id = Number(employeeId)
    return EmployeesAPI.getEmployeeById(id)
  },
  preload: false,
  staleTime: 30_000,
})

function RouteComponent() {
  const employee = Route.useLoaderData()
  return (
    <div className="employee">
      name:{' '}
      <span className="name">
        {employee.firstName} {employee.lastName}
      </span>
    </div>
  )
}
