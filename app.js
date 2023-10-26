const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

require("dotenv").config();
const port = process.env.PORT || 3000;

function generateError(err) {
  let template = fs.readFileSync(path.join(__dirname, "templates", "banner_error.svg"), "utf8");
  return template.replace("{{ERROR}}", err);
}

function divideDescription(description) {
  let midpoint = Math.ceil(description.length / 2);

  let firstSpace = description.lastIndexOf(' ', midpoint);
  let secondSpace = description.indexOf(' ', midpoint);

  let firstLine, secondLine;
  if (firstSpace !== -1 && (secondSpace === -1 || midpoint - firstSpace < secondSpace - midpoint)) {
    firstLine = description.substring(0, firstSpace);
    secondLine = description.substring(firstSpace + 1);
  } else {
    firstLine = description.substring(0, secondSpace);
    secondLine = description.substring(secondSpace + 1);
  }

  return [firstLine, secondLine];
}

app.get("/", (req, res) => {
  let project = req.query.name;
  let description = req.query.description;

  res.header("Content-Type", "image/svg+xml");
  if (!project) return res.send(generateError("Aucun nom de projet est spécifié."));
  if (project.length > 20) return res.send(generateError("Le nom du projet est trop long."));

  if (description) {
    if (description.length > 50) {
      if (description.length > 100) return res.send(generateError("La description est trop longue."));
      let [firstLine, secondLine] = divideDescription(description);
      let template = fs.readFileSync(path.join(__dirname, "templates", "banner_with_description2.svg"), "utf8");
      template = template.replace("{{NAME}}", project);
      template = template.replace("{{DESCRIPTION2}}", secondLine);
      return res.send(template.replace("{{DESCRIPTION}}", firstLine));
    } else {
      let template = fs.readFileSync(path.join(__dirname, "templates", "banner_with_description.svg"), "utf8");
      template = template.replace("{{NAME}}", project);
      return res.send(template.replace("{{DESCRIPTION}}", description));
    }
  } else {
    let template = fs.readFileSync(path.join(__dirname, "templates", "banner_without_description.svg"), "utf8");
    return res.send(template.replace("{{NAME}}", project));
  }
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
})