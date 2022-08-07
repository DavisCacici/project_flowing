const Orders = require('../../model/Orders');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        await Orders.findOneAndUpdate({status: 'Aperto'}, {status: 'Chiuso'}).exec();
        return res.json('Ordine chiuso');
    }
    return res.status(405).json({ err: 'Method not allowed' });
}