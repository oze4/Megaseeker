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

document.addEventListener("DOMContentLoaded", async () => {
  // Retrieve the query parameter from the URL
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const userQuery = urlParams.get('q');

  // Fetch data based on the query parameter
  const config = {
    params: {
      q: userQuery
    },
    headers: {}
  };
  const res = await axios.get(`http://api.tvmaze.com/search/shows/`, config);

  // Process and display results on the results page
  printImages(res.data);

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

      const showLang = document.createElement("p");
      showLang.innerHTML = `Language: ${link.show.language}`;
      showInfoDiv.appendChild(showLang);

      const showPremiered = document.createElement("p");
      showPremiered.innerHTML = `Premiered: ${link.show.premiered}`;
      showInfoDiv.appendChild(showPremiered);

      const showEnded = document.createElement("p");
      showEnded.innerHTML = `Ended: ${link.show.ended}`;
      showInfoDiv.appendChild(showEnded);

      const showStatus = document.createElement("p");
      showStatus.innerHTML = `Status = ${link.show.status}`;
      showInfoDiv.appendChild(showStatus);

      const showRuntime = document.createElement("p");
      showRuntime.innerHTML = `Runtime: ${link.show.runtime} minutes`;
      showInfoDiv.append(showRuntime);

      const showRating = document.createElement("p");
      showRating.innerHTML = `Rating: ${link.show.rating ? link.show.rating.average : 'N/A'}/10`;
      showInfoDiv.appendChild(showRating);

      const showSchedule = document.createElement("p");
      const scheduleString = link.show.schedule ? `${link.show.schedule.days.join(', ')} at ${link.show.schedule.time}` : 'Not Available';
      showSchedule.innerHTML = `Schedule: ${scheduleString}`;
      showInfoDiv.appendChild(showSchedule);

      const webChannelInfo = document.createElement("p");
      webChannelInfo.innerHTML = `Web Channel: ${link.show.webChannel ? link.show.webChannel.name : 'N/A'}`;
      showInfoDiv.appendChild(webChannelInfo);

      // Assuming 'link.show.updated' contains the Unix timestamp
      const updatedTimestamp = link.show.updated;

      // Convert Unix timestamp to a Date object
      const updatedDate = new Date(updatedTimestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds

      // Create a paragraph element for displaying the updated date
      const updatedInfo = document.createElement("p");
      updatedInfo.innerHTML = `Last Updated: ${updatedDate.toLocaleString()}`;

      // Append the element to the show information container
      showInfoDiv.appendChild(updatedInfo);

      const officialSiteInfo = document.createElement("p");
      const officialSiteLink = document.createElement("a");

      officialSiteLink.href = link.show.officialSite || '#'; // Set the href attribute
      officialSiteLink.target = "_blank"; // Open the link in a new tab/window

      officialSiteLink.textContent = 'Official Site'; // Displayed text for the link
      officialSiteInfo.appendChild(officialSiteLink);
      showInfoDiv.appendChild(officialSiteInfo);

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

      const viewSeasonsButton = document.createElement("button");
      viewSeasonsButton.className = "btn btn-primary"; // Add Bootstrap button classes
      viewSeasonsButton.innerText = "View Seasons";
      viewSeasonsButton.onclick = function (event) {
        if (!link.show.id) {
          return alert('No seasons found!');
        }
        // Redirect to a new page with the seasons data as a query parameter
        window.location.href = `view-seasons.html?id=${encodeURIComponent(link.show.id)}`;
      };

      showInfoDiv.appendChild(viewSeasonsButton);

      const viewEpisodesButton = document.createElement("button");
      viewEpisodesButton.className = "btn btn-warning"; // Add Bootstrap button classes
      viewEpisodesButton.innerText = "View Episodes";
      viewEpisodesButton.onclick = function (event) {
        if (!link.show.id) {
          return alert('No episodes found!');
        }
        window.location.href = `view-episodes.html?id=${encodeURIComponent(link.show.id)}`;
      };

      // Append the button to the showInfoDiv
      showInfoDiv.appendChild(viewEpisodesButton);

    }
  }
};