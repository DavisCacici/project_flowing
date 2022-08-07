const Articles = require('../../model/Articles');
const Orders = require('../../model/Orders');

export default async function handler(req, res) {
    if (req.method === 'PUT'){
        let order = await Orders.findOne({status: 'Aperto'}).exec();
        order.items.forEach(item => {
            if(String(item._id) === req.body.itemsID)
            {
                
                item.quantity++;
            }
        })
        await order.save();
        return res.json(order);
    }
}