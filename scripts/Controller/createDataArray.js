export default function createDataArray(data) {
  const newData = [];
  data.forEach((item) => {
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
    newData.push(obj);
  });
  return newData;
}
