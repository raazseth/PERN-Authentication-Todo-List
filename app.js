const Express = require("express");
const Cors = require("cors");
const app = Express();
require("dotenv").config();
const PORT = 5000;

app.use(Cors());
app.use(Express.json());

const AuthRoutes = require("./Routes/Auth");
const TodoRoutes = require("./Routes/Todo");

app.use("/api", AuthRoutes);
app.use("/api", TodoRoutes);

app.listen(PORT, () => console.log(`Server is listening at ${PORT} 🤡`));
