const sequelize = require("../config/connection");
const { User, Note, CodeSnippet, Module } = require("../models");

const userData = require("./userData.json");
const noteData = require("./noteData.json");
const codesnippetData = require("./codesnippetData.json");
const moduleData = require("./moduleData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const note of noteData) {
    await Note.create({
      ...note,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const codesnippet of codesnippetData) {
    await CodeSnippet.create({
      ...codesnippet,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const module of moduleData) {
    await Module.create({
      ...module,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
