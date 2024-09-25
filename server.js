const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");

const data = require("./data");

const app = express();
app.use(cors());

app.get("/items", (req, res) => {
  const { sortBy } = req.query;
  //   console.log(req.query);
  //   console.log(sortBy);
  if (sortBy === "price") {
    data.sort((a, b) => a.price - b.price);
    res.send(data);
  } else if (sortBy === "-price") {
    data.sort((a, b) => b.price - a.price);
    res.send(data);
  } else if (sortBy === "name") {
    data.sort((a, b) => {
      //   a.title - b.title;
      const nameA = a.title.toUpperCase();
      const nameB = b.title.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    res.send(data);
  } else {
    //   console.log("Hi");
    data.sort((a, b) => a.id - b.id);
    res.send(data);
  }
});

app.listen(8000, () => console.log(`Server is running on port 8000`));
