const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
authRouter = express.Router()
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const { text } = require('body-parser');
saltRounds = 10;



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const signToken = (username, id) => {
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "1w",
  });
  return token;	
};

//registers a new user and add them to database
authRouter.post('/register', async (req, res) => {
	try{
		const username = req.body.username;
		const textPassword = req.body.password;
		const hashedPassword = await bcrypt.hash(textPassword, saltRounds);
		const newUser = await prisma.users.create({
			data: {
				username: `${username}`,
				password: `${hashedPassword}`
			}
		});
		const id = newUser.id
		res.send(`USER SUCESSFULLY CREATED WITH THE ID# ${id}`)
	} catch (err){
		res.sendStatus(500);
		console.log("ERROR CREATING USER", err)
	}
})

//login user that is currently in database 
authRouter.post('/login', async (req, res, next) => {
	const username = req.body.username;
	const unhashedPassword = req.body.password;

	try{
		const user = await prisma.users.findFirst({
			where:{
				username : username
			}
		});
		if(!user){
			res.sendStatus(401);
		} else {
			const passwordIsAMatch = await bcrypt.compare(unhashedPassword, user.password)
			if (passwordIsAMatch){
				const token = signToken(user.username, user.id);
				res.send({message: "SUCCESFULLY LOGGED IN", token});
			} else {
				res.sendStatus(401);
			}
		}
	} catch (err){
			console.log(err)
	}
});



module.exports = authRouter;