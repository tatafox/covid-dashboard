export default class View {
  constructor() {
    this.checkboxLastDay;
    this.checkboxOneHundThous;
    this.covidList;
    this.selectListData;
    this.map;
    this.wrapper = this.createElement("div", "wrapper", document.body);
    this.wrapperData = this.createElement("div", "data-wrapper", this.wrapper);
    this.addMap();
  }

  createElement(typeElem, className, parent, text) {
    const elem = document.createElement(typeElem);
    elem.className = className;
    if (text) elem.innerHTML = text;
    parent.appendChild(elem);
    return elem;
  }

  addMap() {
    const mapWrap = this.createElement("div", "map-wrapper", this.wrapper);
    this.map = this.createElement("div", "map", mapWrap);
    this.map.id = "map";

    //const img = this.createElement("img", "covid-map__img", mapWrap);
    //img.src = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0jTi1xs9naXIcBK23UXcddbpU6Ad9JAHJWw&usqp=CAU`;
  }

  addCovidTable() {
    //this.wrapper = this.createElement("div", "wrapper", document.body);
    const covidTable = this.createElement(
      "div",
      "covid-table",
      this.wrapperData
    );
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
    const checkbxWrap = this.createElement(
      "div",
      "checkbox__wrapper",
      covidTable
    );
    const LastDayWrap = this.createElement(
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
    label.htmlFor = "checkbox__last-day";
    //this.checkboxLastDay.addEventListener("click", switchLastDay);

    const OneHundThousDayWrap = this.createElement(
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
    label = this.createElement(
      "label",
      "checkbox__one-hundr-thous_label",
      OneHundThousDayWrap,
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
      "covid-table__span",
      covidTableItem,
      "Confirmed(Заболело):"
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
      "Deaths(Умерло):"
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
      "Recovered(Выздоровело):"
    );
    this.createElement("span", "covid-table__span", covidTableItem, recovered);
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
      this.wrapperData
    );

    const covidListControl = this.createElement(
      "div",
      "list-control",
      covidListWrapper
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
    this.addCountrySearch(covidListControl, "country-search__list");

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
    this.createElement("span", "covid-item__data", covidItem, itemCountry);
    this.createElement("span", "covid-item__data", covidItem, itemData);
  }
}
