export default class Diagram {
  constructor() {
    this.chart;
  }
  createDiagram(data) {
    this.chart = am4core.create("diagram", am4charts.XYChart);

    this.chart.data = data;

    const categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "date";

    const valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());

    const series = this.chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "value";
    series.dataFields.categoryX = "date";
    series.name = "value";
    series.tooltipText = "[bold]{categoryX}:[/] {valueY}";
    series.strokeWidth = 3;

    this.chart.cursor = new am4charts.XYCursor();
  }
  clear() {
    this.chart.dispose();
  }
}
