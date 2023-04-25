const Joi = require('joi')

module.exports.dealSchema = Joi.object({
  deal: Joi.object({
    company: Joi.string().required(),
    street: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    zip: Joi.string().required(),
    companyLinkedIn: Joi.string(),
    companyWebsite: Joi.string(),
    contactLinkedin: Joi.string(),
    contactFB: Joi.string(),
    contactEmail: Joi.string().required(),
    priority: Joi.number().required().min(1).max(11),
    hot: Joi.boolean().required(),
    hd: Joi.boolean().required(),
    contact: Joi.string().required(),
    stage: Joi.string().required(),
    status: Joi.string().required(),
    daysOpen: Joi.number().min(0),
    lastActivityDays: Joi.number().min(0),
    companyPhone: Joi.string().required(),
    contactDirect: Joi.string(),
    contactCell: Joi.string(),
    value: Joi.number().required().min(0),
    dealName: Joi.string().required(),
    type: Joi.string(),
    open: Joi.number().min(0),
    createDate: Joi.date(),
    zone: Joi.string().required(),
    segment: Joi.string().required(),
    source: Joi.string().required(),
    distributor: Joi.string().required(),
    competition: Joi.string(),
    reason: Joi.string(),
    closed: Joi.date(),
    lostReason: Joi.string(),
    notes: Joi.array()


  }).required()
})

