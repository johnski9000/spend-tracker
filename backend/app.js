const express = require("express");
// import db from "./utils/database";
const {db} = require("./utils/database")
// import Spend from "./models/SpendPostSchema";
const Spend = require("./models/SpendPostSchema")
const Contribution = require("./models/ContributionPostScheme")
const cors = require('cors');

const app = express();
app.use(cors(),express.json());
// db.connect(

app.get('/spend', (req,res) => {
    res.send("adsas")
  });
  db.connect()
app.post("/spend-form", async(req,res) => {
    console.log(req.body)
if (
      !req.body.id ||
      !req.body.year ||
      !req.body.week ||
      !req.body.spend_submitted_by ||
      !req.body.fascia ||
      !req.body.brand ||
      !req.body.reference_number ||
      !req.body.department ||
      !req.body.submitted_purchase_by ||
      !req.body.spend_type ||
      !req.body.spend_detail ||
      !req.body.campaign_type ||
      !req.body.net_value) {
                res.status(400).send({ error: 'There was an error, enter details again' })
            } else {
                const post = new Spend({
                    id: req.body.id,
                    formType: req.body.formType,
                    year: req.body.year,
                    week: req.body.week,
                    spend_submitted_by: req.body.spend_submitted_by,
                    fascia: req.body.fascia,
                    brand: req.body.brand,
                    reference_number: req.body.reference_number,
                    department: req.body.department,
                    submitted_purchase_by: req.body.submitted_purchase_by,
                    spend_type: req.body.spend_type,
                    spend_detail: req.body.spend_detail,
                    campaign_type: req.body.campaign_type,
                    net_value: req.body.net_value,
            
                });
                 await post.save();
                 res.status(201).send(post)
            }
})
app.post("/contribution-form", async(req,res) => {
    console.log(req.body)
    if (
            !req.body.id ||
            !req.body.formType ||
            !req.body.spend_submitted_by ||
            !req.body.fascia ||
            !req.body.brand ||
            !req.body.department ||
            !req.body.spend_detail ||
            !req.body.campaign_type ||
            !req.body.net_value ||
            !req.body.confirmed
    ) {
        res.status(400).send({ error: 'There was an error, enter details again' })

    } else {
        const post = new Contribution({
            formType: req.body.formType,
            spend_submitted_by: req.body.spend_submitted_by,
            fascia: req.body.fascia,
            brand: req.body.brand,
            department: req.body.department,
            spend_detail: req.body.spend_detail,
            campaign_type: req.body.campaign_type,
            net_value: req.body.net_value,
            confirmed: req.body.confirmed
    
        });
         await post.save();
         res.status(201).send(post)
         console.log(post)
    }
})

app.get("/", async(req, res) => {
    try {
        const posts = await Spend.find()
        console.log(posts)
        res.send(posts)
    } catch (error) {
        console.log(error)
    }
})

app.get("/contribution", async(req, res) => {
    try {
        const posts = await Contribution.find()
        console.log(posts)
        res.send(posts)
    } catch (error) {
        console.log(error)
    }
})
app.post("/edit-post", async(req, res) => {
    let id = req.body.id
    console.log(req.body)
    try {
        const post = await Spend.findOneAndUpdate({_id: id}, {
            year: req.body.year,
        week: req.body.week,
        submittedBy: req.body.submittedBy,
        fascia: req.body.fascia,
        brand: req.body.brand,
        reference: req.body.reference,
        department: req.body.department,
        submittedPurchaseBy: req.body.submittedPurchaseBy,
        spendType: req.body.spendType,
        spendDetail: req.body.spendDetail,
        campaignType: req.body.campaignType,
        netValue: req.body.netValue,
        })
        console.log(post)
        res.send(post)
    } catch (error) {
        console.log(error)
    }
})
app.post("/edit-contribution", async(req,res) => {
    console.log(req.body.confirmed)
    let id = req.body.id

    const post = await Contribution.findOneAndUpdate({_id: id}, {
        spend_submitted_by: req.body.spend_submitted_by,
        fascia: req.body.fascia,
        brand: req.body.brand,
        department: req.body.department,
        spend_detail: req.body.spend_detail,
        campaign_type: req.body.campaign_type,
        net_value: req.body.net_value,
        confirmed: req.body.confirmed
    });
     res.status(201).send(post)

})
app.get("/getAll", async(req, res) => {
    console.log(req.query.reference_number)
    const reference_number_input = req.query.reference_number
    try {
        const posts = await Spend.find({ reference_number: reference_number_input} )
        console.log(posts)
        res.send(posts)
    } catch (error) {
        console.log(error)
        res.send(error)

    }
})
// app.get("/getAllContribution", async(req, res) => {
//     const id = req.query._id
//     try {
//         const posts = await Spend.find({ reference_number: id} )
//         console.log(posts)
//         res.send(posts)
//     } catch (error) {
//         console.log(error)
//         res.send(error)

//     }
// })
// async function getAll() {
//     try {
//         const posts = await Contribution.find({ _id: "63bc35451510aab7e71e2e56"} )
//         console.log(posts)
//     } catch (error) {
//         console.log(error)
//     }
// }
// getAll()

app.listen(4000, () => console.log("server started on port 4000"))