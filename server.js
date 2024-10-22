const express = require("express");
const cors = require("cors");
let bodyParser = require("body-parser");
const { nanoid } = require("nanoid");
const { items, favoriteItems } = require("./data");

const app = express();
app.use(cors());
app.use(express.json());

const checkMatch = (items, title) => {
  let result = items.filter((element) => {
    return element.title.toLowerCase().includes(title.toLowerCase());
  });

  if (result.length != 0) {
    return result;
  }
  //   else return items;
  console.log(checkMatch);
};

app.get("/items", (req, res) => {
  const { sortBy, title = "" } = req.query;
  //   console.log(req.query);
  //   console.log(sortBy, title);

  if (sortBy === "price") {
    items.sort((a, b) => a.price - b.price);
    res.send(checkMatch(items, title));
  } else if (sortBy === "-price") {
    items.sort((a, b) => b.price - a.price);
    res.send(checkMatch(items, title));
  } else if (sortBy === "name") {
    items.sort((a, b) => {
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

    res.send(checkMatch(items, title));
  } else {
    //   console.log("Hi");
    items.sort((a, b) => a.id - b.id);

    res.send(checkMatch(items, title));
  }
});

app.get("/favorites", (req, res) => {
  res.send(favoriteItems);
});

app.post("/favorites", (req, res) => {
  // console.log(req.body);

  const { parentId } = req.body;
  const favoriteItem = {
    id: nanoid(),
    parentId: parentId,
  };
  favoriteItems.push(favoriteItem);
  res.send(favoriteItem);
});

app.delete("/favorites/:id", (req, res) => {
  const favoriteIdSent = req.params.id;
  // console.log(favoriteIdSent);
  favoriteItems.forEach((item) => {
    if (item.id === favoriteIdSent) {
      const findIndex = favoriteItems.indexOf(item);
      // console.log(findIndex);
      favoriteItems.splice(findIndex, 1);
      return;
    }
  });

  res.send("Item Deleted");
});

app.listen(8000, () => console.log(`Server is running on port 8000`));
