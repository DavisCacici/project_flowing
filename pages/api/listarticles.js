const Articles = require('../../model/Articles');

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try{
            let articles = await Articles.find({}).sort().exec();
      
            return res.json(articles);
        }catch(error)
        {
            return res.json(error);
        }

          
    }
    return res.status(405).json({ err: 'Method not allowed' });

}