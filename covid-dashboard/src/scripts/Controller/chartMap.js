let polygonTemplate;
let polygonSeries;

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
  let chart = am4core.create("map", am4maps.MapChart);
  chart.zoomControl = new am4maps.ZoomControl();
  chart.zoomControl.align = "right";
  chart.zoomControl.marginRight = 20;
  chart.zoomControl.valign = "top";

  // Set map definition
  chart.geodata = am4geodata_worldLow;

  // Set projection
  chart.projection = new am4maps.projections.Miller();

  // Create map polygon series
  polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
  //polygonSeries.data[0].confirmed = 10520;

  // Make map load polygon (like country names) data from GeoJSON
  polygonSeries.useGeodata = true;

  // Exclude Antarctica
  polygonSeries.exclude = ["AQ"];

  // Configure series
  polygonTemplate = polygonSeries.mapPolygons.template;
  polygonTemplate.fill = am4core.color("#adf3ff");

  /*polygonTemplate.fill = countryColor;
polygonTemplate.fillOpacity = 1;
polygonTemplate.stroke = countryStrokeColor;
polygonTemplate.strokeOpacity = 0.15;*/

  // Create hover state and set alternative fill color
  let hs = polygonTemplate.states.create("hover");
  hs.properties.opacity = 0.5;

  const data = [
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
  ];
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

function createPolygonSeriesData(data) {
  polygonSeries.data = data;
  polygonTemplate.fillOpacity = 1;

  //console.log(polygonSeries.data);

  // Bind "fill" property to "fill" key in data
  //polygonTemplate.propertyFields.fill = "fill";
}

function createTooltipText(type, flag100) {
  const findType = dataType.find((item) => item === type);
  console.log(findType);
  const str = "[bold]{name}:[/] {" + findType + "}";
  polygonTemplate.tooltipText = str;
}

export { initChartMap, createPolygonSeriesData, createTooltipText };
