let currentCountry;
let setCountryFlag = false;

function setCountry(e, dataCovidCountry) {
  const dataList = e.path[0].children[0];
  setCountryFlag = false;
  if (
    e.type === "blur" ||
    (e.type === "keydown" && (e.which == 13 || e.keyCode == 13))
  ) {
    setCountryFlag = true;
    if (e.target.value === "") {
      setDefault(e, dataList);
    } else {
      currentCountry = dataCovidCountry.filter(
        (item) => item.country.toLowerCase() === e.target.value.toLowerCase()
      );
      if (!currentCountry || currentCountry.length === 0) {
        setDefault(e, dataList);
      } else {
        e.target.value = currentCountry[0].country;
        document.querySelectorAll(".search-country").forEach((item) => (item.value = currentCountry[0].country));
      }
      e.target.blur();
    }
  } else if (e.type === "keydown" && (e.which !== 13 || e.keyCode !== 13)) {
    dataList.innerHTML = "";
    const searchValue =
      e.key === "Backspace"
        ? e.target.value.slice(0, -1)
        : e.target.value + e.key;
    const searchArray = dataCovidCountry.filter(
      (item) => item.country.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
    );
    searchArray.forEach((item) => {
      const optionHTML = document.createElement("option");
      optionHTML.setAttribute("value", item.country);
      dataList.appendChild(optionHTML);
    });
  }
}

function clickCountry(e) {
  e.target.value = "";
}

function setDefault(e, dataList) {
  document.querySelectorAll(".search-country").forEach((item) => (item.value = "[Enter city]"));
  currentCountry = "";
  dataList.innerHTML = "";
  e.target.blur();
}
export { setCountry, clickCountry, currentCountry, setCountryFlag };
