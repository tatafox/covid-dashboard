export default class View {
  constructor() {
    this.checkboxLastDay;
    this.checkboxOneHundThous;
    this.covidTableCityInput;
  }

  createElement(typeElem, className, parent, text) {
    const elem = document.createElement(typeElem);
    elem.className = className;
    if (text) elem.innerHTML = text;
    parent.appendChild(elem);
    return elem;
  }

  addCovidTable() {
    const covidTable = this.createElement("div", "covid-table", document.body);
    /*const covidTableCity = this.createElement(
      "div",
      "covid-table__city",
      covidTable,
      "[Enter City]"
    );*/

    //создаем даталист
    this.covidTableCityInput = document.createElement("input");
    this.covidTableCityInput.setAttribute("list", "city-list");
    covidTable.appendChild(this.covidTableCityInput);
    //<datalist id="my-list"></datalist>
    const covidTableCityDatalist = document.createElement("datalist");
    covidTableCityDatalist.id = "city-list";
    covidTable.appendChild(covidTableCityDatalist);

    /*covidTableCity.addEventListener("keypress", this.setCountry);
    covidTableCity.addEventListener("click", this.clickCountry);
    covidTableCity.addEventListener("blur", this.setCountry);*/
    //covidTableCity.contentEditable = true;
    //<div class="city" contenteditable="true">
    this.checkboxLastDay = this.createElement(
      "input",
      "checkbox__last-day",
      covidTable
    );
    this.checkboxLastDay.type = "checkbox";
    this.checkboxLastDay.id = "checkbox__last-day";
    this.checkboxLastDay.name = "checkbox__last-day";
    let label = this.createElement(
      "label",
      "checkbox__last-day_label",
      covidTable,
      "New cases (За последние сутки)"
    );
    label.htmlFor = "checkbox__last-day";
    //this.checkboxLastDay.addEventListener("click", switchLastDay);

    this.checkboxOneHundThous = this.createElement(
      "input",
      "checkbox__one-hundr-thous",
      covidTable
    );
    this.checkboxOneHundThous.type = "checkbox";
    this.checkboxOneHundThous.id = "checkbox__one-hundr-thous";
    this.checkboxOneHundThous.name = "checkbox__one-hundr-thous";
    label = this.createElement(
      "label",
      "checkbox__one-hundr-thous_label",
      covidTable,
      "100 000 population cases (На 100 000 населения)"
    );
    label.htmlFor = "checkbox__one-hundr-thous";
    //this.checkboxOneHundThous.addEventListener("click", switchOneHundThous);
    this.covidTableData = this.createElement(
      "div",
      "covid-table__data",
      covidTable
    );
  }

  addCovidTableData(confirmed, deaths, recovered) {
    this.covidTableData.innerHTML = "";
    let covidTableItem = this.createElement(
      "div",
      "covid-table__item",
      this.covidTableData
    );
    this.createElement(
      "span",
      "covid-table__item",
      covidTableItem,
      "Confirmed(Заболело):"
    );
    this.createElement("span", "covid-table__item", covidTableItem, confirmed);
    covidTableItem = this.createElement(
      "div",
      "covid-table__item",
      this.covidTableData
    );
    this.createElement(
      "span",
      "covid-table__item",
      covidTableItem,
      "Deaths(Умерло):"
    );
    this.createElement("span", "covid-table__item", covidTableItem, deaths);
    covidTableItem = this.createElement(
      "div",
      "covid-table__item",
      this.covidTableData
    );
    this.createElement(
      "span",
      "covid-table__item",
      covidTableItem,
      "Recovered(Выздоровело):"
    );
    this.createElement("span", "covid-table__item", covidTableItem, recovered);
  }
}
