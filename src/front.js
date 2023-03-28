const { setupFrontServer } = require("./front_server");

const frontServer = setupFrontServer();
const PORT = process.env.PORT || 3001;
frontServer.listen(PORT, () => {
  console.log("Server listening on Port", PORT);
});
