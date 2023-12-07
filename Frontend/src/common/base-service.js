import httpRequest from './http-request';

class BaseService {
  constructor(endPoint) {
    this.endPoint = endPoint;
  }

  get = (params = {}) => {
    return httpRequest.get(this.endPoint, params).then((res) => res.data);
  };

  getById = (id, params = {}) => {
    return httpRequest
      .get(`${this.endPoint}/${id}`, params)
      .then((res) => res.data);
  };

  create = (data) => {
    return httpRequest.post(this.endPoint, data).then((res) => res.data);
  };

  updateById = (id, data = {}) => {
    return httpRequest
      .put(`${this.endPoint}/${id}`, data)
      .then((res) => res.data);
  };

  update = (data = {}) => {
    return httpRequest.put(`${this.endPoint}`, data).then((res) => res.data);
  };

  remove = (id) => {
    return httpRequest.delete(`${this.endPoint}/${id}`).then((res) => res.data);
  };
}

export default BaseService;
