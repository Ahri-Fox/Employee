import BaseService from './BaseServices';
import { Employee } from '../models/Employee';

export class EmployeeService extends BaseService {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super();
  }

  async getListEmployee(): Promise<Employee[]> {
    const response = await this.get<{data: {data: Employee[]}}>('/users?page=1');
    return response.data.data
  }

}

export const employeeService = new EmployeeService();