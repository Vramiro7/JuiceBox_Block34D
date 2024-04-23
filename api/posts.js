const express = require('express');
const postsRouter = express.Router();
const {PrismaClient} = require('@prisma/client');
const { requireUser } = require('./utils');
const prisma = new PrismaClient();

postsRouter.get('/', async (req, res, next) => {
	const allPosts = await prisma.posts.findMany()
		res.send(allPosts);
});

postsRouter.get('/:id', async (req, res, next) => {
	const singlePosts = await prisma.posts.findMany({
		 where: {
			id: parseInt(req.params.id)
		}
	})
		res.send(singlePosts);
});

postsRouter.use( async (req, res, next) =>{
	const prefix = "Bearer ";
	const auth = req.header('Authorization')
	console.log()
})

//create new post 
postsRouter.post('/create', requireUser, async (req, res, next)=> {
	const {title, content, userId} = req.body
	console.log(title, content, userId)
})

//Update post only if user created it themselves

//Delete post only if user created it themselves



module.exports = postsRouter;