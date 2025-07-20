const express = require("express");
const sequelize = require("./database");
const User = require("./models/user");
const userRoutes = require("./rotas/users");
const app = express();
const cors = require("cors");
const port = 3000;
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use("/api/users", userRoutes);

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection established successfully.");
    sequelize.sync();
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

module.exports = app; // Export the app for testing purposes
