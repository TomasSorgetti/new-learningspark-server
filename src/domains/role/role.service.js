const db = require("../../database/connection");

const getAllRoles = async () => {
  const roles = await db.role.findAll();
  return roles;
};

const createRole = async (name) => {
  const foundRole = await db.role.findOne({ where: { name } });
  if (foundRole) {
    throw new Error("Role already exists");
  } else {
    return await db.role.create(name);
  }
};

const deleteRole = async (id) => {
  const role = await db.role.findByPk(id);
  if (!role) {
    throw new Error("Role not found");
  }
  return await role.destroy();
};

module.exports = { getAllRoles, createRole, deleteRole };
