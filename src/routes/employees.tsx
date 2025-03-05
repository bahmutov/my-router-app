import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/employees')({
  component: EmployeesComponent,
})

function EmployeesComponent() {
  return <div>Hello "/employees"!</div>
}
