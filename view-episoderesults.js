document.addEventListener("DOMContentLoaded", async () => {
  const resultsContainer2 = document.getElementById('results-container2');

  try {
    // Fetch data from the API endpoint for episodes based on the show ID
    // Example: Fetch episodes page by page
    const response = await fetch('https://api.tvmaze.com/seasons/1/episodes');
    const episodesData = await response.json();

    // Process and display results on the page
    episodesData.forEach(episode => {
      const episodeDiv = document.createElement('div');
      
      // Create elements for each property you want to display
      const episodeNumber = document.createElement('p');
      episodeNumber.innerText = `Episode Number: ${episode.number}`;
      
      const episodeName = document.createElement('p');
      episodeName.innerText = `Episode Name: ${episode.name}`;
        
      const episodeSeason = document.createElement('p');
      episodeSeason.innerText = `Season: ${episode.season}`;
      
      const episodeAirdate = document.createElement('p');
      episodeAirdate.innerText = `Airdate: ${episode.airdate}`;
      
      const episodeRuntime = document.createElement('p');
      episodeRuntime.innerText = `Runtime: ${episode.runtime} minutes`;

      const episodeSummary = document.createElement('p');
      episodeSummary.innerText = `Summary: ${episode.summary}`;
      
      // Add elements to the episodeDiv
      episodeDiv.appendChild(episodeNumber);
      episodeDiv.appendChild(episodeName);
      episodeDiv.appendChild(episodeSeason);
      episodeDiv.appendChild(episodeAirdate);
      episodeDiv.appendChild(episodeRuntime);
      episodeDiv.appendChild(episodeSummary);
      // Append the episodeDiv to the container
      resultsContainer2.appendChild(episodeDiv);
    });
  } catch (error) {
    console.error('Error fetching episodes data:', error);
  }
});
