import BaseService from "./BaseServices";
import { Employee } from "../models/Employee";

export class EmployeeService extends BaseService {
  async getListEmployee(page: number): Promise<Employee[]> {
    const response = await this.get<{ data: { data: Employee[] } }>(
      `/users?page=${page}`
    );
    return response.data.data;
  }
  async createEmployee(data: { name: string; job: string }) {
    const response = await this.post<{ id: string; createdAt: string }>(
      "/users",
      data
    );
    return response;
  }
  async deleteEmployee(id: number): Promise<void> {
    return await this.delete(`/users/${id}`);
  }

  async updateEmployee(id: number, data: { name: string; job: string }) {
    return await this.put<{ updatedAt: string }>(`/users/${id}`, data);
  }
}

export const employeeService = new EmployeeService();
