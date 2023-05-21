function navigateToDetail(border) {
  console.log(border);
  const url = `detail-view.html?capital=${border}`;
  window.location.href = url;
}

const urlParams = new URLSearchParams(window.location.search);

const capital = urlParams.get("capital");
let loading = false;
let borderName;
window.onload = async function () {
  if (!capital) {
    console.log("Country not found in URL");
    return;
  }

  try {
    loading = true;
    const response = await fetch(
      `https://restcountries.com/v3/capital/${capital}`
    );
    const countryData = await response.json();
    Promise.all(
      countryData?.[0]?.borders.map((country) => {
        return fetch(
          `https://restcountries.com/v3/alpha/${country}?fields=name,capital`
        ).then((response) => {
          return response.json();
        });
      })
    )
      .then((borderData) => {
        borderName = borderData;
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
        console.log(borderName);
      })
      .then(() => {
        loading = false;
        if (loading) {
          console.log(loading, "loading..");
          let container = document.getElementById("detail-container");
          container.textContent = "";
          container.insertAdjacentHTML(
            "afterbegin",
            `
      <div class="loading-sign"></div>
      `
          );
        } else {
          console.log(loading, "End Loading..");
          let container = document.getElementById("detail-container");
          container.textContent = "";
          container.insertAdjacentHTML(
            "afterbegin",
            `
           <div id="grid-container" class="test">
  <div id="left-column">
    <img src="${countryData[0].flags[1]}" alt="${
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
          <li><strong>Population: </strong><span>${
            countryData[0].population
          }</span></li>
          <li><strong>Region: </strong><span>${countryData[0].region}</span></li>
          <li><strong>Sub Region: </strong><span>${
            countryData[0].subregion
          }</span></li>
          <li><strong>Capital: </strong><span>${
            countryData[0].capital
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
          } (${Object.values(countryData[0].currencies)[0].symbol})</span></li>
          <li><strong>Languages: </strong><span>${Object.values(
            countryData[0].languages
          )
            .map((lang) => lang)
            .join(", ")}</span></li>
        </ul>
      </div>
    </div>
    <div id="row3">
      <strong>Border Countries:</strong>
      ${borderName
        .map(
          (border) =>
            `<button class="border-button" onclick="navigateToDetail('${border.capital}')">${border.name.common}</button>`
        )
        .join("")}
    </div>
  </div>
</div>

          
    `
          );
        }
      });
  } catch (error) {
    console.log(error);
  }
};

function toggleTheme() {
  const html = document.querySelector("html");
  if (html.getAttribute("data-theme") === "light") {
    html.setAttribute("data-theme", "dark");
  } else {
    html.setAttribute("data-theme", "light");
  }
}

function goBack() {
  window.location.href = "index.html";
}

