const express = require('express');
app = express();


const signToken = (username, id) => {
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "1w",
  });
  return token;
};

const createUsers = async (username, password) => { 
	const {username, password} = req.body
	const user = await prisma.users.create({
		data: {
			username: {username},
			password: {password}
		}
	})
}

const getUserById = async (id) => {
	try{
		const user = await prisma.users.findFirst({
			where: {
				id : id
			}
		})
		return user;
	} catch (err){
		console.log(`GETTING SINGLE USER ERROR`, err)
	}
}

module.exports = {
	createUsers,
	signToken,
	getUserById
};