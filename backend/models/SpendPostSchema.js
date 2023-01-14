const mongoose = require("mongoose")

const schema = new mongoose.Schema(
    {
        id: {type:String, required: true},
        formType: {type:String, required: true},
        year: {type: Number, required: true},
        week: {type: Number, required: true},
        spend_submitted_by: {type:String, required: true},
        fascia: {type:String, required: true},
        brand: {type:String, required: true},
        reference_number: {type:Number, required: true},
        department: {type:String, required: true},
        submitted_purchase_by: {type:String, required: true},
        spend_type: {type:String, required: true},
        spend_detail: {type:String, required: true},
        campaign_type: {type:String, required: true},
        net_value: {type:Number, required: true},
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Spend', schema);


