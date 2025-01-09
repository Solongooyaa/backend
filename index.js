const express = require("express");
const app = express();
const fs = require("node:fs");
const cors = require("cors");
const port = 4000;

app.use(express.json());
app.use(cors());
const findById = (req, res) => {
  const movieId = req.params.id;
  const data = fs.readFileSync("data/movies.json");
  const movies = JSON.parse(data);
  const movie = movies.find((movie) => movie.id === Number(movieId));

  res.send(movie);
};
//create
// reminder do not touch
app.post("/create", (req, res) => {
  const body = req.body;
  const date = Date.now();
  const data = fs.readFileSync("data/movies.json");
  const movies = JSON.parse(data);
  const newData = {
    id: date,
    ...body,
  };
  movies.push(newData);
  const content = JSON.stringify(movies, null, 4);
  fs.writeFileSync("data/movies.json", content);
  res.send(content);
});

// ====
// read
// reminder do not touch
app.get("/movies", (req, res) => {
  const data = fs.readFileSync("data/movies.json");
  const movies = JSON.parse(data);
  res.json(movies);
});
// ===

// update

app.put("/movie/:id", (req, res) => {
  const id = req.params.id;
  const changedName = req.params.name;
  // const date = Date.now()
  const data = fs.readFileSync("data/movies.json");
  const movies = JSON.parse(data);
  const content = movies.map((movie) => {
    if (movie.id == id) {
      const edit = {
        ...movie,
        name: changedName,
      };
      return edit;
    } else {
      return movie;
    }
  });
  const contentJSON = JSON.stringify(content, null, 4);
  fs.writeFileSync("data/movies.json", contentJSON);
  res.send("done");
});

// app.delete("/movie/:id", (req, res) => {
//   const id = req.params.id;
//   // const changedName = req.query.name
//   // const date = Date.now()
//   const data = fs.readFileSync("data/movies.json");
//   const movies = JSON.parse(data);
//   const content = movies.filter((movie) => {
//     if (movie.id == id) {
//       return;
//     } else {
//       return movie;
//     }
//   });
//   const contentJSON = JSON.stringify(content, null, 4);
//   fs.writeFileSync("data/movies.json", contentJSON);
//   res.send("done");
// });
// app.get("/", (req, res) => {
//   res.send("hi");
// });
// FindById

app.get("/details/:id", (req, res) => {
  const movieId = req.params.id;
  const data = fs.readFileSync("data/movies.json");
  const movies = JSON.parse(data);
  const movie = movies.find((movie) => movie.id === Number(movieId));
  res.send(movie);
});
// app.get("/data/movies/:id", findById);

//DeleteId
app.delete("/movies/:id", (req, res) => {
  // const movies = findAllMovies();

  //Method 1
  const updatedMovies = movies.filter((e) => e.id !== Number(movieId));

  //Method 2
  //unshih read
  const data = fs.readFileSync("data/movies.json");
  const movies = JSON.parse(data);
  // find
  const movieId = req.params.id;
  const oneMovieIdx = movies.findIndex((movie) => movie.id === Number(movieId));
  //delete
  movies.splice(oneMovieIdx, 1);
  fs.writeFileSync(
    "data/movies.json",
    JSON.stringify(movies, null, 4),
    "utf-8"
  );
  res.send("movie deleted");
  // try {
  //   const oneMovieIdx = movies.findIndex((e) => e.id === Number(movieId));
  //   const restMovies = movies.splice(oneMovieIdx, 1);

  //   if (oneMovieIdx < 0) {
  //     res.json({
  //       message: "Movie not found",
  //     });
  //   }
  //   const moviesString = JSON.stringify(restMovies, null, 4);
  //   fs.writeFileSync(data / movies.json, moviesString);

  //   res.json({
  //     message: "Deleted",
  //   });
  // } catch (e) {
  //   res.json({
  //     message: e,
  //   });
  // }
});

// const movieString = JSON.stringify(updatedMovies, null, 4);
// fs.readFileSync("data/movies.json", movieString);
// const movie = JSON.parse(data)

// res.json({
//     message: 'Ustlaa',
// });

app.listen(port, () => {
  console.log(`movies, http://localhost:${port}`);
  console.log(`create, http://localhost:${port}/create?name=`);
  console.log(`update, http://localhost:${port}/update?name=&id=`);
  console.log(`delete, http://localhost:${port}/delete?id=`);

  //   console.log(`deleteById, http://localhost:${port}/deleteById:id=`);
});
