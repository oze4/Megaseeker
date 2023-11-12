// view_results.js
/**
 * THIS FILE SHOULD REALLY BE CALLED VIEW SEASONS
 */

document.addEventListener("DOMContentLoaded", async () => {
  const resultsContainer = document.getElementById('results-container');
  const urlParams = new URLSearchParams(window.location.search);
  const showId = urlParams.get('id');

  try {
    if (!showId) {
      throw new Error("Show ID not found, unable to gather data.");
    }
    
    // Fetch data from the API endpoint
    const response = await fetch(`https://api.tvmaze.com/shows/${showId}/seasons`);
    const seasonsData = await response.json();

    // Process and display results on the page
    seasonsData.forEach(season => {
      const seasonDiv = document.createElement('div');
      
      // Create elements for each property you want to display
      const seasonNumber = document.createElement('p');
      seasonNumber.innerText = `Season Number: ${season.number}`;
      

      const seasonName = document.createElement('p');
      seasonName.innerText = `Season Name: ${season.name}`;
        

      const seasonEpisodes = document.createElement('p');
      seasonEpisodes.innerText = `Episodes: ${season.episodeOrder}`;
      

      const premiereDate = document.createElement('p');
      premiereDate.innerText = `Premiere Date: ${season.premiereDate}`;
      

      const endDate = document.createElement('p');
      endDate.innerText = `End Date: ${season.endDate}`;
      
      
      // Add elements to the seasonDiv
      seasonDiv.appendChild(seasonNumber);
      seasonDiv.appendChild(seasonName);
      seasonDiv.appendChild(seasonEpisodes);
      seasonDiv.appendChild(premiereDate);
      seasonDiv.appendChild(endDate);
      // Append the seasonDiv to the container
      resultsContainer.appendChild(seasonDiv);
    });
  } catch (error) {
    console.error('Error fetching seasons data:', error);
  }
});
