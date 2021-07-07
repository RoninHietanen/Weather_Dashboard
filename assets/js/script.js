var searchFormEl = document.querySelector("#search-form");
var weatherEl = document.querySelector("#weather");
var forecastEl = document.querySelector("#forecast");

function getParams() {
    var searchParamsArr = document.location.search.split('&');
  
    
    var query = searchParamsArr[0].split('=').pop();
  
    searchApi(query);
}

function searchApi(query) {
    var locQueryUrl = 'https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=73902aca89c3307354cc96a4eb1bebc2';
  
    if (query) {
      locQueryUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&appid=73902aca89c3307354cc96a4eb1bebc2';
    }
  
    locQueryUrl = locQueryUrl + '&q=' + query;
  
    fetch(locQueryUrl)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }
  
            return response.json();
        })
        .then(function (locRes) {
            
            console.log(locRes);
  
            if (!locRes.results.length) {
                console.log('No results found!');
                weatherEl.innerHTML = '<h3>No results found, search again!</h3>';
            } else {
                weatherEl.textContent = '';
                for (var i = 0; i < locRes.results.length; i++) {
                    printResults(locRes.results[i]);
                }
            }
        })
        .catch(function (error) {
        console.error(error);
    });
}

function handleSearchFormSubmit(event) {
    event.preventDefault();
  
    var searchInputVal = document.querySelector('#search-input').value;
  
    if (!searchInputVal) {
      console.error('You need a search input value!');
      return;
    }
  
    searchApi(searchInputVal);
}
  
searchFormEl.addEventListener('submit', handleSearchFormSubmit);
  
getParams();
  