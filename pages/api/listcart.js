const Articles = require('../../model/Articles');
const Orders = require('../../model/Orders');

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try{
        let order = await Orders.findOne({status: 'Aperto'}).populate('items.article');
        
        return res.json(order.items); 
        }
        catch(error){
            return res.json(error);
        }
    }
    return res.status(405).json({ err: 'Method not allowed' });

}