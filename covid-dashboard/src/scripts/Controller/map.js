let map;
function addMap() {
  /* // Creating map options
  let mapOptions = {
    center: [28.304, -3.867],
    zoom: 3,
  };

  // Creating a map object
  let map = new L.map("map", mapOptions);

  // Creating a Layer object
  let layer = new L.TileLayer(
    "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  );

  // Adding layer to the map
  map.addLayer(layer);

  let circle = L.circle([51.508, -0.11], {
    color: "red",
    fillColor: "#f03",
    fillOpacity: 0.5,
    radius: 1500,
  }).addTo(map);*/

  DG.then(function () {
    map = DG.map("map", {
      center: [28.304, -3.867],
      zoom: 3,
      currentLang: "en",
      worldCopyJump: true,
    });
  });

  DG.then(function () {
    map.on("click", (e) => {
      click(e.latlng.lat);
      click(e.latlng.lng);
      getReverseGeocod(e.latlng.lat, e.latlng.lng);
    });
  });
  DG.then(function () {
    map.on("mousemove", (e) => {
      //getReverseGeocod(e.latlng.lat, e.latlng.lng);
    });
  });

  //const map = L.map(myMap, { worldCopyJump: true })
  /*let map;

  DG.then(function () {
    map = DG.map("map", {
      center: [28.304, -3.867],
      zoom: 3,
      currentLang: "en",
    });

    map.setLang("en");

    var myIcon = DG.icon({
      iconUrl: "./assets/my-icon.png",
      iconSize: [38, 38],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
      //      shadowUrl: 'my-icon-shadow.png',
      //      shadowRetinaUrl: 'my-icon-shadow@2x.png',
      //      shadowSize: [68, 95],
      //     shadowAnchor: [22, 94]
    });

    DG.marker([50.505, 30.57], { icon: myIcon })
      .addTo(map)
      .bindPopup("Я бабочка!");

    //DG.marker([54.98, 82.89]).addTo(map).bindPopup("Вы кликнули по мне!");
    map.on("click", (e) => {
      click(e.latlng.lat);
      click(e.latlng.lng);
      getReverseGeocod(e.latlng.lat, e.latlng.lng);*/
  //click(map);
  /*map.geocoder.get(new DG.GeoPoint(82.927810142519, 55.028936234826), {
        types: ["house"],
        radius: 200,
        limit: 10,
        // Обработка успешного поиска
        success: function (geocoderObjects) {
          click(geocoderObjects);
        },
        // Обработка ошибок
        /*failure: function(code, message) {
            alert(code + ' ' + message);
        }
      });*/
  // });
  //function (e) {
  //сonsole.log(e);
  //});
  //});

  /*map = DG.map("map", {
    center: [54.98, 82.89],
    zoom: 13,
  });*/

  //map.click("click", (e) =>
  //getReverseGeocod(e.latlng.lat, e.latlng.lng)
  //  console.log(e)
  //);
  /*function (e) {

    //new L.Marker([e.latlng.lat, e.latlng.lng]).addTo(map);
  });*/
}

function click(e) {
  console.log(e);
}

function addMarker(lat, lng, country) {
  DG.then(function () {
    let myIcon = DG.icon({
      iconUrl: "./assets/my-icon.png",
      iconSize: [12, 12],
      //iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
      //      shadowUrl: 'my-icon-shadow.png',
      //      shadowRetinaUrl: 'my-icon-shadow@2x.png',
      //      shadowSize: [68, 95],
      //     shadowAnchor: [22, 94]
    });
    const str = "" + lat + " " + lng + " " + country;
    DG.marker([lat, lng], { icon: myIcon }).addTo(map).bindPopup(str);
  });
}

async function getReverseGeocod(lat, lng) {
  //let loading = true;
  let data;
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`;
    const res = await fetch(url);
    data = await res.json();
    console.log(data.address.country_code);
  } catch (e) {
    console.log("ошибка");
  } finally {
    //
  }
  //console.log(data, address.country_code);
  return data;
}

export { addMap, addMarker, map };
