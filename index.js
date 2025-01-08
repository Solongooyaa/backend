const express = require("express");
const app = express();
const fs = require("node:fs");
const port = 3001;
const findById = (req, res) => {
  const movieId = req.params.id;
  const data = fs.readFileSync("data/movies.json");
  const movies = JSON.parse(data);
  const movie = movies.find((movie) => movie.id === Number(movieId));

  res.send(movie);
};

// create
app.get("/create", (req, res) => {
  const name = req.query.name;
  const date = Date.now();
  const data = fs.readFileSync("data/movies.json");
  const movies = JSON.parse(data);
  const newData = {
    id: date,
    name,
  };
  movies.push(newData);
  const content = JSON.stringify(movies, null, 4);
  fs.writeFileSync("data/movies.json", content);
  res.send("done");
});
// read
app.get("/read", (req, res) => {
  const data = fs.readFileSync("data/movies.json");
  const movies = JSON.parse(data);
  res.send(movies);
});
// details
app.get("/details", (req, res) => {
  const movieId = req.query.id;
  const data = fs.readFileSync("data/movies.json");
  const movies = JSON.parse(data);

  res.send("done");
});

// update

app.get("/update", (req, res) => {
  const id = req.query.id;
  const changedName = req.query.name;
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

app.get("/delete", (req, res) => {
  const id = req.query.id;
  // const changedName = req.query.name
  // const date = Date.now()
  const data = fs.readFileSync("data/movies.json");
  const movies = JSON.parse(data);
  const content = movies.filter((movie) => {
    if (movie.id == id) {
      return;
    } else {
      return movie;
    }
  });
  const contentJSON = JSON.stringify(content, null, 4);
  fs.writeFileSync("data/movies.json", contentJSON);
  res.send("done");
});
app.get("/", (req, res) => {
  res.send("hi");
});
// FindById

app.get("/data/movies/:id", findById);

//DeleteId
app.delete("data/movies/:id", (req, res) => {
  const movieId = req.params.id;
  const movies = findAllMovies();

  //Method 1
  const updatedMovies = movies.filter((e) => e.id !== Number(movieId));

  //Method 2
  try {
    const oneMovieIdx = movies.findIndex((e) => e.id === Number(movieId));
    const restMovies = movies.splice(oneMovieIdx, 1);

    if (oneMovieIdx < 0) {
      res.json({
        message: "Movie not found",
      });
    }
    const moviesString = JSON.stringify(restMovies, null, 4);
    fs.writeFileSync(data / movies.json, moviesString);

    res.json({
      message: "Deleted",
    });
  } catch (e) {
    res.json({
      message: e,
    });
  }
});

// const movieString = JSON.stringify(updatedMovies, null, 4);
// fs.readFileSync("data/movies.json", movieString);
// const movie = JSON.parse(data)

// res.json({
//     message: 'Ustlaa',
// });

app.listen(port, () => {
  console.log(`read, http://localhost:${port}`);
  console.log(`create, http://localhost:${port}/create?name=`);
  console.log(`update, http://localhost:${port}/update?name=&id=`);
  console.log(`delete, http://localhost:${port}/delete?id=`);
  //   console.log(`findById, http://localhost:${port}/movies/findById:id=`);
  //   console.log(`deleteById, http://localhost:${port}/deleteById:id=`);
});
