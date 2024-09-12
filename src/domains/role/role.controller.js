const {
  sendSuccessResponse,
  sendErrorResponse,
} = require("../../utils/responseHandler");
const service = require("./role.service");

const getAllRoles = async (req, res, next) => {
  try {
    const data = await service.getAllRoles();
    sendSuccessResponse(res, 200, "Get Roles Success", data);
  } catch (error) {
    sendErrorResponse(res, error.message, error.status);
  }
};
const createRole = async (req, res, next) => {
  const { name } = req.body;

  try {
    const data = await service.createRole(name);
    sendSuccessResponse(res, 200, "Create Role Success", data);
  } catch (error) {
    sendErrorResponse(res, error.message, error.status);
  }
};

const deleteRole = async (req, res, next) => {
  const { id } = req.params;

  try {
    const data = await service.deleteRole(id);
    sendSuccessResponse(res, 200, "Role Deleted", data);
  } catch (error) {
    sendErrorResponse(res, error.message, error.status);
  }
};

module.exports = { getAllRoles, createRole, deleteRole };
