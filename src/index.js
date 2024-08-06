function handleSearch(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let searchInputElement = document.querySelector("#search-input");

  cityElement.innerHTML = searchInputElement.value;
}

let formElement = document.querySelector("#search-form");
formElement.addEventListener("submit", handleSearch);
