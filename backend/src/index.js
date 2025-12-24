import express from "express";
import cors from "cors";
import employeeRoutes from "./routes/employeeRoutes.js";
import availabilityRoutes from "./routes/availabilityRoutes.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/api", employeeRoutes);
app.use("/api/availability", availabilityRoutes);

app.listen(port, () => {
  console.log("Server is running on port 3000");
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});
