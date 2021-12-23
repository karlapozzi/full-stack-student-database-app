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
      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
  }

  async getUser(emailAddress, password) {
    const response = await this.api(`/users`, 'GET', null, true, {emailAddress, password});
    console.log(response.status);
    if (response.status === 200) {
      let data = await response.json().then(data => data);
      console.log(data);
      return data;
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }

  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        console.log(data.errors);
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
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

  async createCourse(course) {
    const response = await this.api('/courses', 'POST', course);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        console.log(data.errors);
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  async updateCourse(id, course) {
    const response = await this.api(`/courses/${id}`, 'PUT', course)
    if (response.status === 204 || 403 || 401) {
      return response.status;
    } else {
      throw new Error();
    }
  }

  async deleteCourse(id) {
    const response = await this.api(`/courses/${id}`, 'DELETE')
    if (response.status === 204 || 403 || 401) {
      return response.status;
    } else {
      throw new Error();
    }
  }
}
