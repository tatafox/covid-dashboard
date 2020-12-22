export default class View {
  constructor() {
    this.covidList;
    this.selectListData;
    this.map;
    this.diagram;
    this.wrapper;
    this.chartWrapper;
    this.wrapperData;
    this.init();
  }

  createElement(typeElem, className, parent, text) {
    const elem = document.createElement(typeElem);
    elem.className = className;
    if (text) elem.innerHTML = text;
    parent.appendChild(elem);
    return elem;
  }

  init() {
    const header = this.createElement("header", "header", document.body);
    this.createElement("h1", "header__title", header, "COVID-19 Dashboard");
    const main = this.createElement("main", "main", document.body);
    this.wrapper = this.createElement("div", "wrapper", main);
    this.chartWrapper = this.createElement(
      "div",
      "chart__wrapper",
      this.wrapper
    );
    this.wrapperData = this.createElement("div", "data-wrapper", this.wrapper);
    this.addMap();
    this.addDiagram();
    this.createFooter();
  }

  createFooter() {
    const footer = this.createElement("footer", "footer", document.body);
    this.createElement("span", "footer__item", footer, "2020");
    let footerA = this.createElement("a", "footer__item", footer, " © tatafox");
    footerA.href = "https://github.com/tatafox";
    footerA.target = "_blank";
    footerA = this.createElement("a", "footer__item", footer);
    footerA.href = "https://rs.school/js/";
    footerA.target = "_blank";
    const footerIMG = this.createElement("img", "footer__img", footerA);
    footerIMG.src = `https://rs.school/images/rs_school_js.svg`;
  }

  addDiagram() {
    const diagramWrap = this.createElement(
      "div",
      "diagram-wrapper",
      this.chartWrapper
    );
    this.createControlPanel(diagramWrap, "map");
    this.diagram = this.createElement("div", "diagram", diagramWrap);
    this.diagram.id = "diagram";
  }

  addMap() {
    const mapWrap = this.createElement("div", "map-wrapper", this.chartWrapper);
    this.createControlPanel(mapWrap, "map");
    this.map = this.createElement("div", "map", mapWrap);
    this.map.id = "map";
  }

  createCheckbox(parrent, name, text, id) {
    const wrap = this.createElement("div", "checkbox-item__wrapper", parrent);

    const checkbox = this.createElement("input", name, wrap);
    checkbox.type = "checkbox";
    checkbox.id = id + name;
    checkbox.name = id + name;
    const label = this.createElement("label", name + "_label", wrap, text);
    label.htmlFor = id + name;

    return checkbox;
  }
  addCovidTable() {
    const covidTable = this.createElement(
      "div",
      "covid-table",
      this.wrapperData
    );

    const tableControl = this.createElement(
      "div",
      "control__wrapper",
      covidTable
    );

    this.addCountrySearch(tableControl, "country-search__table");
    const expandButton = this.createElement(
      "button",
      "button__expand",
      tableControl
    );
    const imgButton = this.createElement("img", "button__img", expandButton);
    imgButton.src = "../assets/expand-button.svg";

    const checkbxWrap = this.createElement(
      "div",
      "checkbox__wrapper",
      tableControl
    );

    const checkboxLastDay = this.createCheckbox(
      checkbxWrap,
      "checkbox__last-day",
      "New cases", // (За последние сутки)",
      "table-"
    );
    /*const LastDayWrap = this.createElement(
      "div",
      "checkbox-item__wrapper",
      checkbxWrap
    );
    this.checkboxLastDay = this.createElement(
      "input",
      "checkbox__last-day",
      LastDayWrap
    );
    this.checkboxLastDay.type = "checkbox";
    this.checkboxLastDay.id = "checkbox__last-day";
    this.checkboxLastDay.name = "checkbox__last-day";
    let label = this.createElement(
      "label",
      "checkbox__last-day_label",
      LastDayWrap,
      "New cases (За последние сутки)"
    );
    label.htmlFor = "checkbox__last-day";*/

    const checkboxOneHundThous = this.createCheckbox(
      checkbxWrap,
      "checkbox__one-hundr-thous",
      "per 100 000 population", // (На 100 000 населения)",
      "table-"
    );

    /*const OneHundThousDayWrap = this.createElement(
      "div",
      "checkbox-item__wrapper",
      checkbxWrap
    );

    this.checkboxOneHundThous = this.createElement(
      "input",
      "checkbox__one-hundr-thous",
      OneHundThousDayWrap
    );
    this.checkboxOneHundThous.type = "checkbox";
    this.checkboxOneHundThous.id = "checkbox__one-hundr-thous";
    this.checkboxOneHundThous.name = "checkbox__one-hundr-thous";
    let label = this.createElement(
      "label",
      "checkbox__one-hundr-thous_label",
      OneHundThousDayWrap,
      "per 100 000 population (На 100 000 населения)"
    );
    label.htmlFor = "checkbox__one-hundr-thous";*/

    this.covidTableData = this.createElement(
      "div",
      "covid-table__data",
      covidTable
    );
  }

  addCovidTableData(confirmed, deaths, recovered) {
    this.clearDOMItem(this.covidTableData);
    let covidTableItem = this.createElement(
      "div",
      "covid-table__item",
      this.covidTableData
    );
    this.createElement(
      "span",
      "covid-table__span",
      covidTableItem,
      "Confirmed:" //(Заболело):"
    );
    this.createElement("span", "covid-table__span", covidTableItem, confirmed);
    covidTableItem = this.createElement(
      "div",
      "covid-table__item",
      this.covidTableData
    );
    this.createElement(
      "span",
      "covid-table__span",
      covidTableItem,
      "Deaths:" //(Умерло):"
    );
    this.createElement("span", "covid-table__span", covidTableItem, deaths);
    covidTableItem = this.createElement(
      "div",
      "covid-table__item",
      this.covidTableData
    );
    this.createElement(
      "span",
      "covid-table__span",
      covidTableItem,
      "Recovered:" //(Выздоровело):"
    );
    this.createElement("span", "covid-table__span", covidTableItem, recovered);
  }

  addCountrySearch(parent, idName) {
    const covidTableCityInput = this.createElement(
      "input",
      "search-country",
      parent
    );
    covidTableCityInput.value = "[Enter city]";

    covidTableCityInput.setAttribute("list", idName);
    const covidTableCityDatalist = this.createElement(
      "datalist",
      "",
      covidTableCityInput
    );
    covidTableCityDatalist.id = idName;
  }

  createControlPanel(parrent, id) {
    const controlPanel = this.createElement("div", "list-control", parrent);
    this.createCheckbox(
      controlPanel,
      "checkbox__one-hundr-thous",
      "per 100 000 population", // (На 100 000 населения)",
      id
    );

    const selectListData = this.createElement(
      "select",
      id + "__select select-data",
      controlPanel
    );
    let options = this.createElement(
      "option",
      id + "__select",
      selectListData,
      "Total confirmed"
    );
    options.selected = "selected";
    options = this.createElement(
      "option",
      id + "__select",
      selectListData,
      "Total death"
    );
    options = this.createElement(
      "option",
      id + "__select",
      selectListData,
      "Total recovered"
    );
    options = this.createElement(
      "option",
      id + "__select",
      selectListData,
      "New confirmed"
    );
    options = this.createElement(
      "option",
      id + "__select",
      selectListData,
      "New death"
    );
    options = this.createElement(
      "option",
      id + "__select",
      selectListData,
      "New recovered"
    );
    //создаем даталист поиска страны
    this.addCountrySearch(controlPanel, id + "__country-search");
    const expandButton = this.createElement(
      "button",
      "button__expand",
      controlPanel
    );
    const imgButton = this.createElement("img", "button__img", expandButton);
    imgButton.src = "../assets/expand-button.svg";
  }

  addCovidList() {
    const covidListWrapper = this.createElement(
      "div",
      "list-wrapper",
      this.wrapperData
    );
    this.createControlPanel(covidListWrapper, "covid-list");

    /*const covidListControl = this.createElement(
      "div",
      "list-control",
      covidListWrapper
    );
    this.createCheckbox(
      covidListControl,
      "checkbox__one-hundr-thous",
      "per 100 000 population (На 100 000 населения)",
      "list-"
    );

    this.selectListData = this.createElement(
      "select",
      "covid-list__select",
      covidListControl
    );
    let options = this.createElement(
      "option",
      "covid-list__select",
      this.selectListData,
      "Total confirmed"
    );
    options.selected = "selected";
    options = this.createElement(
      "option",
      "covid-list__select",
      this.selectListData,
      "Total death"
    );
    options = this.createElement(
      "option",
      "covid-list__select",
      this.selectListData,
      "Total recovered"
    );
    options = this.createElement(
      "option",
      "covid-list__select",
      this.selectListData,
      "New confirmed"
    );
    options = this.createElement(
      "option",
      "covid-list__select",
      this.selectListData,
      "New death"
    );
    options = this.createElement(
      "option",
      "covid-list__select",
      this.selectListData,
      "New recovered"
    );
    //создаем даталист поиска страны
    this.addCountrySearch(covidListControl, "country-search__list");*/

    this.covidList = this.createElement("ul", "covid-list", covidListWrapper);
  }

  clearDOMItem(item) {
    item.innerHTML = "";
  }

  createListItem(itemCountry, itemData, flag) {
    const covidItem = this.createElement("li", "covid-item", this.covidList);
    const img = this.createElement("img", "covid-item__data", covidItem);
    img.src = flag;
    img.width = "50";
    this.createElement("span", "covid-item__data", covidItem, itemCountry);
    this.createElement("span", "covid-item__data", covidItem, itemData);
  }
}
