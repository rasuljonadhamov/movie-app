const API_KEY = "api_key=1cf50e6248dc270629e802686245c2c8";
const apiurl =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const BASE_URL = "https://api.themoviedb.org/3";

// Get selected Movie id for detail.html
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");

const detailApiUrl = `${BASE_URL}/movie/${movieId}?${API_KEY}`;

const main = document.getElementById("main1");
const liked = document.getElementById("liked");
const section = document.getElementById("section");
const main_grid = document.getElementById("favourites");

const loadSpiner = function (parentEl) {
  const markup = `
    <div class="loader"></div>
  `;

  parentEl.innerHTML = "";
  parentEl.innerHTML = markup;
};

loadSpiner(main);

// Fetch movie details using movieId
async function getMovieDetails(url) {
  loadSpiner(section);
  const resp = await fetch(url);
  const respData = await resp.json();
  console.log(respData);

  const img = document.createElement("img");
  img.classList.add("movie");

  img.setAttribute("src", `${IMGPATH + respData.poster_path}`);
  main.appendChild(img);

  section.innerHTML = `
    <div class="right">
        <h1 class='main-title'>${respData.title}</h1>
        <h3>${respData.tagline}</h3>
        <div class="single-info-container">
          <div class="single-info">
            <span class='main-info'>Language:</span>
            <span>${respData.original_language}</span>
          </div>

          <div class="single-info">
            <span class='main-info'>Length:</span>
            <span class='main-info'>${respData.runtime} min</span>
          </div>

          <div class="single-info">
            <span class='main-info'>Rate:</span>
            <span>${respData.vote_average}</span>
          </div>

          <div class="single-info">
            <span class='main-info'>Genres:</span>
            <span>${respData.genres
              .map((el) => {
                return el.name;
              })
              .join(", ")}</span>
          </div>

          <div class="single-info">
            <span class='main-info'>Release Date:</span>
            <span>${respData.release_date}</span>
          </div>
          
        </div>

        <div class="overview">
          <h2>Overview: </h2>
          <p>
            ${respData.overview}
          </p>
        </div>

        <div class="single-info favv">
          <span>Add To favorites</span>
          <span class="heart-icon">&#9829;</span>
        </div>

      </div>
  `;

  const heart_icon = section.querySelector(".heart-icon");
  heart_icon.addEventListener("click", () => {
    if (heart_icon.classList.contains("change-color")) {
      remove_LS(respData.id);
      heart_icon.classList.remove("change-color");
      console.log(localStorage.getItem("movie-id"));
    } else {
      add_LS(respData);
      heart_icon.classList.add("change-color");
      console.log(localStorage.getItem("movie-id"));
      showLocalMovie();
    }
  });
}

getMovieDetails(detailApiUrl);

function get_LS() {
  const movie_ids = JSON.parse(localStorage.getItem("movie-id"));
  return movie_ids === null ? [] : movie_ids;
}

function add_LS(id) {
  const movie_ids = get_LS();
  localStorage.setItem("movie-id", JSON.stringify([...movie_ids, id]));
}

function remove_LS(id) {
  const movie_ids = get_LS();
  localStorage.setItem(
    "movie-id",
    JSON.stringify(movie_ids.filter((e) => e != id))
  );
}

// Function to remove a movie from favorites
function removeMovieFromFavorites(id) {
  const movie_ids = get_LS();
  const updatedMovies = movie_ids.filter((movie) => movie.id !== id);
  localStorage.setItem("movie-id", JSON.stringify(updatedMovies));
}

const showLocalMovie = function () {
  const likedMovies = localStorage.getItem("movie-id")
    ? JSON.parse(localStorage.getItem("movie-id"))
    : [];

  const favouritesContainer = document.getElementById("favourites");
  favouritesContainer.innerHTML = ""; // Clear previous content

  if (likedMovies.length) {
    likedMovies.forEach((movie) => {
      const {
        id,
        title,
        backdrop_path,
        vote_average,
        poster_path,
        release_date,
      } = movie;

      const div = document.createElement("div");
      div.setAttribute("data-id", `${id}`);

      div.innerHTML = `
        <img src="${
          poster_path ? IMGPATH + poster_path : IMGPATH + backdrop_path
        }" alt="${title}" />
        <div class="movie-local">
          <h3>${title}</h3>
        </div>
        <div class="movie-local">
          <span>Rate :</span>
          <span>${vote_average}</span>
        </div>
        <div class="movie-local">
          <span>Release Date :</span>
          <span>${release_date}</span>
        </div>
        <button class="dislike-button" data-id="${id}">Dislike</button>
      `;

      div.classList.add("movie");
      favouritesContainer.appendChild(div);

      const dislikeButton = div.querySelector(".dislike-button");
      dislikeButton.addEventListener("click", () => {
        removeMovieFromFavorites(id);
        div.remove();
        const heart_icon = section.querySelector(".heart-icon");

        heart_icon.classList.remove("change-color");
      });
    });
  }
};

showLocalMovie();
