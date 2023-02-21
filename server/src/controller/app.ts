import Express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import regEndPoint from "../routes/auth.js";

const app = Express();
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

export default app;

regEndPoint();

const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Server is up and running at http://localhost:${PORT}.`);
});
