const POPULATIONOFEARTH = 7827000000;

import {
  setCountry,
  clickCountry,
  currentCountry,
  setCountryFlag,
} from "./changeCountry.js";

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
    this.country;
    this.covidList;

    this.init();
  }

  init() {
    this.getCovidData();
    this.getCountryData();
    this.view.addCovidTable();

    this.view.checkboxLastDay.addEventListener("click", () =>
      this.setCheckbox()
    );
    this.view.checkboxOneHundThous.addEventListener("click", () =>
      this.setCheckbox()
    );
    this.view.covidTableCityInput.addEventListener(
      "keydown",
      (e) => this.changeCounty(e, "set")
      //setCountry(e, this.dataCovidCountry)
    );
    this.view.covidTableCityInput.addEventListener(
      "click",
      (e) => this.changeCounty(e, "click")
      //clickCountry(e)
    );
    this.view.covidTableCityInput.addEventListener(
      "blur",
      (e) => this.changeCounty(e, "set")
      //setCountry(e, this.dataCovidCountry)
    );
  }

  setCovidDataList() {
    this.view.clearDOMItem(this.covidList);
    this.dataCovidCountry.forEach((item) => {
      const findCountry = this.searchCountryData(item.CountryCode);
      console.log(findCountry);
      const flagSrc = !findCountry ? "" : findCountry.flag;
      this.view.createListItem(item.Country, item.TotalConfirmed, flagSrc);
    });
  }

  setCheckbox() {
    this.checkboxLastDay = this.view.checkboxLastDay.checked;
    this.checkboxOneHundThous = this.view.checkboxOneHundThous.checked;
    const dataForDOM = !this.country ? this.dataCovidGlobal : this.country;
    this.changeCovidTableData(dataForDOM, POPULATIONOFEARTH);
  }

  changeCounty(e, type) {
    type === "set" ? setCountry(e, this.dataCovidCountry) : clickCountry(e);
    if (setCountryFlag) {
      if (!currentCountry) {
        this.changeCovidTableData(this.dataCovidGlobal, POPULATIONOFEARTH);
        this.country = "";
      } else {
        this.country = currentCountry[0];
        //получаем популяцию страны
        const findCountry = this.searchCountryData(this.country.CountryCode);
        console.log(findCountry); //flag
        this.changeCovidTableData(this.country, findCountry.population);
      }
    }
  }

  searchCountryData(countryCode) {
    return this.dataCountry.find((item) => item.alpha2Code === countryCode);
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
    this.view.addCovidList(this.dataCovidCountry);
    this.covidList = this.view.covidList;
    this.setCovidDataList();
  }

  async getCountryData() {
    this.dataCountry = await this.model.getCountryData();
    console.log(this.dataCountry);
  }

  changeCovidTableData(dataCovid, population) {
    let confirmed, deaths, recovered;
    if (this.checkboxLastDay) {
      confirmed = dataCovid.NewConfirmed;
      deaths = dataCovid.NewDeaths;
      recovered = dataCovid.NewRecovered;
    } else {
      confirmed = dataCovid.TotalConfirmed;
      deaths = dataCovid.TotalDeaths;
      recovered = dataCovid.TotalRecovered;
    }
    population = population / 100000;
    if (this.checkboxOneHundThous) {
      confirmed = confirmed / population;
      deaths = deaths / population;
      recovered = recovered / population;
    }
    this.view.addCovidTableData(confirmed, deaths, recovered);
  }
}
