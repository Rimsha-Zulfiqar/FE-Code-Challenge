

const urlParams = new URLSearchParams(window.location.search);
const country = urlParams.get('country');
console.log(country);

window.onload = function() {
  if (!country) {
    console.log('Country not found in URL');
    return;
  }
  
  const fetchCountryData = fetch(`https://restcountries.com/v3/name/${country}`)
    .then(response => response.json())
    .then(([country]) => {
      console.log(country);
      let container = document.getElementById("detail-container");
      container.textContent = '';
      container.insertAdjacentHTML(
        'afterbegin', `
        <div class="grid">
  <div class="left-column">
    <img src="${country.flags[1]}" alt="${country.name.common} flag" />
  </div>
  <div class="right-column">
    <div class="row">
      <div class="box country-name">${country.name.common}</div>
    </div>
    <div class="row">
      <div class="col">
        <div class="box">${country.nativeName}</div>
        <div class="box">${country.population}</div>
        <div class="box">${country.region} (${country.subregion})</div>
        <div class="box">${country.capital}</div>
      </div>
      <div class="col">
        <div class="box">${country.topLevelDomain}</div>
        <div class="box">${Object.values(country.currencies)[0].name} (${Object.values(country.currencies)[0].symbol})</div>
        <div class="box">${Object.values(country.languages).map(lang => lang.name).join(", ")}</div>
      </div>
    </div>
    <div class="row">
      <div class="box">${country.borders.join(", ")}</div>
    </div>
  </div>
</div>

      `);
    })
    .catch(error => console.log(error));
};


