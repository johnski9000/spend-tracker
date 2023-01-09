const mongoose = require("mongoose")

const schema = new mongoose.Schema(
    {
        formType: {type:String, required: true},
        spend_submitted_by: {type: String, required: true},
        fascia: {type: String, required: true},
        brand: {type:String, required: true},
        department: {type:String, required: true},
        spend_detail: {type:String, required: true},
        campaign_type: {type:String, required: true},
        net_value: {type:Number, required: true},
        confirmed: {type:Boolean}
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Contribution', schema);


