const axios = require('axios');

class BaseApi {
  constructor(url) {
    this.url = url
  }

  async get() {
    return axios.get(this.url)
  }

  isOk(response) {
    return response.status === 200
  }
}

module.exports = BaseApi