export default class View {
  constructor() {
    this.checkboxLastDay;
    this.checkboxOneHundThous;
    this.covidList;
    this.selectListData;
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
    this.addCountrySearch(covidTable, "country-search__table");
    /*this.covidTableCityInput = document.createElement("input");
    this.covidTableCityInput.setAttribute("list", "city-list");
    covidTable.appendChild(this.covidTableCityInput);
    //<datalist id="my-list"></datalist>
    const covidTableCityDatalist = document.createElement("datalist");
    covidTableCityDatalist.id = "city-list";
    covidTable.appendChild(covidTableCityDatalist);*/

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

  addCountrySearch(parent, idName) {
    const covidTableCityInput = this.createElement(
      "input",
      "search-country",
      parent
    );
    //document.createElement("input");
    covidTableCityInput.setAttribute("list", idName);
    //parent.appendChild(covidTableCityInput);
    //<datalist id="my-list"></datalist>
    const covidTableCityDatalist = this.createElement(
      "datalist",
      "",
      covidTableCityInput
    );
    //document.createElement("datalist");
    covidTableCityDatalist.id = idName;
    //covidTable.appendChild(covidTableCityDatalist);
  }

  addCovidList() {
    const covidListWrapper = this.createElement(
      "div",
      "list-wrapper",
      document.body
    );
    //создаем даталист поиска страны
    this.addCountrySearch(covidListWrapper, "country-search__list");
    /*this.covidTableCityInput = document.createElement("input");
    this.covidTableCityInput.setAttribute("list", "city-list");
    covidTable.appendChild(this.covidTableCityInput);
    //<datalist id="my-list"></datalist>
    const covidTableCityDatalist = document.createElement("datalist");
    covidTableCityDatalist.id = "city-list";
    covidTable.appendChild(covidTableCityDatalist);
*/
    /* <select name="" id="">
2
  <option value="pravo">Гражданское право — отрасль права, объединяющая правовые нормы, регулирующие имущественные, а также связанные и не связанные с ними личные неимущественные отношения, которые основаны на независимости оценки, имущественной самостоятельности и юридическом равенстве сторон, в целях создания наиболее благоприятных условий
3
  </option>
4
</select>
selected="selected"*/
    this.selectListData = this.createElement(
      "select",
      "covid-list__select",
      covidListWrapper
    );
    let options = this.createElement(
      "option",
      "covid-list__select",
      this.selectListData,
      "Total cases"
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
      "New cases"
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
    this.covidList = this.createElement("ul", "covid-list", covidListWrapper);
    /*console.log(listData);
    listData.forEach((item) => {
      const covidItem = this.createElement("li", "covid-item", covidList);
      this.createElement("span", "covid-item__name", covidItem, item.Country);
      this.createElement(
        "span",
        "covid-item__data",
        covidItem,
        item.TotalConfirmed
      );
    });*/
  }

  clearDOMItem(item) {
    item.innerHTML = "";
  }

  createListItem(itemCountry, itemData, flag) {
    const covidItem = this.createElement("li", "covid-item", this.covidList);
    const img = this.createElement("img", "covid-item__data", covidItem);
    img.src = flag;
    img.width = "50";
    this.createElement("span", "covid-item__name", covidItem, itemCountry);
    this.createElement("span", "covid-item__data", covidItem, itemData);
  }
}
