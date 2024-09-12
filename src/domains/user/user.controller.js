const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../../utils/responseHandler");
const service = require("./user.service");

/**
 * interactua con el servicio para obtener un usuario y envia la respuesta
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getUser = async (req, res) => {
  try {
    const user = await service.getUser();
    if (!user) {
      return sendErrorResponse(res, "Usuario no encontrado", 404);
    }
    sendSuccessResponse(res, 200, "User Found", { user });
  } catch (error) {
    sendErrorResponse(res, error.message, error.status);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const data = await service.getAllUsers();
    sendSuccessResponse(res, 200, "Users Found", data);
  } catch (error) {
    sendErrorResponse(res, error.message, error.status);
  }
};

const changeRole = async (req, res) => {
  const { id, roles } = req.body;
  try {
    const data = await service.changeRole({ id, roles });
    sendSuccessResponse(res, 200, "Role Changed", data);
  } catch (error) {
    sendErrorResponse(res, error.message, error.status);
  }
};

module.exports = {
  getUser,
  getAllUsers,
  changeRole,
};
