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
    this.dataType;

    this.init();
  }

  init() {
    this.getCovidData();
    this.getCountryData();
    this.view.addCovidTable();
    this.view.addCovidList();
    this.view.selectListData.addEventListener("change", (e) =>
      this.changeListData(e)
    );
    this.view.checkboxLastDay.addEventListener("click", () =>
      this.setCheckbox()
    );
    this.view.checkboxOneHundThous.addEventListener("click", () =>
      this.setCheckbox()
    );

    document.querySelectorAll(".search-country").forEach((item) => {
      item.addEventListener(
        "keydown",
        (e) => this.changeCounty(e, "set")
        //setCountry(e, this.dataCovidCountry)
      );
      item.addEventListener(
        "click",
        (e) => this.changeCounty(e, "click")
        //clickCountry(e)
      );
      item.addEventListener(
        "blur",
        (e) => this.changeCounty(e, "set")
        //setCountry(e, this.dataCovidCountry)
      );
    });
  }

  setCovidDataList(dataType, countrySearch) {
    const dataArray = [];
    this.view.clearDOMItem(this.covidList);
    this.dataCovidCountry.forEach((item) => {
      const findCountry = this.searchCountryData(item.CountryCode);
      //console.log(findCountry);
      const flagSrc = !findCountry ? "" : findCountry.flag;
      const data = this.switchCovidData(dataType, item);
      const arrayRow = [item.Country, data, flagSrc];
      dataArray.push(arrayRow);
      //console.log(data);
      //this.view.createListItem(item.Country, data, flagSrc);
    });
    if (countrySearch) {
      const countryList = dataArray.find((item) => item[0] === countrySearch);
      this.view.createListItem(countryList[0], countryList[1], countryList[2]);
    } else {
      dataArray.sort((a, b) => b[1] - a[1]);
      dataArray.forEach((item) => {
        this.view.createListItem(item[0], item[1], item[2]);
      });
    }
  }

  setCheckbox() {
    this.checkboxLastDay = this.view.checkboxLastDay.checked;
    this.checkboxOneHundThous = this.view.checkboxOneHundThous.checked;
    const dataForDOM = !this.country ? this.dataCovidGlobal : this.country;
    this.changeCovidTableData(dataForDOM, POPULATIONOFEARTH);
  }

  changeListData(e) {
    this.dataType = e.target.value;
    this.setCovidDataList(this.dataType);
  }

  switchCovidData(dataType, item) {
    let data;
    switch (dataType) {
      case "Total death":
        data = item.TotalDeaths;
        break;
      case "Total recovered":
        data = item.TotalRecovered;
        break;
      case "New cases":
        data = item.NewConfirmed;
        break;
      case "New death":
        data = item.NewDeaths;
        break;
      case "New recovered":
        data = item.NewRecovered;
        break;
      default:
        data = item.TotalConfirmed;
        break;
    }
    return data;
  }

  changeCounty(e, type) {
    type === "set" ? setCountry(e, this.dataCovidCountry) : clickCountry(e);
    if (setCountryFlag) {
      if (!currentCountry) {
        this.changeCovidTableData(this.dataCovidGlobal, POPULATIONOFEARTH);
        this.setCovidDataList(this.dataType);
        this.country = "";
      } else {
        this.country = currentCountry[0];
        //получаем популяцию страны
        const findCountry = this.searchCountryData(this.country.CountryCode);
        this.setCovidDataList(this.dataType, this.country.Country);
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
