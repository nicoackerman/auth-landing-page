import express from "express";

const app = express();
const PORT = process.env.PORT ?? 3100;
app.disable("x-powered-by");

app.use((req, res) => {
  res.status(404).send("<h1>404 Not Found</h1>");
});
app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});
