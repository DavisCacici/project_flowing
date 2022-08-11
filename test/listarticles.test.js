import supertest from 'supertest';

const app = 'http://localhost:3000';

const articlesPayload = [{
  _id: "62ecffe4a53abc2ae864f2f0",
  name: "Coca Cola",
  price: 2,
  description: "Bibita"
},{
  _id: "62ed02b79c408cf78d388366",
  name: "Coffé",
  description: "Caffetteria",
  price: 1
},{
  _id: "62ed13c7346fd6a6a8f5c813",
  name: "Aperol Spritz",
  description: "Coktail",
  price: 5
}];

describe('listarticles', () => {

  it('should return a 200', async () => {
    await supertest(app).get('/api/listarticles').expect(200);
  });

  it('should return a 405', async() => {
    await supertest(app).post('/api/listarticles').expect(405);
  });

  it('should return a 200 status and the articles', async() => {
    const {body, statusCode} = await supertest(app).get('/api/listarticles');
    expect(statusCode).toBe(200);
    expect(body).toEqual(articlesPayload);
  });
})