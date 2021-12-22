const apiUrl = 'http://localhost:5000/api';

export default class Data {
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = apiUrl + path;
  
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {
      const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
  }

  async getCourses() {
    const response = await this.api('/courses', 'GET')
    if (response.status === 200) {
      let data = await response.json().then(data => data);
      return data;
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }

  async getCourseDetail(id) {
    const response = await this.api(`/courses/${id}`, 'GET')
    if (response.status === 200) {
      let data = await response.json().then(data => data);
      return data;
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }
}
