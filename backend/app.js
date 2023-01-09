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

    const post = new Spend({
        id: req.body.id,
        formType: req.body.formType,
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

    });
     await post.save();
     res.status(201).send(post)
     console.log(post)
    // const spend = await newSpend.save()
    // res.status(201).send(spend)

})
app.post("/contribution-form", async(req,res) => {
    console.log(req.body)

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
    // const spend = await newSpend.save()
    // res.status(201).send(spend)

})
// async function getAll() {
//     try {
//         const posts = await Spend.find()
//         console.log(posts)
//     } catch (error) {
//         console.log(error)
//     }
// }
// getAll()
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
    //  console.log(post)
    // const spend = await newSpend.save()
    // res.status(201).send(spend)

})
// async function run () {
//     const post = new Spend({name: "adas", email: "asda"})
//     await post.save()
//     console.log(post)
// }
// run()
app.listen(4000, () => console.log("server started on port 4000"))