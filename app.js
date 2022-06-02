const express = require("express");

const connect = require("./config/connection");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const adressRoute = require("./Routes/adress.routes");
const employeurRoute = require("./Routes/employeur.routes");
const tokenpwdRoute = require("./Routes/token_pwd_reset.routes");
const candidatRoute = require("./Routes/candidat.routes");
const formationRoute = require("./Routes/formation.routes");
const job_offerRoute = require("./Routes/job_offer.routes");
const postulationRoute = require("./Routes/postulation.routes");
const domaineRoute = require("./Routes/domaine.routes");
const experienceRoute = require("./Routes/experience.routes");
const target_domaine_candidatRoute = require("./Routes/target_domaine_candidat.routes");
dotenv.config({ path: "./config/config.env" });
/* db connect */
const db = connect().authDb();

/* express sever */
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(cookieParser());
app.use("/candidat", candidatRoute);
app.use("/adress", adressRoute);
app.use("/employeur", employeurRoute);
app.use("/tokenpwd", tokenpwdRoute);
app.use("/formation", formationRoute);
app.use("/job_offer", job_offerRoute);
app.use("/postulation", postulationRoute);
app.use("/domaine", domaineRoute);
app.use("/experience", experienceRoute);
app.use("/target_domaine_candidat", target_domaine_candidatRoute);

const port = 3002;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
