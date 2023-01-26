const app = require("./app");

// PORT
const PORT = process.env.PORT || 8080;

// not found route handler
app.all("*", (req, res) => {
  res.status(404).send({
    success: false,
    message: "No route found",
  });
});

// global error handler
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "Error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`.cyan.bold);
});

process.on("unhandledRejection", (error) => {
  console.log(error.name, error.message);
  app.close(() => {
    process.exit(1);
  });
});
