const Orders = require('../../model/Orders');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try{
            await Orders.findOneAndUpdate({status: 'Aperto'}, {status: 'Chiuso'}).exec();
            return res.json('Ordine chiuso');
        }catch(error)
        {
            return res.json('errore inprevisto');
        }
        
    }
    return res.status(405).json({ err: 'Method not allowed' });
}