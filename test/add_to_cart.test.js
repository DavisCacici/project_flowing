import supertest from 'supertest';
import { pushed } from '../pages/api/add_to_cart';
const Orders = require('../model/Orders');

const app = 'http://localhost:3000';

const articlesPayload = {
    _id: "62ecffe4a53abc2ae864f2f0",
    name: "Coca Cola",
    price: 2,
    description: "Bibita"
};

const orderPayload = {
  quantity: 1,
  article: articlesPayload._id
   
};

describe('add_to_cart', () => {
    // beforeAll(async () => {
    //   // main();
    //   const mongoose = require('mongoose');
    //   await mongoose.connect(process.env.MONGO_URL);
    // });
    
    // afterAll(async () => {
    //   await mongoose.disconnect();
    //   await mongoose.connection.close();
    // });

  it('should return a 200', async () => {
    await supertest(app).post('/api/add_to_cart').expect(200);
  });

  it('should return a 405', async() => {
    await supertest(app).get('/api/add_to_cart').expect(405);
  });

  it('should return a Order with one more article ', async() => {
    let order = await Orders.findOne({status: 'Test'});
    let newOrder = pushed(order, articlesPayload._id);
    let result = JSON.parse(JSON.stringify(newOrder));
    expect({article: result.items[0].article, quantity: result.items[0].quantity}).toEqual(orderPayload);
  });

  // it('should return a 200 status and the articles', async() => {
  //   const {body, statusCode} = await supertest(app).post('/api/add_to_cart').send({article: articlesPayload});
  //   expect(statusCode).toBe(200);
  //   expect(body).toEqual(order);
  // });
})