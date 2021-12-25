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
    if (response.status === 200) {
      let data = await response.json().then(data => data);
      return data;
    }
    else if (response.status === 401) {
      //This ensures we'll show a sign in error vs. just redirecting all non 200 status errors to /error
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
      //This sends validation errors
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  async getCourses() {
    const response = await this.api('/courses', 'GET')
    //This API call won't have validations errors, so this only needs a 200 or general/unhandled/server error
    if (response.status === 200) {
      let data = await response.json().then(data => data);
      return data;
    } else {
      throw new Error();
    }
  }

  async getCourseDetail(id) {
    const response = await this.api(`/courses/${id}`, 'GET')
    if (response.status === 200) {
      let data = await response.json().then(data => data);
      return data;
    } 
    else if (response.status === 404) {
      //Send 404 for courses/ids that don't exist
      return response.status;
    } 
    else {
      throw new Error();
    }
  }

  async createCourse(course, emailAddress, password) {
    const response = await this.api('/courses', 'POST', course, true, {emailAddress, password});
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      //Send validation errors
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  async updateCourse(id, course, emailAddress, password) {
    const response = await this.api(`/courses/${id}`, 'PUT', course, true, {emailAddress, password})
    if (response.status === 204) {
      return [];
    }     
    else if (response.status === 400) {
      //Send validation errors
      return response.json().then(data => {
        console.log(data)
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  async deleteCourse(id, emailAddress, password) {
    const response = await this.api(`/courses/${id}`, 'DELETE', null, true, {emailAddress, password})
    //This API call won't have validations errors, so this only needs a 204 or general/unhandled/server error
    if (response.status === 204) {
      return response.status;
    } else {
      throw new Error();
    }
  }
}
