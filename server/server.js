const dotEnv = require("dotenv");
dotEnv.config();
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
<<<<<<< HEAD
const logger = require("morgan");
const db = require("./services/db.js");
const compression = require("compression");
require("dotenv").config();


app.use(logger("dev"));
app.use(compression());
=======
const routes = require("./routes/routes");
>>>>>>> 5c9e0e0ed85f321db5b6f078e2f35175bfad7511

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

db.init();

// Define API routes here
app.use(routes);

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//Console logs active web link
app.listen(PORT, () => {
<<<<<<< HEAD
    console.log(`🌎 ==> API server now on port ${PORT}!`);
    // require("./controllers/image.js");
=======
    console.log(`🌎 ==> API server now on port http://localhost:${PORT}!`);
>>>>>>> 5c9e0e0ed85f321db5b6f078e2f35175bfad7511
});