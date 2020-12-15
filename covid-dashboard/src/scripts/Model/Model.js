export default class Model {
  constructor() {
    this.loading = false;
    this.loadingCountry = false;
  }

  async getCovidData() {
    this.loading = true;
    let data;
    try {
      const url = `https://api.covid19api.com/summary`;
      const res = await fetch(url);
      data = await res.json();
      console.log(data);
    } catch (e) {
      console.log("ошибка");
    } finally {
      this.loading = false;
    }
    return data;
  }

  async getCountryData() {
    this.loadingCountry = true;
    let dataCountry;
    try {
      const urlCountry = `https://restcountries.eu/rest/v2/all`;
      const resCountry = await fetch(urlCountry);
      dataCountry = await resCountry.json();
    } catch (e) {
      console.log("ошибка");
    } finally {
      this.loadingCountry = false;
    }
    return dataCountry;
  }
}
