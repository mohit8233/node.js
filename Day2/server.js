// const bodyParser = require("body-parser");

// const express = require("express");

// const app = express();
// const fs = require("fs")
// app.set("view engine", "ejs");
// app.use(bodyParser.urlencoded({extended:true}));

// function readData(){
//       const data = fs.readFileSync("./data.json")
//       return JSON.parse(data)
// }

// console.log(readData());













const express = require("express");
const path = require("path");
const app = express();

const data = [
  { id: 1, name: "Mohit", role: "Frontend Dev" },
  { id: 2, name: "Rahul", role: "Backend Dev" }
];


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});


app.get("/api/users", (req, res) => {
  res.json(data);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});