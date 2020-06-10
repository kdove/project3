const dotEnv = require("dotenv");
dotEnv.config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const PORT = process.env.PORT || 3001;

//INITIATE EXPRESS APP
const app = express();

// Define middleware here
// Configure body parsing for AJAX requests
app.use(express.urlencoded({ extended: true }));
//PARSE REQUEST BODY AS JSON
app.use(express.json());


// Load routes
const routes = require("./routes/routes");
//const authRouter = require('./routes/auth.route')
//const userRouter = require('./routes/user.route')


// Define API routes here
app.use(routes);
//app.use('/api', authRouter)
//app.use('/api', userRouter)

// app.use((req, res, next) => {
//   res.status(404).json({
//       success: false,
//       msg: "Page not founded"
//   })
// })

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  // Send every other request to the React app
// Define any API routes before this runs
  app.use((req, res) =>
    res.sendFile(path.join(__dirname, "../client/build/index.html"))
  );
}

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/circaauth");

//Console logs active web link
app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port http://localhost:${PORT}!`);
});
