import '@testing-library/jest-dom';
import supertest from 'supertest';
const Orders = require('../model/Orders');

const app = 'http://localhost:3000';

const articlesPayload = {
    _id: "62ecffe4a53abc2ae864f2f0",
    name: "Coca Cola",
    price: 2,
    description: "Bibita"
};

const orderPayload = {
    status: 'Aperto',
    items: [{
        quantity: 1,
        article: articlesPayload
    }],
};

describe('add_to_cart', () => {
    // beforeAll(async () => {
    //     const mongoServer = await MongoMemoryServer.create();
    
    //     await mongoose.connect(mongoServer.getUri());
    //   });
    
    //   afterAll(async () => {
    //     await mongoose.disconnect();
    //     await mongoose.connection.close();
    //   });

  it('should return a 200', async () => {
    await supertest(app).post('/api/add_to_cart').expect(200);
  });

  it('should return a 405', async() => {
    await supertest(app).get('/api/add_to_cart').expect(405);
  });

  it('should return a 200 status and the articles', async() => {
    const {body, statusCode} = await supertest(app).post('/api/add_to_cart').send({article: articlesPayload});
    let order = await Orders.findOne({status: 'Aperto'});
    expect(statusCode).toBe(200);
    expect(body).toEqual(JSON.stringify(order));
  });
})