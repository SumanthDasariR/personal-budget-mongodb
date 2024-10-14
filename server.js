const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
app.use("/", express.static("public"));
app.use(express.json());

const mongoose = require("mongoose");
const budgetModel = require("./models/budget_schema");

let url = "mongodb://localhost:27017/budgetdatabase";
app.use(cors());
app.get("/hello", (req, res) => {
  res.send("Hello World!");
});

app.get("/budget", (req, res) => {
  mongoose
    .connect(url)
    .then(() => {
      console.log("Connected to database");
      // Fetch
      budgetModel
        .find({})
        .then((data) => {
          res.send(data);
          mongoose.connection.close();
        })
        .catch((connectionError) => {
          console.log(connectionError);
        });
    })
    .catch((connectionError) => {
      console.log(connectionError);
    });
});

app.post("/addBudgetData", (req, res) => {
  mongoose
    .connect(url)
    .then(() => {
      // Insert
      let newData = new budgetModel(req.body);
      budgetModel
        .insertMany(newData)
        .then((data) => {
          res.send("Data Entered Successfully");
          mongoose.connection.close();
        })
        .catch((connectionError) => {
          res.send(connectionError.message);
        });
    })
    .catch((connectionError) => {
      res.send(connectionError);
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
