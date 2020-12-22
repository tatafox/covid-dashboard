export default class Model {
  constructor() {
    this.loading = false;
    this.loadingCountry = false;
  }

  /*async getCovidData() {
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
  }*/

  async getCovidClobalData() {
    this.loadingCountry = true;
    let dataCountry;
    try {
      const urlCountry = `https://disease.sh/v3/covid-19/all`;
      const resCountry = await fetch(urlCountry);
      dataCountry = await resCountry.json();
    } catch (e) {
      console.log("ошибка");
    } finally {
      this.loadingCountry = false;
    }
    return dataCountry;
  }

  async getCovidCountryData() {
    this.loadingCountry = true;
    let dataCountry;
    try {
      const urlCountry = `https://disease.sh/v3/covid-19/countries`;
      const resCountry = await fetch(urlCountry);
      dataCountry = await resCountry.json();
    } catch (e) {
      console.log("ошибка");
    } finally {
      this.loadingCountry = false;
    }
    return dataCountry;
  }

  async getCovidHistoricalAllData() {
    this.loadingCountry = true;
    let dataCountry;
    try {
      const urlCountry = `https://disease.sh/v3/covid-19/historical/all?lastdays=366`;
      const resCountry = await fetch(urlCountry);
      dataCountry = await resCountry.json();
    } catch (e) {
      console.log("ошибка");
    } finally {
      this.loadingCountry = false;
    }
    return dataCountry;
  }

  async getCovidHistoricalCountryData(country) {
    this.loadingCountry = true;
    let dataCountry;
    try {
      const urlCountry = `https://disease.sh/v3/covid-19/historical/${country}?lastdays=366`;
      const resCountry = await fetch(urlCountry);
      dataCountry = await resCountry.json();
    } catch (e) {
      console.log("ошибка");
    } finally {
      this.loadingCountry = false;
    }
    //console.log(dataCountry.timeline);
    return dataCountry.timeline;
  }
}

/*async getReverseGeocod(lat,lng) {
  this.loading = true;
  let data;
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;      const res = await fetch(url);
    data = await res.json();
    console.log(data);
  } catch (e) {
    console.log("ошибка");
  } finally {
    this.loading = false;
  }
  return data;
}*/
