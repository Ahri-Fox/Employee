import BaseService from "./BaseServices";
interface LoginResponse {
  token: string;
}

interface RegisterResponse {
  id: number;
  token: string;
}

export default class UserService extends BaseService {
  async userLogin(data: { email: string; password: string }) {
    try {
      const response = await this.post<{ data: LoginResponse }>("/login", data);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async userRegister(data: { email: string; password: string }) {
    try {
      const response = await this.post<{ data: RegisterResponse }>(
        "/register",
        data
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export const userService = new UserService();
