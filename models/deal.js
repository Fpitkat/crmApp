const mongoose = require("mongoose");

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
    enum: ["True", "False"],
  },
  hd: {
    type: Boolean,
    enum: ["True", "False"],
  },
  contact: String,
  stage: {
    type: String,
    enum: [
      "Choose One",
      "Lead",
      "Inquiry",
      "Qualified",
      "Demo",
      "Negotiation",
      "Closure",
    ],
  },
  status: {
    type: String,
    enum: ["Choose One", "Open", "Won", "Lost", "Inactive"],
  },
  daysOpen: {
    type: Number,
    default: function () {
      const today = new Date();
      const diffTime = Math.abs(today - this.createDate);
      const diffDays = Math.floor(
        diffTime / (1000 * 60 * 60 * 24)
      );
      return diffDays;
    },
  },
  lastActivityDate: {
    type: Date,
  },
  lastActivityDays: {
    type: Number,
    default: function () {
      const today = new Date();
      const diffTime = Math.abs(
        today - this.lastActivityDate
      );
      const diffDays = Math.floor(
        diffTime / (1000 * 60 * 60 * 24)
      );
      return diffDays;
    },
  },
  companyPhone: String,
  contactDirect: String,
  contactCell: String,
  value: Number,
  dealName: String,
  notes: Array,
  open: Number,
  createDate: {
    type: Date,
  },
  zone: {
    type: String,
    enum: [
      "Choose One",
      "Jacksonville",
      "Waycross",
      "Yulee",
      "Kingsland",
      "Brunswick",
    ],
  },
  segment: {
    type: String,
    enum: [
      "Choose One",
      "Auto Dealer",
      "Tire Dealer",
      "General Repair",
      "Body Shop",
      "Government",
      "Specialty",
    ],
  },
  source: {
    type: String,
    enum: [
      "Choose One",
      "Asbury Group",
      "AutoNation",
      "Dealer Solutions & Design",
      "DES",
      "Florida Equipment",
      "Florida Tire Supply",
      "HELM",
      "Hunter",
      "Independent Tire Dealer Group",
      "Lewis Tool",
      "Mohawk",
      "Mongoose",
      "Morgan Auto Group",
      "National Account - A Quota",
      "National Account - B Quota",
      "Rotunda / Ford",
      "Smith Garage Equipment",
      "Snap-on Business Solutions",
      "Southern Equipment",
      "Tire Pros / ATD",
    ],
  },
  distributor: {
    type: String,
    enum: [
      "Choose One",
      "Asbury Group",
      "AutoNation",
      "Dealer Solutions & Design",
      "DES",
      "Florida Equipment",
      "Florida Tire Supply",
      "HELM",
      "Hunter",
      "Independent Tire Dealer Group",
      "Lewis Tool",
      "Mohawk",
      "Mongoose",
      "Morgan Auto Group",
      "National Account - A Quota",
      "National Account - B Quota",
      "Rotunda / Ford",
      "Smith Garage Equipment",
      "Snap-on Business Solutions",
      "Southern Equipment",
      "Tire Pros / ATD",
    ],
  },
  competition: String,
  reason: String,
  closed: Date,
  lostReason: String,
});

module.exports = mongoose.model("Deal", DealSchema);
