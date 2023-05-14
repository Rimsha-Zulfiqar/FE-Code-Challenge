


let countriesData = [];
async function fetchCountriesData() {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}


async function renderCountriesData() {
  countriesData = await fetchCountriesData();
  const container = document.getElementById("flag-container");
  countriesData.map((country) => {
    const countryDiv = document.createElement('div');
    countryDiv.classList.add('flag-card');
    countryDiv.addEventListener('click', function(event) {
      navigateCountry(country.name.common);
    });
    countryDiv.innerHTML = `
      <div class="flag-image">
        <img src="${country.flags.png}" width="270" height="200"></img>
      </div>
      <div class="flag-info">
        <h2><b>${country.name.common}</b></h2>
        <p><b>Population:</b> ${country.population}</p>
        <p><b>Capital: </b>${country.capital}</p>
      </div>
    `;
    container.appendChild(countryDiv);
  });
}
renderCountriesData();




let searchBar = document.getElementById('search-bar');
let filterFeature = document.getElementById('filter-feature');

searchBar.addEventListener('input', filterCountries);
filterFeature.addEventListener('change', filterCountries);

function filterCountries() {
  const filter = filterFeature.value.toLowerCase();
  const search = searchBar.value.toLowerCase();
  
  const filteredCountries = countriesData.filter(country => {
    const nameMatches = country.name.common.toLowerCase().includes(search);
    const regionMatches = filter === 'filter by region' || country.region.toLowerCase().includes(filter);
    
    return nameMatches && regionMatches;
  });
  
  renderFilteredCountries(filteredCountries);
}


function renderFilteredCountries(filteredCountries) {
  let container = document.getElementById('flag-container');
  container.innerHTML = '';

  for (let country of filteredCountries) {
    let countryDiv = document.createElement('div');
    countryDiv.classList.add('flag-card');

    countryDiv.addEventListener('click', function () {
      localStorage.setItem('countryData', JSON.stringify(country));
      window.location.href = 'detail-view.html';
    });

    countryDiv.insertAdjacentHTML(
      'afterbegin',
      `<div class="flag-image">
          <img src="${country.flags.svg}" alt="${country.name.common} flag">
        </div>
        <div class="flag-info">
          <h2>${country.name.common}</h2>
          <p><strong>Population:</strong> ${country.population}</p>
          <p><strong>Region:</strong> ${country.region}</p>
          <p><strong>Capital:</strong> ${country.capital}</p>
        </div>`
    );
    container.appendChild(countryDiv);
  }
}



function goBack() {
  window.history.back();
}




























function navigateCountry(countryName) {
  const url = `detail-view.html?country=${countryName}`;
  window.location.href = url;
}

























