const mongoose = require("mongoose");

// TODO: Add validation to schema
// TODO: Add required fields to schema
const DealSchema = new mongoose.Schema({
  company: String,
  street: String,
  city: String,
  state: String,
  zip: String,
  companyPhone: String,
  social: {
    companyLinkedIn: String,
    companyWebsite: String,
  },
  deals: [
    {
      createDate: {
        type: Date,
        default: Date.now(),
      },
      dealName: String,
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
      daysOpen: Number,
      type: String,
      lastActivityDate: {
        type: Date,
      },
      value: Number,
      closed: Date,
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
      lostReason: String,
      reason: String,
      closed: Date,
      notes: Array,
    },
  ],
  contact: [
    {
      contact: String,
      contactEmail: String,
      phone: {
        contactDirect: String,
        contactCell: String,
      },
      social: {
        contactLinkedin: String,
        contactFB: String,
      },
    },
  ],
});

module.exports = mongoose.model("Deal", DealSchema);


