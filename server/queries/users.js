const db = require('../database/db')


const getAllUsers = async () => {
	const users = await db.any("SELECT * FROM users")
	return users;
}

const addNewUser = async (userObj) => {
	const newUserQuery = `
		INSERT INTO users(username, email, password, avatar_url)
			VALUES($/username/, $/email/ , $/password/ , $/avatar_url/ )
			RETURNING *
	`
	const newUser = await db.one(newUserQuery, userObj)
	return newUser;
}

const getUserByEmail = async (email) => {
    const getQuery = `
	SELECT username,
	email,
	password,
	avatar_url
	FROM users
    WHERE email = $/email/;
    `;
    return await db.oneOrNone(getQuery, { email });
};


module.exports = {
	getAllUsers,
	addNewUser,
	getUserByEmail
}

