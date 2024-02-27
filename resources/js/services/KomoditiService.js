export default class Komoditi {
  static getAll() {
    return new Promise((resolve, reject) => {
      axios({
        method: "get",
        url: route("komoditi.json"),
        responseType: "json",
      })
        .then((response) => resolve(response.data))
        .catch((error) => reject(error.response));
    });
  }
}
