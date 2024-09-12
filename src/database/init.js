const db = require("./connection");

const createRoles = async () => {

  const roles = [
    { name: "user" },
    { name: "moderator" },
    { name: "admin" },
  ]

  roles.forEach(async (role) => {
    const foundRole = await db.subject.findOne({ where: { name: role.name } });
    if (!foundRole) {
      console.log(`Creating ${role.name} role...`);
      await db.role.create(role);
    }else{
      console.log(`Role ${role.name} already exists`);
    }
  })
};
const createSubjects = async () => {
  
  const subjects = [
    { name: "Math AA" },
    { name: "French" },
    { name: "History" },
  ]

  subjects.forEach(async (subject) => {
    const foundSubject = await db.subject.findOne({ where: { name: subject.name } });
    if (!foundSubject) {
      console.log(`Creating ${subject.name} subject...`);
      await db.subject.create(subject);
    }else{
      console.log(`Subject ${subject.name} already exists`);
    }    
  })
};


module.exports = { createRoles, createSubjects };
