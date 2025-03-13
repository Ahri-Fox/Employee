import BaseService from './BaseServices';
import { Employee } from '../models/Employee';

export class EmployeeService extends BaseService {
  
  async getListEmployee(): Promise<Employee[]> {
    const response = await this.get<{data: {data: Employee[]}}>('/users?page=1');
    return response.data.data
  }
  async createEmployee(data: { name: string; job: string }) {
    const response = await this.post<{ id: string; createdAt: string }>("/users", data);
    return response;
  }
}

export const employeeService = new EmployeeService();