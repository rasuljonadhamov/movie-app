// const url =
//   "https://moviesdatabase.p.rapidapi.com/titles/search/keyword/merlin";
// const options = {
//   method: "GET",
//   headers: {
//     "X-RapidAPI-Key": "b1350477bamsh9fd0f126c02870ep11df03jsn1fd0c3303aaf",
//     "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
//   },
// };

// try {
//   const response = await fetch(url, options);
//   const result = await response.json();
//   console.log(result);
// } catch (error) {
//   console.error(error);
// }

// %7Bkeyword%7D
const API_KEY = "api_key=1cf50e6248dc270629e802686245c2c8";
const apiurl =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const BASE_URL = "https://api.themoviedb.org/3";
const searchURL = BASE_URL + "/search/movie?" + API_KEY;

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

// initially get fav movies
getMovies(apiurl);

async function getMovies(url) {
  const resp = await fetch(url);
  const respData = await resp.json();

  console.log(respData);

  showMovies(respData.results);

  return respData;
}

function showMovies(movies) {
  movies.forEach((movie) => {
    const { title, backdrop_path, vote_average, poster_path } = movie;

    const div = document.createElement("a");
    div.setAttribute("href", "../pages/detail.html");

    div.innerHTML = `
        <img src="${IMGPATH + poster_path}" alt="${title}" />

        <div class="movie-info">
          <h3>${title}</h3>
          <span>${vote_average}</span>
        </div>
    `;

    div.classList.add("movie");

    main.appendChild(div);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm) {
    main.innerHTML = "";
    getMovies(searchURL + "&query=" + searchTerm);
    search.value = "";
  }
});
