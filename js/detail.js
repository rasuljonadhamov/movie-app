const API_KEY = "api_key=1cf50e6248dc270629e802686245c2c8";
const apiurl =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const BASE_URL = "https://api.themoviedb.org/3";

// JavaScript for detail.html
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");

const detailApiUrl = `${BASE_URL}/movie/${movieId}?${API_KEY}`;

const main = document.getElementById("main1");
const section = document.getElementById("section");

// Fetch movie details using movieId
async function getMovieDetails(url) {
  const resp = await fetch(url);
  const respData = await resp.json();
  console.log(respData);

  const img = document.createElement("img");
  img.classList.add("movie");

  img.setAttribute("src", `${IMGPATH + respData.poster_path}`);
  main.appendChild(img);

  section.innerHTML = `
    <div class="right">
        <h1>${respData.title}</h1>
        <h3>${respData.tagline}</h3>
        <div class="single-info-container">
          <div class="single-info">
            <span>Language:</span>
            <span>${respData.original_language}</span>
          </div>

          <div class="single-info">
            <span>Length:</span>
            <span>${respData.runtime} min</span>
          </div>

          <div class="single-info">
            <span>Rate:</span>
            <span>${respData.vote_average}</span>
          </div>

          <div class="single-info">
            <span>Release Date:</span>
            <span>${respData.release_date}</span>
          </div>
        </div>

        <div class="overview">
          <h2>Overview: </h2>
          <p>
            ${respData.overview}
          </p>
        </div>
      </div>
  `;

  // Display movie details on the detail page
  // Example: Update DOM elements with movie details
}

getMovieDetails(detailApiUrl);
