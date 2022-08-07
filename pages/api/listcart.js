const Articles = require('../../model/Articles');
const Orders = require('../../model/Orders');

export default async function handler(req, res) {
    if (req.method === 'GET') {
        
        let order = await Orders.findOne({status: 'Aperto'}).exec();
        let articles = [];

        for(let i=0; i < order.items.length; i++)
        {
            let product = await Articles.findById(order.items[i].article);
            articles.push({quantity: order.items[i].quantity, article: product, itemsID: order.items[i]._id});
        }

        return res.json(articles); 
    }
    return res.status(405).json({ err: 'Method not allowed' });

}

const takeArticles = (order) => {
    
    return articles;
}