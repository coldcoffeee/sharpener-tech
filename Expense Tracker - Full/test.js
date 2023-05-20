const User = require("./models/user");
const FPR = require("./models/passwordrequest");
const db = require("./utils/database");

User.hasMany(FPR, {foreignKey: "userId"});
FPR.belongsTo(User, {foreignKey: "userId"});

(async ()=>{
	await db.sync();
	const user = await User.findByPk(1);
	const fpr = await user.createPasswordresetrequest({
		id: "someanotherrandomuuidv4bs"
	}, {
		raw: true
	});

	console.log(fpr);
})();
