const request = require('supertest');
const app = require('../server/app.js');
const {Home} = require('../database/index');

describe('GET request should return 200 status code', () => {
  test('It should send a response to GET method', (done) => {
    request(app).get('/').then((response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
});

describe('Should handle a POST request', () => {
  test('POST request should send a response', (done) => {
    request(app).post('/amenities/form').then((response) => {
      expect(response.text).toBe('New entry added to the database');
      done();
    });
  });
});