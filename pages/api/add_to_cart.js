const Orders = require('../../model/Orders');
const mongoose = require('mongoose');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        // Seek a order with status 'Open'
        let order = await Orders.findOne({status: 'Aperto'});
        // if exist update element inside
        if(order)
        {
            try{
                let flag = false;
                // if there are element in the cart
                if(order.items.length != 0)
                {
                    for(let i=0; i < order.items.length; i++)
                    {
                        if(String(order.items[i].article) === req.body.article._id) {
                            flag = false;
                            order.items[i].quantity++;
                            break;
                        }
                        else flag = true;
                    }
                    if(flag) order = pushed(order, req.body.article._id);
                }// if there aren't element in the cart
                else{
                    order = pushed(order, req.body.article._id);
                }
               
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

export const pushed = (order, article_id) => {
    order.items.push({quantity: 1, article: mongoose.Types.ObjectId.createFromHexString(article_id)});
    return order;
}