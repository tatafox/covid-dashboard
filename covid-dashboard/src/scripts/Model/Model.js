export default class Model {
  constructor() {
    this.loading = false;
    this.loadingCountry = false;
  }

  async getCovidClobalData() {
    this.loadingCountry = true;
    let dataCountry;
    try {
      const urlCountry = `https://disease.sh/v3/covid-19/all`;
      const resCountry = await fetch(urlCountry);
      dataCountry = await resCountry.json();
    } catch (e) {
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
    } finally {
      this.loadingCountry = false;
    }
    return dataCountry.timeline;
  }
}
