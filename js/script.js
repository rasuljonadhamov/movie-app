const API_KEY = "api_key=1cf50e6248dc270629e802686245c2c8";
const apiurl =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const BASE_URL = "https://api.themoviedb.org/3";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const janras = document.getElementById("janras");

const allJanras = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];

let selectedJanr = [];

// By janra
filter();
function filter() {
  janras.innerHTML = "";

  allJanras.forEach((janra) => {
    const janraEl = document.createElement("div");
    janraEl.textContent = janra.name;
    janraEl.id = janra.id;
    janraEl.classList.add("janra");
    janraEl.addEventListener("click", function () {
      main.innerHTML = "";
      if (selectedJanr.length == 0) {
        selectedJanr.push(janra.id);
      } else {
        if (selectedJanr.includes(janra.id)) {
          selectedJanr.forEach((id, index) => {
            if (id == janra.id) {
              selectedJanr.splice(index, 1);
            }
          });
        } else {
          selectedJanr.push(janra.id);
        }
      }
      console.log(selectedJanr);
      getMovies(apiurl + "&with_genres=" + encodeURI(selectedJanr.join(",")));
      selectedHighlight();
    });

    janras.appendChild(janraEl);
  });
}

// initially get fav movies
getMovies(apiurl);

// Get movies from Api
async function getMovies(url) {
  const resp = await fetch(url);
  const respData = await resp.json();

  console.log(respData);

  showMovies(respData.results);

  return respData;
}

// Show movies
function showMovies(movies) {
  movies.forEach((movie) => {
    const { title, backdrop_path, vote_average, poster_path } = movie;

    const div = document.createElement("a");
    div.setAttribute("href", "../pages/detail.html");

    div.innerHTML = `
        <img src="${
          poster_path ? IMGPATH + poster_path : IMGPATH + backdrop_path
        }" alt="${title}" />

        <div class="movie-info">
          <h3>${title}</h3>
          <span>${vote_average}</span>
        </div>
    `;

    div.classList.add("movie");

    main.appendChild(div);
  });
}

// Search functionality
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm) {
    main.innerHTML = "";
    selectedJanr = [];
    selectedHighlight();
    getMovies(SEARCHAPI + "&query=" + searchTerm);
    search.value = "";
  }
});

// highlight

function selectedHighlight() {
  const els = document.querySelectorAll(".janra");

  els.forEach((tag) => {
    tag.classList.remove("highlight");
  });

  if (selectedJanr.length != 0) {
    selectedJanr.forEach((id) => {
      const highlightedTag = document.getElementById(id);
      highlightedTag.classList.add("highlight");
    });
  }
}
