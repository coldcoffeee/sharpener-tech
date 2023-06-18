const db = require("./utils/db");
const User = require("./models/userModel");
const Chat = require("./models/chatModel");
const Group = require("./models/groupModel");

User.belongsToMany(Group, { through: "UserGroup" });
Group.belongsToMany(User, { through: "UserGroup" });

Group.belongsToMany(User, { as: "admin", through: "GroupAdmin" });

const createDummyUser = async (name, email, password) => {
  try {
    const user = await User.create({ name, email, password });
    console.log(`Dummy user created: ${user.name} (${user.email})`);
  } catch (error) {
    console.error("Error creating dummy user:", error);
  }
};

// Create four dummy users
const createDummyUsers = async () => {
  await createDummyUser("User 1", "user1@example.com", "password1");
  await createDummyUser("User 2", "user2@example.com", "password2");
  await createDummyUser("User 3", "user3@example.com", "password3");
  await createDummyUser("User 4", "user4@example.com", "password4");
};

(async () => {
  await db.sync();
  await createDummyUsers();
  const groupName = "Techquilla";
  const participants = [1, 3];
  const adminId = 2;
  if (!adminId || !groupName) throw new Error("Invalid request!");

  const group = await Group.create({ name: groupName });

  await group.addAdmin(adminId);
  await group.addUser(adminId);

  for (const userId of participants) {
    await group.addUser(userId);
  }
})();
