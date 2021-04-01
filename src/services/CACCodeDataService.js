import http from "../http-common";

class CACCodeDataService {
  getAll(params) {
    return http.get("/caccode/vw", { params });
  }

  get(id) {
    return http.get(`/caccode/${id}`);
  }

  create(data) {
    return http.post("/caccode", data);
  }

  update(id, data) {
    return http.put(`/caccode/${id}`, data);
  }

  delete(id) {
    return http.delete(`/caccode/${id}`);
  }

  deleteAll() {
    return http.delete(`/caccode`);
  }
}

export default new CACCodeDataService();
