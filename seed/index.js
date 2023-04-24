const mongoose = require('mongoose')
const Deal = require('../models/deal')

const deals = [
	{
		company: 'ABC Motors',
		street: '123 Main St',
		city: 'Miami',
		state: 'FL',
		zip: '33131',
		companyLinkedIn: 'https://www.linkedin.com/in/abc-motors',
		companyWebsite: 'https://www.abcmotors.com',
		contactLinkedin: 'https://www.linkedin.com/in/john-doe',
		contactFB: 'https://www.facebook.com/johndoe',
		contactEmail: 'johndoe@abcmotors.com',
		priority: 5,
		hot: true,
		hd: false,
		contact: 'John Doe',
		stage: 'inquiry',
		status: 'open',
		daysOpen: 10,
		lastActivityDate: new Date('2023-04-23'),
		lastActivityDays: 1,
		companyPhone: '305-555-1234',
		contactDirect: '305-555-5678',
		contactCell: '305-555-9876',
		value: 25000,
		dealName: 'New Equipment Deal',
		type: 'equipment',
		open: 10,
		createDate: new Date('2023-04-14'),
		zone: 'jacksonville',
		segment: 'Auto Dealer',
		source: 'Asbury Group',
		distributor: 'Dealer Solutions & Design',
		competition: 'XYZ Motors',
		reason: '',
		closed: null,
		lostReason: '',
		notes: ['Initial contact made', 'Waiting for response'],
	},

	{
		company: 'DEF Automotive',
		street: '456 Pine St',
		city: 'Orlando',
		state: 'FL',
		zip: '32801',
		companyLinkedIn: 'https://www.linkedin.com/in/def-automotive',
		companyWebsite: 'https://www.defautomotive.com',
		contactLinkedin: 'https://www.linkedin.com/in/jane-smith',
		contactFB: 'https://www.facebook.com/janesmith',
		contactEmail: 'janesmith@defautomotive.com',
		priority: 7,
		hot: true,
		hd: true,
		contact: 'Jane Smith',
		stage: 'qualified',
		status: 'open',
		daysOpen: 15,
		lastActivityDate: new Date('2023-04-22'),
		lastActivityDays: 2,
		companyPhone: '407-555-4321',
		contactDirect: '407-555-8765',
		contactCell: '407-555-6789',
		value: 45000,
		dealName: 'Service Contract Deal',
		type: 'service',
		open: 15,
		createDate: new Date('2023-04-09'),
		zone: 'waycross',
		segment: 'General Repair',
		source: 'Dealer Solutions & Design',
		distributor: 'Florida Equipment',
		competition: 'GHI Repair',
		reason: '',
		closed: null,
		lostReason: '',
		notes: ['First meeting done', 'Preparing a quote'],
	}

]

for (let i = 0; i < deals.length; i++) {
	console.log(deals[i].company)
}

mongoose.connect('mongodb://localhost:27017/crmApp', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
	console.log('Database connected')
})

async function seedDeals(dealsArray) {
	try {
		await Deal.deleteMany({})

		for (let i = 0; i < deals.length; i++) {
			console.log(deals[i].company)
			const newDeal = new Deal(deals[i])
			await newDeal.save()
		}

		console.log('Deals seeded successfully!')
	} catch (err) {
		console.error(err)
	}
}

seedDeals({ deals }).then(() => {
	mongoose.connection.close()
})
