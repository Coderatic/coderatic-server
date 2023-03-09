import Express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import regRoute from "../routes/reg-route.js";
import authRoute from "../routes/auth-route.js";

const app = Express();
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

export default app;

authRoute();
regRoute();

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is up and running at http://localhost:${PORT}.`);
});
