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
  // Create map instance
  chart = am4core.create("map", am4maps.MapChart);
  chart.zoomControl = new am4maps.ZoomControl();
  chart.zoomControl.align = "right";
  chart.zoomControl.marginRight = 20;
  chart.zoomControl.valign = "top";

  // Set map definition
  chart.geodata = am4geodata_worldLow;

  // Set projection
  chart.projection = new am4maps.projections.Miller();

  /*const data = [
    {
      id: "US",
      name: "United States",
      value: 100,
      fill: am4core.color("#F05C5C"),
    },
    {
      id: "FR",
      name: "France",
      value: 50,
      fill: am4core.color("#5C5CFF"),
    },
  ];*/
  //createPolygonSeriesData(data);
  /*polygonTemplate.events.on("hit", function (ev) {
    chart.closeAllPopups();
    chart.openPopup(
      "We clicked on <strong>" +
        ev.target.dataItem.dataContext.name +
        "</strong>"
    );
  });*/
}

function delPolygonSeries() {
  polygonSeries.dispose();
}

function createPolygonSeries(data) {
  // Create map polygon series
  polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
  polygonSeries.calculateVisualCenter = true;
  polygonSeries.useGeodata = true;

  // Exclude Antarctica
  polygonSeries.exclude = ["AQ"];
  // Configure series
  polygonTemplate = polygonSeries.mapPolygons.template;
  polygonTemplate.fill = am4core.color("#15B2D6");

  /*polygonTemplate.fill = countryColor;
  polygonTemplate.fillOpacity = 1;
  polygonTemplate.stroke = countryStrokeColor;
  polygonTemplate.strokeOpacity = 0.15;*/

  // Create hover state and set alternative fill color
  let hs = polygonTemplate.states.create("hover");
  hs.properties.opacity = 0.5;

  polygonSeries.data = data;
  polygonTemplate.dataItem = data;
  //polygonSeries.tooltipDataItem = data;
  // Bind "fill" property to "fill" key in data
  //polygonTemplate.propertyFields.fill = "fill";
}

function createTooltipText(type, dataMap, flag100) {
  /*series.tooltip.pointerOrientation = "down";
  series.tooltip.getStrokeFromObject = true;
  series.tooltip.getFillFromObject = false;
  series.tooltip.background.fillOpacity = 0.2;
  series.tooltip.background.fill = am4core.color("#000000");
  series.tooltip.dy = -4;
  series.tooltip.fontSize = "0.8em";
  series.tooltipText = "{valueY}";*/
  //if (polygonTemplate) polygonTemplate.clear();

  //console.log(polygonTemplate.tooltipText);
  //console.log(polygonTemplate);
  const findType = dataType.find((item) => item === type);
  dataMap.sort((a, b) => b[findType] - a[findType]);
  //console.log(this.dataMap.sort((a, b) => b[1] - a[1]));
  console.log(dataMap[0][findType]);
  const max = dataMap[0][findType];

  const str = "[bold]{name}:[/] {" + findType + "}";
  //console.log(str);
  //polygonSeries.tooltipText = str;
  polygonTemplate.tooltipText = str;
  //console.log(polygonTemplate.tooltipText);
  //polygonTemplate.fillOpacity = n;
  polygonTemplate.adapter.add("fillOpacity", function (fillOpacity, target) {
    const currentValue = target.dataItem._dataContext[findType];
    const opacity = !currentValue ? 0.2 : (currentValue * 0.7) / max + 0.2; //.TotalConfirmed);
    console.log(opacity);
    return (fillOpacity = opacity);
  });
  /*polygonTemplate.adapter.add("tooltipText", function (tooltipText, target) {
    console.log(target.dataItem._dataContext[findType], findType, type); //.TotalConfirmed);
    return (tooltipText = target.dataItem._dataContext[findType]);
  });*/

  //polygonSeries.dispose();
}

export {
  initChartMap,
  createPolygonSeries,
  delPolygonSeries,
  createTooltipText,
  polygonTemplate,
};
