import express from "express";
import routes from "./routes/index";
import swaggerRoutes from "./routes/swagger";

const app = express();
const port = 3000;

// default landing page
app.get("/", (req, res) => {
  res.send("Hello, I am Ibrohim Isroilov. Nice to meet you!");
});

// api routes
app.use("/", routes);

// for documentation
app.use("/docs", swaggerRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
