let currentCountry;
let setCountryFlag = false;

function setCountry(e, dataCovidCountry) {
  //console.log(e.target.value);
  const dataList = document.getElementById("city-list");
  setCountryFlag = false;
  if (
    e.type === "blur" ||
    (e.type === "keydown" && (e.which == 13 || e.keyCode == 13))
  ) {
    setCountryFlag = true;
    if (e.target.value === "") {
      setDefault(e, dataList);
    } else {
      //console.log(e.target.value);
      currentCountry = dataCovidCountry.filter(
        (item) => item.Country.toLowerCase() === e.target.value.toLowerCase()
      );
      //console.log(currentCountry);
      if (!currentCountry || currentCountry.length === 0) {
        setDefault(e, dataList);
      } else {
        e.target.value = currentCountry[0].Country;
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
      (item) => item.Slug.indexOf(searchValue.toLowerCase()) !== -1
    );
    searchArray.forEach((item) => {
      const optionHTML = document.createElement("option");
      optionHTML.setAttribute("value", item.Country);
      dataList.appendChild(optionHTML);
    });
  }
}

function clickCountry(e) {
  e.target.value = "";
}

function setDefault(e, dataList) {
  e.target.value = "[Enter city]";
  currentCountry = "";
  dataList.innerHTML = "";
  e.target.blur();
}
export { setCountry, clickCountry, currentCountry, setCountryFlag };
