const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();
// { id: "uuid", title: 'Desafio Node.js', url: 'http://github.com/...', techs: ["Node.js", "..."], likes: 0 };
app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  try {
    return response.json(repositories);
  } catch (error) {
    console.log(error.message);
  }
});

app.post("/repositories", (request, response) => {
  try {
    const { title, url, techs, likes } = request.body;

    const repository = {
      id: uuid(),
      title,
      url,
      techs,
      likes,
    };

    repositories.push(repository);
    return response.status(201).send(repository);
  } catch (error) {
    return response.status(500).send("Request Error");
  }
});

app.put("/repositories/:id", (request, response) => {
  try {
    const { title, url, techs, likes } = request.body;
    const { id } = request.params;

    const repository = {
      id,
      title,
      url,
      techs,
      likes,
    };

    const repositoryIndex = repositories.findIndex(
      (repository) => repository.id === id
    );

    if (repositoryIndex < 0) {
      return response.status(400).send({ error: "Repository is not found" });
    }

    repositories[repositoryIndex] = repository;

    return response.status(201).send(repository);
  } catch (error) {
    return response.status(500).send("Request Error : " + error.message);
  }
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
