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
    const { title, url, techs } = request.body;

    const repository = {
      id: uuid(),
      likes: 0,
      techs,
      title,
      url,
    };

    repositories.push(repository);
    return response.status(201).send(repository);
  } catch (error) {
    return response.status(500).send("Request Error");
  }
});

app.put("/repositories/:id", (request, response) => {
  try {
    const { url, title, techs } = request.body;
    const { id } = request.params;

    const repository = {
      id,
      title,
      url,
      techs,
    };

    const repositoryIndex = repositories.findIndex(
      (repository) => repository.id === id
    );

    if (repositoryIndex < 0) {
      return response.status(400).send({ error: "Repository not found" });
    }

    const likes = repositories[repositoryIndex].likes;

    repositories[repositoryIndex] = {
      ...repository,
      likes,
    };

    return response.status(200).send(repositories[repositoryIndex]);
  } catch (error) {
    return response.status(500).send("Request Error : " + error.message);
  }
});

app.delete("/repositories/:id", (request, response) => {
  try {
    const { id } = request.params;

    const repositoryIndex = repositories.findIndex(
      (repository) => repository.id === id
    );

    if (repositoryIndex < 0)
      return response.status(400).send({ error: "Repository not found" });

    repositories.splice(repositoryIndex, 1);

    return response.status(204).send();
  } catch (error) {
    return response.status(500).send("Request Error : " + error.message);
  }
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex < 0)
    return response.status(400).send({ error: "Repository not found" });

  repositories[repositoryIndex].likes += 1;

  return response.status(200).send(repositories[repositoryIndex]);
});

module.exports = app;
