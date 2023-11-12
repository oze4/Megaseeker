/**
 * 
 * 
 * 
 * 
 * 
 * SCROLL DOWN TO THE BOTTOM TO SEE CHANGES I MADE
 * 
 * 
 * 
 * 
 * 
 */
const EL_RESULTS_CONTAINER = document.getElementById('results-container');
EL_RESULTS_CONTAINER.innerHTML = "Loading...";

document.addEventListener("DOMContentLoaded", async () => {
  // Retrieve the query parameter from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const showId = urlParams.get('id');

  const res = await axios.get(`https://api.tvmaze.com/shows/${showId}?embed[]=seasons&embed[]=episodes&embed[]=cast`);

  // Process and display results on the results page
  renderShow(res.data);

});

const renderShow = (show) => {
  EL_RESULTS_CONTAINER.innerHTML = '';
  console.log(show)
  if (show.image) {
    // Create elements for image and show information
    const img = document.createElement("IMG");
    img.src = show.image.medium;

    const showInfoDiv = document.createElement("div");
    const showTitle = document.createElement("section");
    showTitle.innerHTML = `Title: ${show.name}`;
    showInfoDiv.appendChild(showTitle);

    const showSummary = document.createElement("p");
    showSummary.innerHTML = `Summary: ${show.summary}`;
    showInfoDiv.appendChild(showSummary);

    const showGenre = document.createElement("p"); // Change from "data" to "p"
    showGenre.innerHTML = `Genre: ${show.genres.join(', ')}`;
    showInfoDiv.appendChild(showGenre);

    const showStatus = document.createElement("p");
    showStatus.innerHTML = `Status = ${show.status}`;
    showInfoDiv.appendChild(showStatus);

    const showRuntime = document.createElement("p");
    showRuntime.innerHTML = `Runtime: ${show.runtime} minutes`;
    showInfoDiv.append(showRuntime);

    const showRating = document.createElement("p");
    showRating.innerHTML = `Rating: ${show.rating ? show.rating.average : 'N/A'}`;
    showInfoDiv.appendChild(showRating);

    const showSchedule = document.createElement("p");
    const scheduleString = show.schedule ? `${show.schedule.days.join(', ')} at ${show.schedule.time}` : 'Not Available';
    showSchedule.innerHTML = `Schedule: ${scheduleString}`;
    showInfoDiv.appendChild(showSchedule);

    const showType = document.createElement("p");
    showType.innerHTML = `Type: ${show.type}`;
    showInfoDiv.appendChild(showType);

    const showNetwork = document.createElement("p");

    if (show.network) {
      const networkName = show.network.name;
      const networkCountry = show.network.country ? show.network.country.name : 'N/A';
      const networkString = `${networkName} in ${networkCountry}`;
      showNetwork.innerHTML = `Network: ${networkString}`;
    } else {
      showNetwork.innerHTML = 'Network: N/A';
    }

    showInfoDiv.appendChild(showNetwork);

    const castEl = document.createElement("pre");
    castEl.innerHTML = 'Cast: ';
    castEl.innerHTML += JSON.stringify(show._embedded.cast, null, 2);
    castEl.style.maxHeight = '50vh';
    castEl.style.overflow = 'scroll';
    showInfoDiv.appendChild(castEl);

    const seasonsEl = document.createElement("pre");
    seasonsEl.innerHTML = 'Seasons: ';
    seasonsEl.innerHTML += JSON.stringify(show._embedded.seasons, null, 2);
    seasonsEl.style.maxHeight = '50vh';
    seasonsEl.style.overflow = 'scroll';
    showInfoDiv.appendChild(seasonsEl);

    // Append elements to the results container
    EL_RESULTS_CONTAINER.appendChild(img);
    EL_RESULTS_CONTAINER.appendChild(showInfoDiv);
  } else {
    const nothingFound = document.createElement("p");
    nothingFound.innerHTML = "Show image not found."
    EL_RESULTS_CONTAINER.append(nothingFound);
  }
  /*
  for (let link of imageSrcList) {
    if (show.image) {
      // Create elements for image and show information
      const img = document.createElement("IMG");
      img.src = show.image.medium;

      const showInfoDiv = document.createElement("div");
      const showTitle = document.createElement("section");
      showTitle.innerHTML = `Title: ${show.name}`;
      showInfoDiv.appendChild(showTitle);

      const showSummary = document.createElement("p");
      showSummary.innerHTML = `Summary: ${show.summary}`;
      showInfoDiv.appendChild(showSummary);

      const showGenre = document.createElement("p"); // Change from "data" to "p"
      showGenre.innerHTML = `Genre: ${show.genres.join(', ')}`;
      showInfoDiv.appendChild(showGenre);

      const showStatus = document.createElement("p");
      showStatus.innerHTML = `Status = ${show.status}`;
      showInfoDiv.appendChild(showStatus);

      const showRuntime = document.createElement("p");
      showRuntime.innerHTML = `Runtime: ${show.runtime} minutes`;
      showInfoDiv.append(showRuntime);

      const showRating = document.createElement("p");
      showRating.innerHTML = `Rating: ${show.rating ? show.rating.average : 'N/A'}`;
      showInfoDiv.appendChild(showRating);

      const showSchedule = document.createElement("p");
      const scheduleString = show.schedule ? `${show.schedule.days.join(', ')} at ${show.schedule.time}` : 'Not Available';
      showSchedule.innerHTML = `Schedule: ${scheduleString}`;
      showInfoDiv.appendChild(showSchedule);

      const showType = document.createElement("p");
      showType.innerHTML = `Type: ${show.type}`;
      showInfoDiv.appendChild(showType);

      const showNetwork = document.createElement("p");

      if (show.network) {
        const networkName = show.network.name;
        const networkCountry = show.network.country ? show.network.country.name : 'N/A';
        const networkString = `${networkName} in ${networkCountry}`;
        showNetwork.innerHTML = `Network: ${networkString}`;
      } else {
        showNetwork.innerHTML = 'Network: N/A';
      }
      
      showInfoDiv.appendChild(showNetwork);
      
            // Append elements to the results container
      EL_RESULTS_CONTAINER.appendChild(img);
      EL_RESULTS_CONTAINER.appendChild(showInfoDiv);

      ////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////
      // Add ability to view seasons
      ////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////
      const viewSeasonsButton = document.createElement("button");
      viewSeasonsButton.innerHTML = "View Seasons";
      viewSeasonsButton.onclick = async function(event) {
        if (!show.id) {
          return alert('No seasons found!');
        }

        try {
          const res = await axios.get(`http://api.tvmaze.com/shows/${show.id}/seasons`);

          if (res.status !== 200) { // If response is not OK
            throw new Error(`Response not OK : ${res.status}:${res.statusText}`);
          } 

          const seasons = res.data;
          // This is just a rough way to show the seasons.
          // You can make this prettier if you wish.
          const seasonsDataElement = document.createElement("pre");
          seasonsDataElement.innerText = JSON.stringify(seasons, null, 2);
          showInfoDiv.appendChild(seasonsDataElement);
        } catch (e) {
          alert(`Something went wrong while trying to get seasons! Error : ${e.message}`);
        }
      }
      showInfoDiv.appendChild(viewSeasonsButton);
      ////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////

    }
  }
  */
};