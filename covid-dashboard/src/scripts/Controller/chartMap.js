let polygonSeries;
let polygonTemplate;
let chart;

const dataType = [
  "TotalConfirmed",
  "TotalDeaths",
  "TotalRecovered",
  "NewConfirmed",
  "NewDeaths",
  "NewRecovered",
];

function initChartMap() {
  chart = am4core.create("map", am4maps.MapChart);
  chart.zoomControl = new am4maps.ZoomControl();
  chart.zoomControl.align = "left";
  chart.zoomControl.marginRight = 20;
  chart.zoomControl.valign = "top";

  chart.geodata = am4geodata_worldLow;

  chart.projection = new am4maps.projections.Miller();
}

function delPolygonSeries() {
  polygonSeries.dispose();
}

function createPolygonSeries(data) {
  polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

  polygonSeries.useGeodata = true;

  // Exclude Antarctica
  polygonSeries.exclude = ["AQ"];

  polygonTemplate = polygonSeries.mapPolygons.template;
  polygonTemplate.fill = am4core.color("#15B2D6");

  let hs = polygonTemplate.states.create("hover");
  hs.properties.opacity = 0.5;

  polygonSeries.data = data;
  polygonTemplate.dataItem = data;
  return polygonTemplate;
}

function createTooltipText(type, dataMap, flag100) {
  const findType = dataType.find((item) => item === type);
  dataMap.sort((a, b) => b[findType] - a[findType]);
  const max = dataMap[0][findType];

  const str = "[bold]{name}:[/] {" + findType + "}";
  polygonTemplate.adapter.add("fillOpacity", function (fillOpacity, target) {
    const currentValue = target.dataItem._dataContext[findType];
    const opacity = !currentValue ? 0.2 : (currentValue * 0.7) / max + 0.2; //.TotalConfirmed);
    return (fillOpacity = opacity);
  });
  polygonTemplate.adapter.add("tooltipText", function (tooltipText, target) {
    const currentValue = target.dataItem._dataContext[findType];
    const valOn100 = !currentValue
      ? 0
      : (currentValue * 100000) / target.dataItem._dataContext.population;
    const amount = flag100 ? Math.round(valOn100 * 100) / 100 : currentValue;
    const str = "[bold]{name}:[/] " + amount + " ";
    return (tooltipText = str);
  });
}

function zoomCountry(mapPolygon) {
  chart.zoomToMapObject(mapPolygon, getZoomLevel(mapPolygon));
}

function zoomOut() {
  chart.goHome();
}

function getZoomLevel(mapPolygon) {
  const w = mapPolygon.polygon.bbox.width;
  const h = mapPolygon.polygon.bbox.width;
  return Math.min(chart.seriesWidth / (w * 2), chart.seriesHeight / (h * 2));
}

export {
  initChartMap,
  createPolygonSeries,
  delPolygonSeries,
  createTooltipText,
  zoomCountry,
  zoomOut,
  polygonSeries,
  polygonTemplate,
};
