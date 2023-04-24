const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const ejsMate = require('ejs-mate')
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

// MIDDLEWARE
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))


// GET ALL DEALS
app.get('/', async (req, res) => {
	const deals = await Deal.find({})

	res.render('deals', { deals })
})


// SERVER NEW DEAL PAGE
app.get('/deals/new', (req, res) => {
	res.render('new')
})

// CREATE NEW DEAL
app.post('/deals', async (req, res) => {
	const deal = new Deal(req.body.deal)
	await deal.save()

	res.redirect(`/deals/${deal._id}`)
})

// SHOW PAGE
app.get('/deals/:id', async (req, res) => {
	const { id } = req.params
	const deal = await Deal.findById(id)

	res.render('show', { deal })
})

// EDIT DEAL
app.get('/deals/:id/edit', async (req, res) => {
	const { id } = req.params
	const deal = await Deal.findById(id)

	res.render('edit', { deal })
})

// UPDATE DEAL
app.put('/deals/:id', async (req, res) => {
	const { id } = req.params
	const deal = await Deal.findByIdAndUpdate(id, { ...req.body })
	console.log("DEAL BEFORE SAVE: ", deal) // and this
	await deal.save()
	console.log("DEAL AFTER SAVE: ", deal) // and this
	res.redirect(`/deals/${id}`)

})



app.delete('/deals/:id', async (req, res) => {
	const { id } = req.params
	await Deal.findByIdAndDelete(id)

	res.redirect(`/deals`)
})


// START THE SERVER
const port = 4835
app.listen(port, () => {
	console.log(`Serving on port ${port}`)
})
