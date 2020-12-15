const POPULATIONOFEARTH = 7827000000;

import { setCountry, clickCountry, country } from "./changeCountry.js";

export default class Controller {
  constructor(view, model) {
    this.view = view;
    this.model = model;

    this.dataCovidCountry = {};
    this.dataCovidGlobal = {};
    this.dataCountry = {};
    this.checkboxLastDay;
    this.checkboxOneHundThous;
    this.covidTableData;
    this.country = "";

    this.init();
  }

  init() {
    this.getCovidData();
    this.view.addCovidTable();
    this.view.checkboxLastDay.addEventListener("click", () => {
      this.checkboxLastDay = this.view.checkboxLastDay.checked;
      this.changeCovidTableData();
    });
    this.view.checkboxOneHundThous.addEventListener("click", () => {
      this.checkboxOneHundThous = this.view.checkboxOneHundThous.checked;
      this.changeCovidTableData();
    });
    this.view.covidTableCityInput.addEventListener("keydown", (e) =>
      setCountry(e, this.dataCovidCountry)
    );
    this.view.covidTableCityInput.addEventListener("click", (e) =>
      clickCountry(e)
    );
    this.view.covidTableCityInput.addEventListener("blur", (e) =>
      setCountry(e, this.dataCovidCountry)
    );
  }

  async getCovidData() {
    const data = await this.model.getCovidData();
    this.dataCovidCountry = data.Countries;
    this.dataCovidGlobal = data.Global;
    this.view.addCovidTableData(
      this.dataCovidGlobal.TotalConfirmed,
      this.dataCovidGlobal.TotalDeaths,
      this.dataCovidGlobal.TotalRecovered
    );
  }

  changeCovidTableData() {
    let confirmed, deaths, recovered;
    if (this.checkboxLastDay) {
      confirmed = this.dataCovidGlobal.NewConfirmed;
      deaths = this.dataCovidGlobal.NewDeaths;
      recovered = this.dataCovidGlobal.NewRecovered;
    } else {
      confirmed = this.dataCovidGlobal.TotalConfirmed;
      deaths = this.dataCovidGlobal.TotalDeaths;
      recovered = this.dataCovidGlobal.TotalRecovered;
    }
    const population = this.country
      ? POPULATIONOFEARTH / 100000
      : POPULATIONOFEARTH / 100000;
    if (this.checkboxOneHundThous) {
      confirmed = confirmed / population;
      deaths = deaths / population;
      recovered = recovered / population;
    }
    this.view.addCovidTableData(confirmed, deaths, recovered);
  }
}
