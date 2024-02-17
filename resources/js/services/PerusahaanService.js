export default class Perusahaan {
  static getAll() {
    return new Promise((resolve, reject) => {
      axios({
        method: "get",
        url: route("master-perusahaan.json"),
      })
        .then((response) => resolve(response.data))
        .catch((error) => {
          console.log(error);
          return reject(error.response);
        });
    });
  }
}
