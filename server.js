import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import pg from "pg";
import { Console } from "console";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "formregis",
  password: "Shreya@130012",
  port: 5432,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/register", (req, res) => {
  res.sendFile(__dirname + "/public/register.html");
 });


app.post("/register", (req, res) => {
  const { name,gender, email, password} = req.body;
  db.query("INSERT INTO info( name,gender, email, password)VALUES($1,$2,$3,$4)",
  [ name,gender, email, password]);
  // console.log(name,gender, email, password);
  res.redirect("/register");
});

// app.get("/submit", async (req, res) => {
//     const result = await db.query("SELECT * FROM info");
//     const rows = result.rows;
//     res.render("submit", { data: rows }); 
  
// });



app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


