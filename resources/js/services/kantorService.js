export default class Kantor {
  static getAll() {
    return new Promise((resolve, reject) => {
      axios({
        method: "get",
        url: route("kantor.json"),
      })
        .then((response) => resolve(response.data))
        .catch((error) => reject(error.response));
    });
  }
}
