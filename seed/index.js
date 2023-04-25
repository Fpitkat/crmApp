const mongoose = require('mongoose')
const Deal = require('../models/deal')

const deals = [
	{
		company: "DEF Company",
		street: "456 Elm Street",
		city: "Anytown",
		state: "CA",
		zip: "91234",
		companyLinkedIn: "https://www.linkedin.com/company/def-company",
		companyWebsite: "https://www.defcompany.com",
		contactLinkedin: "https://www.linkedin.com/in/maryjones",
		contactFB: "https://www.facebook.com/maryjones",
		contactEmail: "mary.jones@defcompany.com",
		priority: 5,
		hot: false,
		hd: false,
		contact: "Mary Jones",
		stage: "Closure",
		status: "Open",
		daysOpen: 6,
		lastActivityDate: new Date(),
		lastActivityDays: 5,
		companyPhone: "(555) 555-5567",
		contactDirect: "(555) 555-5568",
		contactCell: "(555) 555-5569",
		value: 10000,
		dealName: "DEF Company Deal",
		type: "Sales",
		open: 1,
		createDate: new Date(),
		zone: "Brunswick",
		segment: "Specialty",
		source: "Dealer Solutions & Design",
		distributor: "HELM",
		competition: "ABC Company",
		reason: "Cold Call",
		closed: null,
		lostReason: null,
		notes: ["This is a new deal.", "Contacted Mary Jones.", "Set up a meeting for next week."]
	},
	{
		company: "ABC Inc.",
		street: "123 Main St",
		city: "Jacksonville",
		state: "FL",
		zip: "32202",
		companyLinkedIn: "https://www.linkedin.com/company/abc-inc/",
		companyWebsite: "https://www.abcinc.com",
		contactLinkedin: "https://www.linkedin.com/in/john-doe/",
		contactFB: "https://www.facebook.com/john.doe/",
		contactEmail: "john.doe@abcinc.com",
		priority: 5,
		hot: true,
		hd: false,
		contact: "John Doe",
		stage: "Qualified",
		status: "Open",
		daysOpen: 30,
		lastActivityDate: new Date("2023-04-15"),
		lastActivityDays: 10,
		companyPhone: "555-555-1212",
		contactDirect: "555-555-1234",
		contactCell: "555-555-5678",
		value: 50000,
		dealName: "ABC Inc. Equipment Purchase",
		type: "Equipment",
		open: 1,
		createDate: new Date("2023-04-01"),
		zone: "Jacksonville",
		segment: "Auto Dealer",
		source: "HELM",
		distributor: "HELM",
		competition: "XYZ Inc.",
		reason: "Lower cost",
		closed: null,
		lostReason: "",
		notes: ["Follow up next week", "Send quote by email"]
	},
	{
		company: "XYZ LLC",
		street: "456 Broadway Ave",
		city: "Waycross",
		state: "GA",
		zip: "31501",
		companyLinkedIn: "",
		companyWebsite: "https://www.xyzllc.com",
		contactLinkedin: "",
		contactFB: "",
		contactEmail: "jane.doe@xyzllc.com",
		priority: 3,
		hot: false,
		hd: true,
		contact: "Jane Doe",
		stage: "Inquiry",
		status: "Open",
		daysOpen: 15,
		lastActivityDate: new Date("2023-04-20"),
		lastActivityDays: 5,
		companyPhone: "912-555-1212",
		contactDirect: "912-555-1234",
		contactCell: "912-555-5678",
		value: 25000,
		dealName: "XYZ LLC Service Agreement",
		type: "Service",
		open: 1,
		createDate: new Date("2023-04-05"),
		zone: "Waycross",
		segment: "General Repair",
		source: "Tire Pros / ATD",
		distributor: "Tire Pros / ATD",
		competition: "",
		reason: "",
		closed: null,
		lostReason: "",
		notes: ["Schedule demo", "Send brochure"]
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
