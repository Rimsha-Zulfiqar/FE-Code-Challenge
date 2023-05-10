


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

async function renderCountriesData(){
  countriesData = await fetchCountriesData();
  let html = '';
  let container = document.getElementById("flag-container");

  for(country in countriesData){
    let countryDiv = document.createElement('div');
    countryDiv.classList.add('countriesData');

    countryDiv.insertAdjacentHTML('afterbegin',
        `<div class="flag-card">
            <div class="flag-image">
            <img src="${countriesData[country].flags.png}" width="270" height="200"></img>
            </div>
            
            <div class="flag-info">
            <h2><b>${countriesData[country].name.common}</b></h2>
            <p><b>Population:</b> ${countriesData[country].population}</p>
            <p><b>Capital: </b>${countriesData[country].capital}</p> 
            <div>
        </div>
        `
    )
        container.appendChild(countryDiv);
    
  }
  
}

renderCountriesData();

