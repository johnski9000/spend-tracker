import Spend from "../models/SpendPostSchema";
import db from "../utils/database";


const handler = async (req, res) => {
    console.log(req.body)
    await db.connect();
    const newSpend = new Spend({
        ...req.body,
    });
     const spend = await newSpend.save();
     res.status(201).send(spend)
}
 
export default handler;
