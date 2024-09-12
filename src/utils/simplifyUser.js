const simplifyUser = (user) => {
  const userSimplified = { ...user.dataValues };
  delete userSimplified.password;
  delete userSimplified.verificationCode;
  return userSimplified;
};
module.exports = simplifyUser;
