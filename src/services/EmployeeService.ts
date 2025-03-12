import BaseService from './BaseServices';
import { Employee } from '../models/Employee';

class EmployeeService {
  getAllEmployees() {
    return BaseService.get<Employee[]>('/users');
  }

  getEmployeeByPage(page: number) {
    return BaseService.get<Employee>(`/users/${page}`);
  }

  createEmployee(employee: Employee) {
    return BaseService.post<Employee>('/users', employee);
  }

  updateEmployee(id: number, employee: Employee) {
    return BaseService.put<Employee>(`/users/${id}`, employee);
  }

  deleteEmployee(id: number) {
    return BaseService.delete<void>(`/users/${id}`);
  }
}

export default new EmployeeService();
