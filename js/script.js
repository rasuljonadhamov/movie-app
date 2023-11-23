// fetch("https://www.omdbapi.com/?apiKey=f88ba9a5&t=merlin")
//   .then((data) => data.json())
//   .then((api) => console.log(api))
//   .catch((err) => console.log(err));

// const options = {
//   method: "GET",
//   url: "https://moviesdatabase.p.rapidapi.com/titles/series/%7BseriesId%7D",
//   headers: {
//     "X-RapidAPI-Key": "b1350477bamsh9fd0f126c02870ep11df03jsn1fd0c3303aaf",
//     "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
//   },
// };

// try {
//   const response = await axios.request(options);
//   console.log(response.data);
// } catch (error) {
//   console.error(error);
// }

const url =
  "https://moviesdatabase.p.rapidapi.com/titles/search/keyword/merlin";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "b1350477bamsh9fd0f126c02870ep11df03jsn1fd0c3303aaf",
    "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
  },
};

try {
  const response = await fetch(url, options);
  const result = await response.json();
  console.log(result);
} catch (error) {
  console.error(error);
}

// %7Bkeyword%7D
