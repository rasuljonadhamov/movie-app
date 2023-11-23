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

const apiurl =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.getElementById("main");

// initially get fav movies
getMovies(apiurl);

async function getMovies(url) {
  const resp = await fetch(url);
  const respData = await resp.json();

  console.log(respData);

  showMovies(respData.results);
}

function showMovies(movies) {
  movies.forEach((movie) => {
    const { title, backdrop_path, vote_average, poster_path } = movie;

    const div = document.createElement("div");

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
