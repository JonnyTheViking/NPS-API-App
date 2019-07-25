const apiKey = "qEDPFZQuPS8tV2OCuQVzh4NBogw9H3UAjiWmKubh";
const searchURL = "https://api.nps.gov/api/v1/parks";

//Activate the Form Event Listner
$(document).ready(function() {
  watchSubmitForm();
});

//Watch the Submit Form Listeners
function watchSubmitForm() {
  console.log("watchSumbitForm works!");
  $("#search-form").submit(e => {
    e.preventDefault();
    let searchState = $("#state-name-input").val();
    let numResults = $("#number-input").val();
    getNationalParks(searchState, numResults);
  });
}

//Format Search Query via Params
function formatQueryParams(params) {
  console.log("formatQueryParams function works!");
  const queryItems = Object.keys(params).map(
    key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
  );
  return queryItems.join("&");
}

//GET Request to National Parks Service API
function getNationalParks(query, limit = 10) {
  console.log("getNationalPark works!");

  const params = {
    stateCode: query,
    limit,
    api_key: apiKey
  };

  const queryString = formatQueryParams(params);
  const url = searchURL + "?" + queryString;

  //Test in console whether we get the right search query
  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      console.log(err);
      alert("Something went wrong, please try again!");
    });
}

//Render GET Request Results to the Dom
function displayResults(responseJson) {
  console.log("displayResult function works");
  $("#results-list").empty();
  for (let i = 0; i < responseJson.data.length; i++) {
    $("#results-list").append(`<p>${responseJson.data[i].fullName}</p>
    <p>${responseJson.data[i].description}</p>
    <a href=" ${responseJson.data[i].url}">Park's Website</a>`);}
  $("#results-list").removeClass("hidden");
}