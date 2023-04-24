const mongoose = require('mongoose')

const DealSchema = new mongoose.Schema({
	company: String,
	street: String,
	city: String,
	state: String,
	zip: String,
	companyLinkedIn: String,
	companyWebsite: String,
	contactLinkedin: String,
	contactFB: String,
	contactEmail: String,
	priority: {
		type: Number,
		min: 1,
		max: 11,
	},
	hot: {
		type: Boolean,
		enum: ['True', 'False'],
	},
	hd: {
		type: Boolean,
		enum: ['True', 'False'],
	},
	contact: String,
	stage: {
		type: String,
		enum: ['Choose One', 'lead', 'inquiry', 'qualified', 'demo', 'negotiation', 'closure'],
	},
	status: {
		type: String,
		enum: ['Choose One', 'open', 'won', 'lost', 'inactive'],
	},
	daysOpen: Number,
	lastActivityDate: {
		type: Date,
	},
	lastActivityDays: {
		type: Number,
		default: 0,
	},
	companyPhone: String,
	contactDirect: String,
	contactCell: String,
	value: Number,
	dealName: String,
	type: String,
	open: Number,
	createDate: {
		type: Date,
	},
	zone: {
		type: String,
		enum: ['Choose One', 'jacksonville', 'waycross', 'yulee', 'kingsland', 'brunswick'],
	},
	segment: {
		type: String,
		enum: ['Choose One', 'Auto Dealer', 'Tire Dealer', 'General Repair', 'Body Shop', 'Government', 'Specialty'],
	},
	source: {
		type: String,
		enum: [
			'Choose One',
			'Asbury Group',
			'AutoNation',
			'Dealer Solutions & Design',
			'DES',
			'Florida Equipment',
			'Florida Tire Supply',
			'HELM',
			'Hunter',
			'Independent Tire Dealer Group',
			'Lewis Tool',
			'Mohawk',
			'Mongoose',
			'Morgan Auto Group',
			'National Account - A Quota',
			'National Account - B Quota',
			'Rotunda / Ford',
			'Smith Garage Equipment',
			'Snap-on Business Solutions',
			'Southern Equipment',
			'Tire Pros / ATD',
		],
	},
	distributor: {
		type: String,
		enum: [
			'Choose One',
			'Asbury Group',
			'AutoNation',
			'Dealer Solutions & Design',
			'DES',
			'Florida Equipment',
			'Florida Tire Supply',
			'HELM',
			'Hunter',
			'Independent Tire Dealer Group',
			'Lewis Tool',
			'Mohawk',
			'Mongoose',
			'Morgan Auto Group',
			'National Account - A Quota',
			'National Account - B Quota',
			'Rotunda / Ford',
			'Smith Garage Equipment',
			'Snap-on Business Solutions',
			'Southern Equipment',
			'Tire Pros / ATD',
		],
	},
	competition: String,
	reason: String,
	closed: Date,
	lostReason: String,
	notes: Array,
})

module.exports = mongoose.model('Deal', DealSchema)