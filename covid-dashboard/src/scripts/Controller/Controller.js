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
    this.checkboxLastDay = false;
    this.checkboxOneHundThous = false;
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

    //this.view.selectListData.addEventListener
    document.querySelectorAll(".select-data").forEach((item) => {
      item.addEventListener("change", (e) => this.changeListData(e));
    });
    /*this.view.checkboxLastDay.addEventListener("click", () =>
      this.setCheckbox()
    );*/
    document.querySelectorAll(".checkbox__last-day").forEach((item) => {
      item.addEventListener("click", () => this.setCheckboxLastDay());
    });
    document.querySelectorAll(".checkbox__one-hundr-thous").forEach((item) => {
      item.addEventListener("click", () => this.setCheckboxOneHundThous());
    });

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

      let data = this.switchCovidData(item);

      const population = !findCountry ? 0 : findCountry.population;
      data = !this.checkboxOneHundThous
        ? data
        : Math.round((data * 10000000) / findCountry.population) / 100;

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

  setCheckboxLastDay() {
    this.checkboxLastDay = !this.checkboxLastDay;
    this.setCheckbox();
    document.querySelectorAll(".checkbox__last-day").forEach((item) => {
      item.checked = this.checkboxOneHundThous;
    });
  }

  setCheckboxOneHundThous() {
    this.checkboxOneHundThous = !this.checkboxOneHundThous;
    this.setCheckbox();
    document.querySelectorAll(".checkbox__one-hundr-thous").forEach((item) => {
      item.checked = this.checkboxOneHundThous;
    });
  }

  setCheckbox() {
    console.log("df");
    const dataForDOM = !this.country ? this.dataCovidGlobal : this.country;
    this.changeCovidTableData(dataForDOM, POPULATIONOFEARTH);
    this.updateMap();
    this.setCovidDataList();
  }

  updateMap() {
    delPolygonSeries();
    createPolygonSeries(this.dataMap);
    createTooltipText(
      this.switchCovidData(),
      this.dataMap,
      this.checkboxOneHundThous
    );
  }

  changeListData(e) {
    this.dataType = e.target.value;
    this.setCovidDataList();
    //document.getElementById("map").innerHTML = "";
    //initChartMap();
    //const dataMap = this.createDataArray();
    this.updateMap();
    /*delPolygonSeries();
    createPolygonSeries(this.dataMap);
    createTooltipText(
      this.switchCovidData(),
      this.dataMap,
      this.checkboxOneHundThous
    );*/
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
    console.log("sd");
    type === "set" ? setCountry(e, this.dataCovidCountry) : clickCountry(e);
    if (setCountryFlag) {
      if (!currentCountry) {
        this.changeCovidTableData(this.dataCovidGlobal, POPULATIONOFEARTH);
        this.setCovidDataList();
        this.country = "";
      } else {
        this.country = currentCountry[0];
        //получаем популяцию страны
        const findCountry = this.searchCountryData(this.country.CountryCode);
        this.setCovidDataList(this.country.Country);
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
    /*let confirmed, deaths, recovered;
    if (this.checkboxLastDay) {
      confirmed = dataCovid.NewConfirmed;
      deaths = dataCovid.NewDeaths;
      recovered = dataCovid.NewRecovered;
    } else {
      confirmed = dataCovid.TotalConfirmed;
      deaths = dataCovid.TotalDeaths;
      recovered = dataCovid.TotalRecovered;
    }*/
    const type = this.checkboxLastDay ? "New" : "Total";

    let confirmed = dataCovid[`${type}Confirmed`];
    let deaths = dataCovid[`${type}Deaths`];
    let recovered = dataCovid[`${type}Recovered`];

    population = population / 100000;

    if (this.checkboxOneHundThous) {
      confirmed = Math.round((confirmed / population) * 100) / 100;
      deaths = Math.round((deaths / population) * 100) / 100;
      recovered = Math.round((recovered / population) * 100) / 100;
    }
    this.view.addCovidTableData(confirmed, deaths, recovered);
  }
}
