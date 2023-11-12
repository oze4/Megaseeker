// Assuming you have this code to get the form and attach the submit event listener
const form = document.querySelector("#search-form");
const EL_SEARCH_RESULTS = document.querySelector("#search-results");
const EL_SEARCH_INPUT = document.querySelector("#searchQuery");
EL_SEARCH_INPUT.addEventListener('keyup', debounce(handleSearchKeyUp, 1000));

function handleSearchResultsItemClick(event, id) {
  window.location = `/results.html?id=${id}`;
}

async function handleSearchKeyUp(event) {
  try {
    const inputVal = event.target.value;

    // Clear results and do nothing if given empty query.
    if (isEmptyOrSpaces(inputVal)) {
      EL_SEARCH_RESULTS.innerHTML = '';
      return;
    }

    const res = await axios.get(`https://api.tvmaze.com/search/shows/?q=${inputVal}`);

    if (res.status === 200) {
      EL_SEARCH_RESULTS.innerHTML = '';
      renderSearchResults(res.data);
    } else {
      throw new Error(`status=${res.status} : statusCode=${res.statusText}`)
    }
  } catch (e) {
    EL_SEARCH_RESULTS.innerHTML = '';
    console.error(`Something went wrong searching! ${e.message}`);
  }
}

function renderSearchResults(searchResults) {
  searchResults.forEach((item) => {
    // For some reason the API returns summary for some shows wrapped in <p> tags, while some are just flat strings.
    // This ensures we have the summary wrapped in <p> tags before rendering.
    const summary = String(item.show.summary).startsWith("<") ? item.show.summary : `<p>${item.show.summary}</p>`;

    EL_SEARCH_RESULTS.innerHTML += `
      <li onclick="handleSearchResultsItemClick(event, ${item.show.id})" class="search-results-item list-group-item">
        <b>${item.show.name}</b>
        <br />
        ${summary}
      </li>
    `;
  });
}

function debounce(fn, delay) {
  let timer;
  return function (args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn(args), delay);
  }
}

// Checks if a string is empty or spaces
function isEmptyOrSpaces(str) {
  return str === null || str.match(/^ *$/) !== null;
}