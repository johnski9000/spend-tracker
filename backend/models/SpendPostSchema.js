const mongoose = require("mongoose")

const schema = new mongoose.Schema(
    {
        id: {type:String, required: true},
        formType: {type:String, required: true},
        year: {type: Number, required: true},
        week: {type: Number, required: true},
        submittedBy: {type:String, required: true},
        fascia: {type:String, required: true},
        brand: {type:String, required: true},
        reference: {type:Number, required: true},
        department: {type:String, required: true},
        submittedPurchaseBy: {type:String, required: true},
        spendType: {type:String, required: true},
        spendDetail: {type:String, required: true},
        campaignType: {type:String, required: true},
        netValue: {type:Number, required: true},
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Spend', schema);


