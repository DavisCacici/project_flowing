const Articles = require('../../model/Articles');
const Orders = require('../../model/Orders');
const mongoose = require('mongoose');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        // Seek a order with status 'Open'
        let order = await Orders.findOne({status: 'Aperto'}).exec();
        // if exist update element inside
        if(order)
        {
            try{
                let flag = false;

                for(let i=0; i < order.items.length; i++)
                {
                    if(String(order.items[i].article) === req.body.article._id) {
                        flag = false;
                        order.items[i].quantity++;
                        break;
                    }
                    else flag = true;
                }
                if(flag) order.items.push({quantity: 1, article: mongoose.Types.ObjectId.createFromHexString(req.body.article._id)});
                await order.save();
            }
            catch(error)
            {
                return res.json(error);
            }
        }
        // else create new order with status open and add first element inside
        else
        {
            try{
                order = new Orders({status: 'Aperto', items: [{quantity: 1, article: mongoose.Types.ObjectId.createFromHexString(req.body.article._id)}]});
                await order.save();
            }
            catch(error)
            {
                return res.json(error);
            }
            
        }
        
        return res.json(order);
    }
    return res.status(405).json({ err: 'Method not allowed' });

}