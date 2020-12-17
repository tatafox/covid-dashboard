const POPULATIONOFEARTH = 7827000000;

import {
  setCountry,
  clickCountry,
  currentCountry,
  setCountryFlag,
} from "./changeCountry.js";

//import { addMap, addMarker, map } from "./map.js";
import {
  initChartMap,
  createPolygonSeries,
  delPolygonSeries,
  createTooltipText,
} from "./chartMap.js";

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
    this.dataMap;

    this.init();
  }

  init() {
    this.getCountryData();
    this.getCovidData();

    this.view.addCovidTable();
    this.view.addCovidList();

    initChartMap();

    //addMap(); //this.view.map

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

  /*addMapMarker() {
    this.dataCovidCountry.forEach((item) => {
      const findCountry = this.searchCountryData(item.CountryCode);
      addMarker(findCountry.latlng[0], findCountry.latlng[1], findCountry.name);
    });
  }*/

  setCovidDataList(countrySearch) {
    const dataArray = [];
    this.view.clearDOMItem(this.covidList);
    this.dataCovidCountry.forEach((item) => {
      const findCountry = this.searchCountryData(item.CountryCode);
      //console.log(findCountry);
      const flagSrc = !findCountry ? "" : findCountry.flag;
      const data = this.switchCovidData(item);
      const arrayRow = [item.Country, data, flagSrc];
      dataArray.push(arrayRow);
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
    this.setCovidDataList();
    //document.getElementById("map").innerHTML = "";
    //initChartMap();
    //const dataMap = this.createDataArray();

    delPolygonSeries();
    createPolygonSeries(this.dataMap);
    createTooltipText(this.switchCovidData(), this.dataMap);
  }

  switchCovidData(item) {
    let data;
    switch (this.dataType) {
      case "Total death":
        data = !item ? "TotalDeaths" : item.TotalDeaths;
        break;
      case "Total recovered":
        data = !item ? "TotalRecovered" : item.TotalRecovered;
        break;
      case "New confirmed":
        data = !item ? "NewConfirmed" : item.NewConfirmed;
        break;
      case "New death":
        data = !item ? "NewDeaths" : item.NewDeaths;
        break;
      case "New recovered":
        data = !item ? "NewRecovered" : item.NewRecovered;
        break;
      default:
        data = !item ? "TotalConfirmed" : item.TotalConfirmed;
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
    this.dataMap = this.createDataArray();
    createPolygonSeries(this.dataMap);
    createTooltipText("TotalConfirmed", this.dataMap);

    //this.addMapMarker();
  }

  createDataArray() {
    const data = [];
    this.dataCovidCountry.forEach((item) => {
      const findCountry = this.searchCountryData(item.CountryCode);
      const obj = {
        id: item.CountryCode,
        population: findCountry.population,
        TotalConfirmed: item.TotalConfirmed,
        TotalDeaths: item.TotalDeaths,
        TotalRecovered: item.TotalRecovered,
        NewConfirmed: item.NewConfirmed,
        NewDeaths: item.NewDeaths,
        NewRecovered: item.NewRecovered,
      };
      data.push(obj);
    });
    return data;
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
