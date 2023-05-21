let countriesData = [];

async function fetchCountriesData() {
  try {
    const response = await fetch(
      "https://restcountries.com/v3.1/all"
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function renderCountriesData() {
  countriesData = await fetchCountriesData();
  const container = document.getElementById("flag-container");
  countriesData.forEach((country) => {
    const countryDiv = document.createElement("div");
    countryDiv.classList.add("flag-card");
    countryDiv.addEventListener("click", function (event) {
      navigateCountry(country.name.common, country.capital[0]);
    });
    countryDiv.innerHTML = `
      <div class="flag-image">
        <img src="${country.flags.png}" alt="${country.name.common} flag">
      </div>
      <div class="flag-info">
        <h2><b>${country.name.common}</b></h2>
        <p><b>Population:</b> ${country.population}</p>
        <p><b>Region:</b> ${country.region}</p>
        <p><b>Capital:</b> ${country.capital[0]}</p>
      </div>
    `;
    container.appendChild(countryDiv);
  });
}

renderCountriesData();

let searchBar = document.getElementById("search-input");
let filterFeature = document.getElementById("filter-feature");

searchBar.addEventListener("input", filterCountries);
filterFeature.addEventListener("change", filterCountries);

function filterCountries() {
  const filter = filterFeature.value.toLowerCase();
  const search = searchBar.value.toLowerCase();

  const filteredCountries = countriesData.filter((country) => {
    const nameMatches = country.name.common.toLowerCase().includes(search);
    const regionMatches =
      filter === "all" || filter === "filter by region" ||
      country.region.toLowerCase() === filter;

    return nameMatches && regionMatches;
  });

  renderFilteredCountries(filteredCountries);
}


function renderFilteredCountries(filteredCountries) {
  let container = document.getElementById("flag-container");
  container.innerHTML = "";

  for (let country of filteredCountries) {
    let countryDiv = document.createElement("div");
    countryDiv.classList.add("flag-card");

    countryDiv.addEventListener("click", function () {
      localStorage.setItem("countryData", JSON.stringify(country));
      window.location.href = "detail-view.html";
    });

    countryDiv.insertAdjacentHTML(
      "afterbegin",
      `<div class="flag-image">
          <img src="${country.flags.svg}" alt="${country.name.common} flag">
        </div>
        <div class="flag-info">
          <h2 class="country-title">${country.name.common}</h2>
          <div class="flag-info-details">
          <p><strong>Population:</strong> ${country.population}</p>
          <p><strong>Region:</strong> ${country.region}</p>
          <p><strong>Capital:</strong> ${country.capital[0]}</p>
          </div>
        </div>`
    );
    container.appendChild(countryDiv);
  }
}

function navigateCountry(countryName, capital) {
  const url = `detail-view.html?country=${countryName}&capital=${capital}`;
  window.location.href = url;
}

function toggleTheme() {
  const html = document.querySelector("html");
  if (html.getAttribute("data-theme") === "light") {
    html.setAttribute("data-theme", "dark");
  } else {
    html.setAttribute("data-theme", "light");
  }
}
