// Function to toggle between light and dark mode
function toggleTheme() {
  const html = document.querySelector("html");
  const themeIcon = document.getElementById("theme-icon");
  const themeText = document.getElementById("theme-text");

  if (html.getAttribute("data-theme") === "light") {
    html.setAttribute("data-theme", "dark");
    themeIcon.classList.remove("fa-regular");
    themeIcon.classList.add("fas");
    themeText.textContent = "Light Mode";
    localStorage.setItem("theme", "dark"); // Store the selected theme in localStorage
  } else {
    html.setAttribute("data-theme", "light");
    themeIcon.classList.remove("fas");
    themeIcon.classList.add("fa-regular");
    themeText.textContent = "Dark Mode";
    localStorage.setItem("theme", "light"); // Store the selected theme in localStorage
  }
}

// Function to apply the stored theme on page load
function applyStoredTheme() {
  const storedTheme = localStorage.getItem("theme");

  if (storedTheme === "dark") {
    toggleTheme(); // Toggle to dark mode if the stored theme is dark
  }
}

// Call the function to apply the stored theme
applyStoredTheme();
