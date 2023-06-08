let countriesData = [];

// Fetch countries data from the API
async function fetchCountriesData() {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Render countries data on the page
async function renderCountriesData() {
  countriesData = await fetchCountriesData();
  const container = document.getElementById("flag-container");

  countriesData.forEach((country) => {
    const countryDiv = document.createElement("div");
    countryDiv.classList.add("flag-card");

    // Add click event listener to navigate to country details
    countryDiv.addEventListener("click", function (event) {
      navigateCountry(country.name.common, country.name.official);
    });

    countryDiv.innerHTML = `
      <img src="${country.flags.png}" alt="${country.name.common} flag">
      <div class="flag-info">
        <h2>${country.name.common}</h2>
        <p><b>Population:</b> ${country.population.toLocaleString()}</p>
        <p><b>Region:</b> ${country.region}</p>
        <p><b>Capital:</b> ${country.capital || "No capital"}</p>
      </div>
    `;

    container.appendChild(countryDiv);
  });
}

renderCountriesData();

let searchBar = document.querySelector("header input[name='search']");
let filterWord = document.getElementById("filter-word");

searchBar.addEventListener("input", filterCountries);
filterDropdown.addEventListener("click", toggleDropdown);

// Filter countries based on search and region filter
function filterCountries() {
  const filter = filterWord.textContent.toLowerCase();
  const search = searchBar.value.toLowerCase();

  const filteredCountries = countriesData.filter((country) => {
    const nameMatches = country.name.common.toLowerCase().includes(search);
    const regionMatches =
      filter === "all" ||
      filter === "filter by region" ||
      country.region.toLowerCase() === filter;

    return nameMatches && regionMatches;
  });

  renderFilteredCountries(filteredCountries);
}

// Render filtered countries
function renderFilteredCountries(filteredCountries) {
  let container = document.getElementById("flag-container");
  container.innerHTML = "";

  for (let country of filteredCountries) {
    let countryDiv = document.createElement("div");
    countryDiv.classList.add("flag-card");

    // Add click event listener to navigate to country details
    countryDiv.addEventListener("click", function (event) {
      navigateCountry(country.name.common, country.name.official);
    });

    countryDiv.insertAdjacentHTML(
      "afterbegin",
      ` <img src="${country.flags.png}" alt="${country.name.common} flag">
      <div class="flag-info">
        <h2>${country.name.common}</h2>
        <p><b>Population:</b> ${country.population.toLocaleString()}</p>
        <p><b>Region:</b> ${country.region}</p>
        <p><b>Capital:</b> ${country.capital || "No capital"}</p> 
      </div>
        </div>`
    );
    container.appendChild(countryDiv);
  }
}

// Navigate to country details page
function navigateCountry(countryName, officialName) {
  const url = `../detailpage/detail-page.html?country=${countryName}&officialName=${officialName}`;
  window.location.href = url;
}

// Function to toggle the visibility of the dropdown menu
function toggleDropdown() {
  const filterContainer = document.querySelector(".filter");
  filterContainer.classList.toggle("show-dropdown");
}

// Function to handle the selection of a filter value
function selectFilter(value) {
  // Update the displayed filter word
  filterWord.textContent = value;

  // Toggle the dropdown menu visibility
  toggleDropdown();

  // Call the filterCountries() function to apply the selected filter
  filterCountries();
}
