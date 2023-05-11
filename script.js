

let countriesData = [];
async function fetchCountriesData() {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}


let clickedDivValue;


async function renderCountriesData(){
  countriesData = await fetchCountriesData();
  let html = '';
  let container = document.getElementById("flag-container");


  for(country in countriesData){
    let countryDiv = document.createElement('div');
    countryDiv.classList.add('flag-card');

    countryDiv.addEventListener('click', function(event) {
      const value = event.target.textContent;
      clickedDivValue = value;
      localStorage.setItem('countryData', JSON.stringify(countriesData[country]));
      window.location.href = 'detail-view.html';

    });     

    countryDiv.insertAdjacentHTML('afterbegin',
        `<div class="flag-image">
            <img src="${countriesData[country].flags.png}" width="270" height="200"></img>
        </div>
        <div class="flag-info">
            <h2><b>${countriesData[country].name.common}</b></h2>
            <p><b>Population:</b> ${countriesData[country].population}</p>
            <p><b>Capital: </b>${countriesData[country].capital}</p>
        </div>
        `
    )
    container.appendChild(countryDiv);
   
  }
 
}
renderCountriesData();


console.log(clickedDivValue);


let searchBar = document.getElementById('search-bar');
let filterFeature = document.getElementById('filter-feature');

searchBar.addEventListener('input', filterCountries);
filterFeature.addEventListener('change', filterCountries);

function filterCountries() {
  let filter = filterFeature.value;
  let search = searchBar.value.toLowerCase();
  let filteredCountries = countriesData.filter((country) => {
    if (filter === 'filter by region' || filter === '') {
      return country.name.common.toLowerCase().includes(search);
    } else {
      return (
        country.region.toLowerCase() === filter &&
        country.name.common.toLowerCase().includes(search)
      );
    }
  });
  renderFilteredCountries(filteredCountries);
}


function renderFilteredCountries(filteredCountries) {
  let html = '';
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








function renderCountries(countries) {
  const container = document.getElementById("detail-container");
  let html = "";
    html += `
    <div class="box left-column"><img src="${country.flag}" alt="${country.name} flag" /></div>
        <div class="right-column">
          <div class="box country-name">${country.name}</div>
          <div>
            <div class="box left-info">${country.population.toLocaleString()}</div>
            <div class="box right-info">${country.region}</div>
          </div>
          <div class="box border-countries">${country.capital}</div>
        </div>
      </div>
      <div id="flag-container"></div>
      <div id="fixed-flag-container"></div>
    `;
    container.innerHTML = html;
  };


  