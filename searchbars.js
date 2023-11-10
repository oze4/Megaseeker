// Assuming you have this code to get the form and attach the submit event listener
const form = document.querySelector("#search-form");

// Attach the submit event listener
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  // fetch the response from the API.
  userQuery = form.elements.searchQuery.value;

  // Redirect to the results page with query parameter
  window.location.href = `results.html?q=${encodeURIComponent(userQuery)}`;
});

// If you want to keep the onclick attribute on the button
function search() {
  // fetch the response from the API.
  userQuery = form.elements.searchQuery.value;

  // Redirect to the results page with query parameter
  window.location.href = `results.html?q=${encodeURIComponent(userQuery)}`;
}
