const db = require("../../database/connection");
const { HttpError } = require("../../utils/customErrors");
const simplifyUser = require("../../utils/simplifyUser");
/**
 * retorna un objeto con la informacion del usuario
 * @returns
 */
const getUser = async () => {
  return {
    id: 1,
    name: "John",
    lastname: "Doe",
    email: "XrN5S@example.com",
    userVerified: true,
  };
};
const getAllUsers = async () => {
  const users = await db.user.findAll({ include: ["roles"] });
  const usersSimplifiedList = users.map((user) => {
    return simplifyUser(user);
  });
  return usersSimplifiedList;
};

/**
 * Recives the user id and a list of roles names, and updates the user roles
 * @param {*} param0
 * @returns
 */
const changeRole = async ({ id, roles }) => {
  const user = await db.user.findOne({ where: { id }, include: ["roles"] });
  if (!user) throw new HttpError(404, "User not found");

  const newUserRoles = await Promise.all(
    roles.map(async (role) => {
      const foundRole = await db.role.findOne({
        where: { name: role },
      });
      if (!foundRole) throw new HttpError(404, "Role not found");
      return foundRole;
    })
  );
  await user.setRoles(newUserRoles);
  // when use the setRoles method, the user is not reloaded
  await user.reload({ include: ["roles"] });
  return simplifyUser(user);
};

module.exports = {
  getUser,
  getAllUsers,
  changeRole,
};
