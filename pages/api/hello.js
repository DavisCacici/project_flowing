// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const Orders = require('../../model/Orders');

export default async function handler(req, res) {
  let order = await Orders.findOne({status: 'Chiuso'}).populate('items.article');
  return res.json(order);
}
