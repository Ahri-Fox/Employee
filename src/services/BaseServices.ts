import api from '../util/setting/ApiClient';


export class BaseService {
  get = <T>(url: string, params?: any, headers?: Record<string, string>) => {
    return api({
      url: url, 
      method: "GET",
      params,
      headers:{
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        ...headers,
      }
    }) as Promise<T>;
  };

  post = <T>(url: string, data?: any, headers?: Record<string, string>) => {
    return api({
      url,
      method: "POST",
      data,
      headers:{
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        ...headers,
      }
    })as Promise<T>;
  };

  put = <T>(url: string, data?: any, headers?: Record<string, string>) => {
    return api({
      url,
      method: "PUT",
      data,
      headers:{
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        ...headers,
      }
    })as Promise<T>;
  };

  delete = <T>(url: string, data?: any, headers?: Record<string, string>) => {
    return api({
      url,
      method: "DELETE",
      data,
      headers:{
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        ...headers,
      }
    })as Promise<T>;
  };
}


export default BaseService;

