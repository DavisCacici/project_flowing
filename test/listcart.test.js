import supertest from 'supertest';

const app = 'http://localhost:3000';

describe('listcart', () => {

  it('should return a 200', async () => {
    await supertest(app).get('/api/listcart').expect(200);
  });

  it('should return a 405', async() => {
    await supertest(app).post('/api/listcart').expect(405);
  });

})