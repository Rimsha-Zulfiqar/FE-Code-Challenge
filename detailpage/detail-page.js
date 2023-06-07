// Function to navigate to detail view for a specific border country
function navigateToDetail(officialName) {
  const url = `detail-page.html?officialName=${officialName}`;
  window.location.href = url;
}

// Function to display the loading sign
function showLoader() {
  let container = document.getElementById("detail-container");
  container.innerHTML = '<div id="loading-sign"></div>';
}

// Function to remove the loading sign
function hideLoader() {
  let container = document.getElementById("detail-container");
  container.innerHTML = "";
}

// Extract URL parameters
const urlParams = new URLSearchParams(window.location.search);

const officialName = urlParams.get("officialName");
let borderName;

window.onload = async function () {
  if (!officialName) {
    console.log("Country not found in URL");
    return;
  }

  try {
    showLoader(); // Show the loader before fetching data

    // Fetch country data
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${officialName}?fullText=true`
    );
    const countryData = await response.json();

    // Fetch border countries' data
    if (!countryData[0].borders) {
      countryData[0].borders = [];
    }

    await Promise.all(
      countryData?.[0]?.borders?.map((country) => {
        return fetch(
          `https://restcountries.com/v3/alpha/${country}?fields=name,official`
        ).then((response) => {
          return response.json();
        });
      })
    )
      .then((borderData) => {
        borderName = borderData;

        // Sort border countries alphabetically by name
        borderName.sort((a, b) => {
          const nameA = a.name.common.toLowerCase();
          const nameB = b.name.common.toLowerCase();

          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });

        hideLoader();

        let container = document.getElementById("detail-container");
        container.textContent = "";
        container.insertAdjacentHTML(
          "afterbegin",
          `
            <div id="grid-container" class="test">
              <div id="left-column">
                <img src="${countryData[0].flags.png}" alt="${
            countryData[0].name.common
          } flag" />
              </div>
              <div id="right-column">
                <div id="row1">
                  <div id="country-name">${countryData[0].name.common}</div>
                </div>
                <div id="row2">
                  <div id="row2-col1">
                    <ul class="left">
                      <li><strong>Native Name: </strong><span>${
                        Object.values(countryData[0].name.nativeName)[0].common
                      }</span></li>
                      <li><strong>Population: </strong><span>${countryData[0].population.toLocaleString()}</span></li>
                      <li><strong>Region: </strong><span>${
                        countryData[0].region
                      }</span></li>
                      <li><strong>Sub Region: </strong><span>${
                        countryData[0].subregion
                      }</span></li>
                      <li><strong>Capital: </strong><span>${
                        countryData[0].capital || "No capital"
                      }</span></li>
                    </ul>
                  </div>
                  <div id="row2-col2">
                    <ul class="right">
                      <li><strong>Top Level Domain: </strong><span>${
                        countryData[0].tld
                      }</span></li>
                      <li><strong>Currencies: </strong><span>${
                        Object.values(countryData[0].currencies)[0].name
                      }</span></li>
                      <li>
                        <strong>Languages: </strong>
                        <span class="language-list">
                          ${Object.values(countryData[0].languages)
                            .sort()
                            .map(language => `<div class="languages" style="display: inline-block;">${language}</div>`)
                            .join(", ")}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div id="row3">
                  <strong>Border Countries:</strong>
                  ${
                    borderName.length != 0
                      ? borderName
                          .map(
                            (border) =>
                              `<button class="border-button" onclick="navigateToDetail('${border.name.official}')">${border.name.common}</button>`
                          )
                          .join("")
                      : "----"
                  }
                </div>
              </div>
            </div>
            `
        );
      })
      .catch((error) => {
        console.log(error);
        hideLoader();
      });
  } catch (error) {
    console.log(error);
    hideLoader();
  }
};

// Function to navigate back to the index page
function goBack() {
  window.location.href = "../homepage/homepage.html";
}
