const server = require("./src/app.js");
const { serverConfig } = require("./src/config/index.config");
const db = require("./src/database/connection.js");
const { createRoles, createSubjects } = require("./src/database/init.js");

const startServer = async () => {
  try {
    await db.sequelize.sync({ force: false });
    console.log("Database synchronized.");
    await createRoles();
    await createSubjects()
    server.listen(serverConfig.port, () => {
      console.log("- - - - - - - - - - - - - - -");
      console.log(`Server listening on port ${serverConfig.port}`);
      console.log("- - - - - - - - - - - - - - -");
    });
  } catch (error) {
    console.error("Error during server startup:", error);
    process.exit(1);
  }
};

startServer();
