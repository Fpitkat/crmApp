const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const { dealSchema } = require("./schemas.js");
const catchAsync = require("./utils/catchAsync");
const ExpressError = require("./utils/ExpressError");
const Deal = require("./models/deal");
const cron = require("node-cron");
const methodOverride = require("method-override");

// CONNECTING TO THE MONGODB
mongoose.connect("mongodb://localhost:27017/crmApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// CHECKING IF THE CONNECTION IS SUCCESSFUL
const db = mongoose.connection;
db.on(
  "error",
  console.error.bind(console, "connection error:")
);
db.once("open", () => {
  console.log("Database connected");
});

// UPDATES THE DAYS OPEN EVERY DAY AT MIDNIGHT
cron.schedule("0 0 * * * *", async function () {
  const deals = await Deal.find();
  deals.forEach(async function (deal) {
    deal.lastActivityDays = Math.floor(
      (Date.now() - deal.lastActivityDate) / 86400000
    );
    await deal.save();
  });
});

const app = express();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// VALIDATION MIDDLEWARE
const validateDeal = (req, res, next) => {
  const { error } = dealSchema.validate(req.body);
  if (error) {
    const msg = error.details
      .map((el) => el.message)
      .join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

// HOME PAGE
app.get(
  "/",
  catchAsync(async (req, res) => {
    // GETS ALL THE DEALS FROM THE DATABASE
    const deals = await Deal.find({});
    res.render("deals", { deals });
  })
);

// SERVER NEW DEAL PAGE
app.get("/deals/new", (req, res) => {
  res.render("new");
});

// CREATE NEW DEAL
app.post(
  "/deals",
  validateDeal,
  catchAsync(async (req, res) => {
    const deal = new Deal(req.body.deal);

    deal.createDate = new Date();
    deal.lastActivityDate = new Date();
    await deal.save();

    res.redirect(`/deals/${deal._id}`);
  })
);

// FORMATS THE DATE
function formatDate(isoDate) {
  // Convert ISO date to UTC date
  const date = new Date(isoDate);
  // Convert UTC date to EST date
  const estDate = new Date(
    date.toLocaleString("en-US", {
      timeZone: "America/New_York",
    })
  );
  // Get month, day, and year in EST
  const month = estDate.getMonth() + 1; // getMonth() returns 0-indexed month, so we add 1
  const day = estDate.getDate();
  const year = estDate.getFullYear();
  // Format date as "mm/dd/yyyy"
  return `${month}/${day}/${year}`;
}

// function formatDate(dateString) {
//   const date = new Date(dateString);
//   const month = date.getMonth() + 1;
//   const day = date.getDate();
//   const year = date.getFullYear();
//   return `${month}/${day}/${year}`;
// }

function daysSince(date) {
  const parsedDate = new Date(date);
  const today = new Date();
  const differenceInMilliseconds =
    today.getTime() - parsedDate.getTime();
  const differenceInDays =
    differenceInMilliseconds / (24 * 60 * 60 * 1000);
  return Math.floor(differenceInDays);
}
// TODO: FIX THE MONDO ACTIVITY DATE BEING OFF BY A DAY
// SHOW PAGE
app.get(
  "/deals/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const deal = await Deal.findById(id);

    // // FORMATS THE DATE and DAYS
    const createDate = formatDate(deal.createDate);
    const activityDate = formatDate(deal.lastActivityDate);
    const daysActivity = daysSince(activityDate);
    const daysCreated = daysSince(createDate);

    // CONVERTS THE NUMBER FOR PRICE TO US CURRENCY
    let USDollar = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
    const dealValue = `${USDollar.format(deal.value)}`;

    res.render("show", {
      deal,
      dealValue,
      createDate,
      activityDate,
      daysActivity,
      daysCreated,
    });
  })
);

// EDIT DEAL
app.get(
  "/deals/:id/edit",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const deal = await Deal.findById(id);
    const createDate = formatDate(deal.createDate);
    const activityDate = formatDate(deal.lastActivityDate);
    const daysActivity = daysSince(activityDate);
    const daysCreated = daysSince(createDate);

    // CONVERTS THE NUMBER FOR PRICE TO US CURRENCY
    let USDollar = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
    const dealValue = `${USDollar.format(deal.value)}`;

    res.render("edit", {
      deal,
      // dealValue,
      createDate,
      activityDate,
      daysActivity,
      daysCreated,
    });
  })
);

// UPDATE DEAL
app.put(
  "/deals/:id",
  validateDeal,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const deal = await Deal.findByIdAndUpdate(id, {
      ...req.body.deal,
    });
    deal.lastActivityDate = new Date();
    deal.lastActivityDays = 0;

    await deal.save();
    res.redirect(`/deals/${id}`);
  })
);

app.delete(
  "/deals/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Deal.findByIdAndDelete(id);

    res.redirect(`/`);
  })
);

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

// ERROR HANDLING
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Something went wrong";
  res.status(statusCode).render("error", { err });
});

// START THE SERVER
const port = 4839;
app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});
