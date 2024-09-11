const { Sequelize } = require("sequelize");
const { dbConfig } = require("../config/index.config");

const sequelize = new Sequelize(
  dbConfig.dbName,
  dbConfig.dbUser,
  dbConfig.dbPass,
  {
    host: dbConfig.dbHost,
    port: dbConfig.dbPort,
    dialect: dbConfig.dbDialect,
    logging: false
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./models/user.model")(sequelize, Sequelize);
db.role = require("./models/role.model")(sequelize, Sequelize);
db.post = require("./models/post.model")(sequelize, Sequelize);
db.subject = require("./models/subject.model")(sequelize, Sequelize);

//* Relations
// user - role
db.user.belongsToMany(db.role, {
  through: "role_user",
  foreignKey: "userId",
  otherKey: "roleId",
  attributes: [],
});
db.role.belongsToMany(db.user, {
  through: "role_user",
  foreignKey: "roleId",
  otherKey: "userId",
  attributes: [],
});

// post - subject
db.post.belongsTo(db.subject, {
  foreignKey: {
    name: "subjectId",
    allowNull: false,
    onDelete: "CASCADE",
  },
  as: "subject",
});
db.subject.hasMany(db.post, {
  foreignKey: "subjectId",
  as: "post",
});

module.exports = db;