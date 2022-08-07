const Articles = require('../../model/Articles');

export default async function handler(req, res) {
    if (req.method === 'GET') {
        let articles = await Articles.find({}).sort();
      
        return res.json(articles);
          
    }
    return res.status(405).json({ err: 'Method not allowed' });

}