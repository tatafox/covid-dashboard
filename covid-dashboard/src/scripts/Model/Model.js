import axios from "axios";

export default class Model {
  constructor() {
    this.loading = false;
  }

  async getCovidData() {
    this.loading = true;
    let data;
    try {
      const response = await axios.get(`https://api.covid19api.com/summary`);

      data = response.data;
    } catch (e) {
      console.log("ошибка");
    } finally {
      this.loading = false;
    }
    return data;
  }

  async getMap() {}
}

const url = `https://api.covid19api.com/summary`;
const res = await fetch(url);
const data = await res.json();
this.dataCovidCountry = data.Countries;
this.dataCovidGlobal = data.Global;
console.log(data);
console.log(this.dataCovidCountry, this.dataCovidGlobal);
this.addCovidTable();
this.addCovidTableData(
  this.dataCovidGlobal.TotalConfirmed,
  this.dataCovidGlobal.TotalDeaths,
  this.dataCovidGlobal.TotalRecovered
);
