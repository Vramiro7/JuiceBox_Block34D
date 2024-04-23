const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const { faker } = require("@faker-js/faker");


const createUsers = async () => { 
	const user1 = await prisma.users.create({
		data: {
			username: 'Alice',
			password: 'pickles'
		}
	}) 	
	const user2 = await prisma.users.create({
		data: {
			username: 'Brooklyn',
			password: 'Spam'
		}
	})
	const user3 = await prisma.users.create({
		data: {
			username: 'Charlie',
			password: 'IceCream'
		}
	})  	
}

const createPosts = async () => { 
	for(i = 0; i < 3; i++){
		const user1Posts = await prisma.posts.create({
			data: {
				title : faker.lorem.sentence(),
				content: faker.lorem.text(),
				userId: 1
			}
		})	
		const user2Posts = await prisma.posts.create({
			data: {
				title : faker.lorem.sentence(),
				content: faker.lorem.text(),
				userId: 2
			}
		})	
		const user3Posts = await prisma.posts.create({
			data: {
				title : faker.lorem.sentence(),
				content: faker.lorem.text(),
				userId: 3
			}
		})	
	}
}


const main = async () => {
	await createUsers()
	await createPosts()

	const allUsers = await prisma.users.findMany()
		console.table(allUsers)
	const allPosts = await prisma.posts.findMany()
		console.log(allPosts)	
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })


