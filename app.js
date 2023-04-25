const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const ejsMate = require('ejs-mate')
const { dealSchema } = require('./schemas.js')
const catchAsync = require('./utils/catchAsync')
const ExpressError = require('./utils/ExpressError')
const Deal = require('./models/deal')
const methodOverride = require('method-override')

// CONNECTING TO THE MONGODB
mongoose.connect('mongodb://localhost:27017/crmApp', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
	console.log('Database connected')
})

// CREATING THE EXPRESS APP
const app = express()

// MIDDLEWARES
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))

const validateDeal = (req, res, next) => {

	const { error } = dealSchema.validate(req.body)
	if (error) {
		const msg = error.details.map(el => el.message).join(',')
		throw new ExpressError(msg, 400)
	} else {
		next()
	}
}


// GET ALL DEALS
app.get('/', catchAsync(async (req, res) => {
	const deals = await Deal.find({})

	res.render('deals', { deals })
}))


// SERVER NEW DEAL PAGE
app.get('/deals/new', (req, res) => {
	res.render('new')
})

// CREATE NEW DEAL
app.post('/deals', validateDeal, catchAsync(async (req, res) => {

	const deal = new Deal(req.body.deal)
	deal.createDate = new Date()
	deal.lastActivityDate = new Date()
	await deal.save()

	res.redirect(`/deals/${deal._id}`)
}))

function formatDate(dateString) {
	const date = new Date(dateString)
	const month = date.getMonth() + 1
	const day = date.getDate()
	const year = date.getFullYear()
	return `${month}/${day}/${year}`
}

function daysSince(date) {
	const parsedDate = new Date(date)
	const today = new Date()
	const differenceInMilliseconds = today.getTime() - parsedDate.getTime()
	const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24)
	return Math.floor(differenceInDays)
}

// SHOW PAGE
app.get('/deals/:id', catchAsync(async (req, res) => {
	const { id } = req.params
	const deal = await Deal.findById(id)

	// FORMATS THE DATE and DAYS
	// const localDate = new Date().toLocaleDateString()
	const createDate = formatDate(deal.createDate)
	const activityDate = formatDate(deal.lastActivityDate)
	const daysActivity = daysSince(activityDate)
	const daysCreated = daysSince(createDate)

	// CONVERTS THE NUMBER FOR PRICE TO US CURRENCY
	let USDollar = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	})
	const dealValue = `${USDollar.format(deal.value)}`

	res.render('show', { deal, dealValue, createDate, activityDate, daysActivity, daysCreated })
}))

// EDIT DEAL
app.get('/deals/:id/edit', catchAsync(async (req, res) => {
	const { id } = req.params
	const deal = await Deal.findById(id)
	const createDate = formatDate(deal.createDate)
	const activityDate = formatDate(deal.lastActivityDate)
	const daysActivity = daysSince(activityDate)
	const daysCreated = daysSince(createDate)


	// CONVERTS THE NUMBER FOR PRICE TO US CURRENCY
	let USDollar = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	})
	const dealValue = `${USDollar.format(deal.value)}`

	res.render('edit', { deal, dealValue, createDate, activityDate, daysActivity, daysCreated })
}))

// UPDATE DEAL
app.put('/deals/:id', validateDeal, catchAsync(async (req, res) => {
	const { id } = req.params
	const deal = await Deal.findByIdAndUpdate(id, { ...req.body.deal })
	await deal.save()
	res.redirect(`/deals/${id}`)
}))



app.delete('/deals/:id', catchAsync(async (req, res) => {
	const { id } = req.params
	await Deal.findByIdAndDelete(id)

	res.redirect(`/`)
}))

app.all('*', (req, res, next) => {
	next(new ExpressError('Page Not Found', 404))
})

// ERROR HANDLING
app.use((err, req, res, next) => {
	const { statusCode = 500 } = err
	if (!err.message) err.message = 'Something went wrong'
	res.status(statusCode).render('error', { err })
})


// START THE SERVER
const port = 4835
app.listen(port, () => {
	console.log(`Serving on port ${port}`)
})
