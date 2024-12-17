const request = require('supertest');
const app = require('../server.js'); // assuming your express app is exported from server.js

describe('Product API', () => {
  it('should fetch all products', async () => {
    const res = await request(app).get('/api/products');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('data');
  });

  it('should create a new product', async () => {
    const newProduct = { name: 'Test Product', price: 100 };
    const res = await request(app).post('/api/products').send(newProduct);
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(newProduct.name);
  });
});
