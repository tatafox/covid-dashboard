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

import Diagram from "./diagramChart.js";

export default class Controller {
  constructor(view, model) {
    this.view = view;
    this.model = model;

    this.dataCovidCountry = {};
    this.dataCovidGlobal = {};
    this.dataHistoricalAll = {};
    this.dataHistoricalCountry = {};
    this.checkboxLastDay = false;
    this.checkboxOneHundThous = false;
    //this.covidTableData;
    this.country;
    this.covidList;
    this.dataType;
    this.dataMap;
    this.diagram = new Diagram();
    this.init();
  }

  init() {
    //this.getCountryData();

    this.getCovidData();

    this.view.addCovidTable();
    this.view.addCovidList();

    this.getCovidHistoricalAllData();

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

  setCovidDataList() {
    const dataArray = [];
    this.view.clearDOMItem(this.view.covidList);
    document.querySelectorAll(".covid-item").forEach((item) => {
      item.removeEventListener("click");
    });
    this.dataCovidCountry.forEach((item) => {
      //const findCountry = this.searchCountryData(item.CountryCode);
      //console.log(findCountry);
      let data = this.switchCovidData(item);
      const population = !item.population ? 100000 : item.population;

      data = !this.checkboxOneHundThous
        ? data
        : Math.round((data * 10000000) / population) / 100;

      const arrayRow = [item.country, data, item.countryInfo.flag];
      dataArray.push(arrayRow);
      //this.view.createListItem(item.Country, data, flagSrc);
    });
    if (this.country) {
      const countryList = dataArray.find(
        (item) => item[0] === this.country.country
      );
      this.view.createListItem(countryList[0], countryList[1], countryList[2]);
    } else {
      dataArray.sort((a, b) => b[1] - a[1]);
      dataArray.forEach((item) => {
        this.view.createListItem(item[0], item[1], item[2]);
      });
    }
    document.querySelectorAll(".covid-item").forEach((item) => {
      item.addEventListener("click", (e) => this.setCountryClick(e));
    });
  }

  setCountryClick(e) {
    //console.log(e);
    const country =
      e.target.localName === "li"
        ? e.target.children[1].innerText
        : e.path[1].children[1].textContent;
    //console.log(country); //, e.target, e.target.children[1].innerText);
    console.log(
      this.dataCovidCountry.find(
        (item) => item.country.toLowerCase() === country.toLowerCase()
      )
    );
    this.country = this.dataCovidCountry.find(
      (item) => item.country.toLowerCase() === country.toLowerCase()
    );
    document
      .querySelectorAll(".search-country")
      .forEach((item) => (item.value = this.country.country));
    this.updateCounty();
  }

  updateData() {}

  setCheckboxLastDay() {
    this.checkboxLastDay = !this.checkboxLastDay;
    this.setCheckbox();
    document.querySelectorAll(".checkbox__last-day").forEach((item) => {
      item.checked = this.checkboxLastDay;
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
    const dataForDOM = !this.country ? this.dataCovidGlobal : this.country;
    this.changeCovidTableData(dataForDOM, POPULATIONOFEARTH);
    this.updateMap();
    this.setCovidDataList();
    this.country
      ? this.updateDiagram(this.dataHistoricalCountry)
      : this.updateDiagram(this.dataHistoricalAll);
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

    this.country
      ? this.updateDiagram(this.dataHistoricalCountry)
      : this.updateDiagram(this.dataHistoricalAll);
  }

  updateDiagram(currentData) {
    this.diagram.clear();
    let population = this.country ? this.country.population : POPULATIONOFEARTH;
    population = this.checkboxOneHundThous ? population : 0;
    const data = this.switchCovidData(currentData, true, population);
    console.log(data);
    this.diagram.createDiagram(data);
  }

  switchCovidData(item, flagDiagram, population) {
    let data;
    switch (this.dataType) {
      case "Total death":
        if (flagDiagram) {
          data = this.getDiagramData(item.deaths, false, population);
        } else {
          data = !item ? "TotalDeaths" : item.deaths;
        }
        break;
      case "Total recovered":
        if (flagDiagram) {
          data = this.getDiagramData(item.recovered, false, population);
        } else {
          data = !item ? "TotalRecovered" : item.recovered;
        }
        break;
      case "New confirmed":
        if (flagDiagram) {
          data = this.getDiagramData(item.cases, true, population);
        } else {
          data = !item ? "NewConfirmed" : item.todayCases;
        }
        break;
      case "New death":
        if (flagDiagram) {
          data = this.getDiagramData(item.deaths, true, population);
        } else {
          data = !item ? "NewDeaths" : item.todayDeaths;
        }
        break;
      case "New recovered":
        if (flagDiagram) {
          data = this.getDiagramData(item.recovered, true, population);
        } else {
          data = !item ? "NewRecovered" : item.todayRecovered;
        }
        break;
      default:
        if (flagDiagram) {
          data = this.getDiagramData(item.cases, false, population);
        } else {
          data = !item ? "TotalConfirmed" : item.cases;
        }
        break;
    }
    return data;
  }

  changeCounty(e, type) {
    type === "set" ? setCountry(e, this.dataCovidCountry) : clickCountry(e);
    if (setCountryFlag) {
      if (!currentCountry) {
        this.resetCounty();
      } else {
        this.country = currentCountry[0];
        this.updateCounty();
      }
    }
  }

  updateCounty() {
    //получаем популяцию страны
    this.setCovidDataList();
    this.changeCovidTableData(this.country, this.country.population);
    this.getCovidHistoricalCountryData();
  }

  resetCounty() {
    this.country = "";
    this.changeCovidTableData(this.dataCovidGlobal, POPULATIONOFEARTH);
    this.setCovidDataList();
    this.updateDiagram(this.dataHistoricalAll);
  }

  /*searchCountryData(countryCode) {
    return this.dataCountry.find((item) => item.alpha2Code === countryCode);
  }*/

  async getCovidData() {
    this.dataCovidGlobal = await this.model.getCovidClobalData();
    console.log(this.dataCovidGlobal);
    this.dataCovidCountry = await this.model.getCovidCountryData();
    console.log(this.dataCovidCountry);

    //const data = await this.model.getCovidData();
    //this.dataCovidCountry = data.Countries;
    //this.dataCovidGlobal = data.Global;
    this.view.addCovidTableData(
      this.dataCovidGlobal.cases,
      this.dataCovidGlobal.deaths,
      this.dataCovidGlobal.recovered
    );
    this.covidList = this.view.covidList;
    this.setCovidDataList();
    this.dataMap = this.createDataArray();
    createPolygonSeries(this.dataMap);
    createTooltipText("TotalConfirmed", this.dataMap);

    //this.addMapMarker();
  }

  async getCovidHistoricalAllData() {
    this.dataHistoricalAll = await this.model.getCovidHistoricalAllData();
    const data = this.getDiagramData(this.dataHistoricalAll.cases, false);

    this.diagram.createDiagram(data);
  }

  async getCovidHistoricalCountryData() {
    this.dataHistoricalCountry = await this.model.getCovidHistoricalCountryData(
      this.country.countryInfo.iso2
    );
    console.log(this.dataHistoricalCountry);
    this.updateDiagram(this.dataHistoricalCountry);
  }

  getDiagramData(dataObject, newFlag, population) {
    const data = [];
    let prev = 0;
    for (const [key, valueData] of Object.entries(dataObject)) {
      const currentValue = population
        ? Math.round((((valueData - prev) * 100000) / population) * 100) / 100
        : valueData - prev;
      const obj = {
        date: key,
        value: currentValue,
      };
      data.push(obj);
      prev = newFlag ? valueData : 0;
      //console.log(`${key}: ${valueData}`);
    }
    //console.log(data);
    return data;
  }

  createDataArray() {
    const data = [];
    this.dataCovidCountry.forEach((item) => {
      const obj = {
        id: item.countryInfo.iso2,
        population: item.population,
        TotalConfirmed: item.cases,
        TotalDeaths: item.deaths,
        TotalRecovered: item.recovered,
        NewConfirmed: item.todayCases,
        NewDeaths: item.todayDeaths,
        NewRecovered: item.todayRecovered,
      };
      data.push(obj);
    });
    return data;
  }

  /*async getCountryData() {
    this.dataCountry = await this.model.getCountryData();
    console.log(this.dataCountry);
  }*/

  changeCovidTableData(dataCovid, population) {
    console.log(dataCovid);
    let confirmed = this.checkboxLastDay
      ? dataCovid.todayCases
      : dataCovid.cases;
    let deaths = this.checkboxLastDay
      ? dataCovid.todayDeaths
      : dataCovid.deaths;
    let recovered = this.checkboxLastDay
      ? dataCovid.todayRecovered
      : dataCovid.recovered;
    console.log(this.checkboxLastDay, dataCovid.recovered);

    population = !population ? 1 : population / 100000;

    if (this.checkboxOneHundThous) {
      confirmed = Math.round((confirmed / population) * 100) / 100;
      deaths = Math.round((deaths / population) * 100) / 100;
      recovered = Math.round((recovered / population) * 100) / 100;
    }
    this.view.addCovidTableData(confirmed, deaths, recovered);
  }
}
