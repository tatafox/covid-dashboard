export default class Diagram {
  constructor() {
    this.chart;
  }
  createDiagram(data) {
    // Apply chart themes
    //am4core.useTheme(am4themes_animated);
    //am4core.useTheme(am4themes_kelly);

    // Create chart instance
    this.chart = am4core.create("diagram", am4charts.XYChart);

    // Add data
    this.chart.data = data; /*[
    {
      country: "Lithuania",
      litres: 501.9,
      units: 250,
    },
    {
      country: "Czech Republic",
      litres: 301.9,
      units: 222,
    },
    {
      country: "Ireland",
      litres: 201.1,
      units: 170,
    },
    {
      country: "Germany",
      litres: 165.8,
      units: 122,
    },
    {
      country: "Australia",
      litres: 139.9,
      units: 99,
    },
    {
      country: "Austria",
      litres: 128.3,
      units: 85,
    },
    {
      country: "UK",
      litres: 99,
      units: 93,
    },
    {
      country: "Belgium",
      litres: 60,
      units: 50,
    },
    {
      country: "The Netherlands",
      litres: 50,
      units: 42,
    },
  ];*/

    // Create axes
    const categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "date";
    //categoryAxis.renderer.minGridDistance = 40;
    // categoryAxis.title.text = "date";

    const valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
    // valueAxis.renderer.minGridDistance = 40;
    //valueAxis.title.text = "Litres sold (M)";

    const series = this.chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "value";
    series.dataFields.categoryX = "date";
    series.name = "value";
    series.tooltipText = "[bold]{categoryX}:[/] {valueY}";
    series.strokeWidth = 3;

    // Add legend
    //chart.legend = new am4charts.Legend();

    // Add cursor
    this.chart.cursor = new am4charts.XYCursor();

    // Add simple vertical scrollbar
    //this.chart.scrollbarY = new am4core.Scrollbar();

    // Add horizotal scrollbar with preview
    /* const scrollbarX = new am4charts.XYChartScrollbar();
  scrollbarX.series.push(series);
  chart.scrollbarX = scrollbarX;*/
  }
  clear() {
    this.chart.dispose();
  }
}
