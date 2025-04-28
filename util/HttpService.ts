export class HttpService {

  // baseUrl: string = 'http://localhost:4407';
  // baseUrl: string = 'http://192.168.67.79:4407';
  baseUrl: string = 'https://mapi.monostore.uz';
  // fileServerUrl: string = 'http://localhost:6659/v1/document/download/';
  fileServerUrl: string = 'https://files.monostore.uz/v1/document/download/';

  get(url: string) {
    const options: any = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    if (this.getToken()) {
      options['headers'] = {
        'Authorization': this.getToken()
      }
    }
    return $fetch(this.getUrl(url), options);
  }

  getWithParams(url: string, params: any) {
    const options: any = {
      method: 'GET',
      params: params,
      headers: {
        'Content-Type': 'application/json'
      }
    }
    if (this.getToken()) {
      options['headers'] = {
        'Authorization': this.getToken()
      }
    }
    return $fetch(this.getUrl(url), options);
  }

  getUrl(url: string) {
    return this.baseUrl + url;
  }

  getFileUrl(url: string) {
    return this.fileServerUrl + url;
  }

  deleteWithParams(url: string, params: any) {
    const options: any = {
      method: 'DELETE',
      params: params,
      headers: {
        'Content-Type': 'application/json'
      }
    }
    if (this.getToken()) {
      options['headers'] = {
        'Authorization': this.getToken()
      }
    }
    return $fetch(this.getUrl(url), options);
  }

  getClearedUrl(url: string) {
    const options: any = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    if (this.getToken()) {
      options['headers'] = {
        'Authorization': this.getToken()
      }
    }
    return $fetch(this.getUrl(url), options);
  }

  post(url: string, body?: any) {
    let options: any = {
      method: 'POST',
      body: body,
      headers: {
        'Content-Type': 'application/json'
      }
    }
    if (this.getToken()) {
      options['headers'] = {
        'Authorization': this.getToken()
      }
    }
    return $fetch(this.getUrl(url), options);
  }

  put(url: string, body?: any) {
    let options: any = {
      method: 'PUT',
      body: body,
      headers: {
        'Content-Type': 'application/json'
      }
    }
    if (this.getToken()) {
      options['headers'] = {
        'Authorization': this.getToken()
      }
    }
    return $fetch(this.getUrl(url), options);
  }

  delete(url: string, body?: any) {
    let options: any = {
      method: 'DELETE',
      body: body,
      headers: {
        'Content-Type': 'application/json'
      }
    }
    if (this.getToken()) {
      options['headers'] = {
        'Authorization': this.getToken()
      }
    }
    return $fetch(this.getUrl(url), options);
  }

  patchWithParams(url: string, body?: any, params?: any) {
    let options: any = {
      method: 'PATCH',
      body: body,
      params: params,
      headers: {
        'Content-Type': 'application/json'
      }
    }
    if (this.getToken()) {
      options['headers'] = {
        'Authorization': this.getToken()
      }
    }
    return $fetch(this.getUrl(url), options);
  }

  patch(url: string, body?: any) {
    let options: any = {
      method: 'PATCH',
      body: body,
      headers: {
        'Content-Type': 'application/json'
      }
    }
    if (this.getToken()) {
      options['headers'] = {
        'Authorization': this.getToken()
      }
    }
    return $fetch(this.getUrl(url), options);
  }

  getToken() {
    if (typeof window !== 'undefined')
      return localStorage?.getItem('token');

    return '';
  }
}

export const httpServiceInstance = new HttpService();

export function useHttpService() {
  return httpServiceInstance;
}
