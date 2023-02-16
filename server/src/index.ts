import Express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";

const app = Express();
app.use(morgan("combined"));
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send({
    message: "Welcome to Coderatic's backend",
  });
});

app.post("/register", (req, res) => {
  res.send({
    message: `Your user "${req.body.username}" was successfully registered`,
  });
});

const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Server is up and running at http://localhost:${PORT}.`);
});
