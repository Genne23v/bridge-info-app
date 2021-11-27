const loki = require('lokijs');
const bcrypt = require('bcrypt');

let users;
const db = new loki("data.db", {
    autoload: true,
    autoloadCallback: () => {
        users =
            db.getCollection("users") ||
            db.addCollection("users", {
                unique: ["username"],
            });
    },
    autosave: true,
    autosaveInterval: 5 * 1000,
});

module.exports = {
    register: async(username, fullname, password) => {
        if (users.findOne({ username })) {
            throw new Error("username already registered");
        }

        const saltRounds = process.env.SALT_ROUNDS || 10;
        const hash = await bcrypt.hash(password, saltRounds);
        users.insert({ username, fullname, hash });
    },
    check: (username, password) => {
        const user = users.findOne({ username });
        if (!user) {
            return Promise.reject(new Error(`unknown user: ${username}`));
        }

        return bcrypt.compare(password, user.hash);
    },
    byUsername: (username) => users.findOne({ username }),
};