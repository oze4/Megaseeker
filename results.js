document.addEventListener("DOMContentLoaded", async () => {
  // Retrieve the query parameter from the URL
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const userQuery = urlParams.get('q');

  // Fetch data based on the query parameter
  const config = { params: { q: userQuery }, headers: {} };
  const res = await axios.get(`http://api.tvmaze.com/search/shows/`, config);

  // You could add a separate page to show seasons, this way all we need to do is add a link to each shows data.
  // I am adding a property called "seasonsLink".
  const finalData = res.data.map((obj) => {
    let seasonsLink = '';
    if (obj.show.id) {
      seasonsLink = `http://api.tvmaze.com/shows/${obj.show.id}/seasons`;
    }
    obj.show.seasonsLink = seasonsLink;
    return obj;
    /*
    return {
      ...obj,
      show: {
        ...obj.show,
        seasonsLink: obj.show.id ? `http://api.tvmaze.com/shows/${obj.show.id}/seasons` : '',
      }
    }
    */
  });

  // Process and display results on the results page
  printImages(finalData);

});

const printImages = (imageSrcList) => {
  const resultsContainer = document.getElementById('results-container');

  for (let link of imageSrcList) {
    if (link.show.image) {
      // Create elements for image and show information
      const img = document.createElement("IMG");
      img.src = link.show.image.medium;

      const showInfoDiv = document.createElement("div");
      const showTitle = document.createElement("section");
      showTitle.innerHTML = `Title: ${link.show.name}`;
      showInfoDiv.appendChild(showTitle);

      const showSummary = document.createElement("p");
      showSummary.innerHTML = `Summary: ${link.show.summary}`;
      showInfoDiv.appendChild(showSummary);

      const showGenre = document.createElement("p"); // Change from "data" to "p"
      showGenre.innerHTML = `Genre: ${link.show.genres.join(', ')}`;
      showInfoDiv.appendChild(showGenre);

      const showStatus = document.createElement("p");
      showStatus.innerHTML = `Status = ${link.show.status}`;
      showInfoDiv.appendChild(showStatus);

      const showRuntime = document.createElement("p");
      showRuntime.innerHTML = `Runtime: ${link.show.runtime} minutes`;
      showInfoDiv.append(showRuntime);

      const showRating = document.createElement("p");
      showRating.innerHTML = `Rating: ${link.show.rating ? link.show.rating.average : 'N/A'}`;
      showInfoDiv.appendChild(showRating);

      const showSchedule = document.createElement("p");
      const scheduleString = link.show.schedule ? `${link.show.schedule.days.join(', ')} at ${link.show.schedule.time}` : 'Not Available';
      showSchedule.innerHTML = `Schedule: ${scheduleString}`;
      showInfoDiv.appendChild(showSchedule);

      const showType = document.createElement("p");
      showType.innerHTML = `Type: ${link.show.type}`;
      showInfoDiv.appendChild(showType);

      const showNetwork = document.createElement("p");

      if (link.show.network) {
        const networkName = link.show.network.name;
        const networkCountry = link.show.network.country ? link.show.network.country.name : 'N/A';
        const networkString = `${networkName} in ${networkCountry}`;
        showNetwork.innerHTML = `Network: ${networkString}`;
      } else {
        showNetwork.innerHTML = 'Network: N/A';
      }
      
      showInfoDiv.appendChild(showNetwork);
      
            // Append elements to the results container
      resultsContainer.appendChild(img);
      resultsContainer.appendChild(showInfoDiv);

      // Add ability to view seasons
      const seasonsElement = document.createElement("button");
      seasonsElement.innerHTML = "View Seasons";
      seasonsElement.onclick = async function(event) {
        if (link.show.seasonsLink) {
          try {
            const res = await axios.get(link.show.seasonsLink);
            if (res.status === 200) {
              const seasons = res.data;
              const seasonsElement = document.createElement("pre");
              seasonsElement.innerText = JSON.stringify(seasons, null, 2);
              showInfoDiv.appendChild(seasonsElement);
            } else {
              throw new Error(`Response not OK : ${res.status}:${res.statusText}`);
            }
          } catch (e) {
            alert(`Something went wrong while trying to get seasons! Error : ${e}`);
          }
        } else {
          alert("No seasons found!");
        }
      }
      showInfoDiv.appendChild(seasonsElement);

    }
  }
};
