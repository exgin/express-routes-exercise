process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('../app');
let itemsDb = require('../fakeDb');

beforeEach(function () {
  itemsDb.push({ name: 'popsicle', price: 1.45 });
});

afterEach(function () {
  itemsDb.length = 0;
});

// GET
describe('GET method', function () {
  test('/items | List all items in the fake db', async function () {
    const resp = await request(app).get('/items');

    expect(resp.body).toEqual({ itemsDb });
  });

  test('/items/:name | List a specific item from the fake db', async function () {
    const resp = await request(app).get(`/items/popsicle`);

    expect(resp.body).toEqual({ item: { name: 'popsicle', price: 1.45 } });
  });

  test("Responds with 404 if can't find item", async function () {
    const resp = await request(app).get(`/items/0`);

    expect(resp.statusCode).toBe(404);
  });
});

// POST
describe('POST method', function () {
  test('/items | Create an item to the item db', async function () {
    const resp = await request(app).post('/items').send({ name: 'candy', price: 2.49 });

    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual({ added: { name: 'candy', price: 2.49 } });
  });
});

// PATCH
describe('PATCH method', function () {
  test('Update an item', async function () {
    const resp = await request(app).patch(`/items/popsicle`).send({ name: 'poppy' });

    expect(resp.body).toEqual({ updated: { name: 'poppy' } });
  });

  test('Error msg when not found', async function () {
    const resp = await request(app).patch('/items/dasw');

    expect(resp.statusCode).toBe(404);
  });
});

// DELETE
describe('DELETE method', function () {
  test('Delete an item', async function () {
    const resp = await request(app).delete(`/items/${itemsDb.name}`);

    expect(resp.body).toEqual({ message: 'Deleted' });
  });
});
