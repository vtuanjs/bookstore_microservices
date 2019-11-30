'use strict';
const Order = require('../model');
const database = require('../database');
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app');

let listOrderIds = [];

before(done => {
  console.log('Loading test...');
  database
    .connect()
    .then(() => {
      return Order.remove();
    })
    .then(() => {
      done();
    })
    .catch(error => done(error));
});

after(() => {
  console.log('Test order completed');
});

describe('POST /orders', () => {
  it('OK, create order 1', done => {
    request(app)
      .post(`/orders`)
      .send({
        customerId: '5de14eea7e157305330ef5c0',
        bookId: '5de0dfc087d96f184f2a22df',
        initialDate: '2019-11-29',
        deliveryDate: '2019-12-6'
      })
      .then(res => {
        const body = res.body;
        expect(res.statusCode).to.equals(200);
        expect(body).to.contain.property('order');
        expect(body.order.customerId).to.equals(
          '5de14eea7e157305330ef5c0'
        );
        done();
      })
      .catch(error => done(error));
  });

  it('OK, create order 2', done => {
    request(app)
      .post(`/orders`)
      .send({
        customerId: '5de14eea7e157305330ef5c0',
        bookId: '5de0dfc087d96f184f2a22df',
        initialDate: '2019-11-26',
        deliveryDate: '2019-12-4'
      })
      .then(res => {
        const body = res.body;
        expect(res.statusCode).to.equals(200);
        expect(body).to.contain.property('order');
        expect(body.order.customerId).to.equals(
          '5de14eea7e157305330ef5c0'
        );
        done();
      })
      .catch(error => done(error));
  });

  it('OK, create order 3', done => {
    request(app)
      .post(`/orders`)
      .send({
        customerId: '5de14eea7e157305330ef5c0',
        bookId: '5de0dfc087d96f184f2a22df',
        initialDate: '2019-11-27',
        deliveryDate: '2019-12-1'
      })
      .then(res => {
        const body = res.body;
        expect(res.statusCode).to.equals(200);
        expect(body).to.contain.property('order');
        expect(body.order.customerId).to.equals(
          '5de14eea7e157305330ef5c0'
        );
        done();
      })
      .catch(error => done(error));
  });

  it('OK, create order 4', done => {
    request(app)
      .post(`/orders`)
      .send({
        customerId: '5de14eea7e157305330ef5c0',
        bookId: '5de0dfc087d96f184f2a22df',
        initialDate: '2019-11-31',
        deliveryDate: '2019-12-3'
      })
      .then(res => {
        const body = res.body;
        expect(res.statusCode).to.equals(200);
        expect(body).to.contain.property('order');
        expect(body.order.customerId).to.equals(
          '5de14eea7e157305330ef5c0'
        );
        done();
      })
      .catch(error => done(error));
  });
  
});

describe('GET /orders', () => {
  it('OK, get list orders', done => {
    request(app)
      .get('/orders')
      .then(res => {
        const body = res.body;
        expect(res.statusCode).to.equals(200);
        expect(body).to.contain.property('orders');
        expect(body.orders.length).to.greaterThan(0);
        // Save list order ids
        listOrderIds = body.orders.map(order => {
          return order._id;
        });
        done();
      })
      .catch(error => done(error));
  });
});

describe('GET /orders/:orderId', () => {
  it('OK, get order', done => {
    request(app)
      .get(`/orders/${listOrderIds[0]}`)
      .then(res => {
        const body = res.body;
        expect(res.statusCode).to.equals(200);
        expect(body).to.contain.property('order');
        done();
      })
      .catch(error => done(error));
  });
});

describe('PUT /orders/:orderId', () => {
  it('OK, update order', done => {
    request(app)
      .put(`/orders/${listOrderIds[2]}`)
      .send({
        deliveryDate: '2020-01-1'
      })
      .then(res => {
        const body = res.body;
        expect(res.statusCode).to.equals(200);
        expect(body).to.contain.property('order');
        done();
      })
      .catch(error => done(error));
  });
});

describe('DELETE /orders/:orderId', () => {
  it('OK, delete order', done => {
    request(app)
      .delete(`/orders/${listOrderIds[3]}`)
      .then(res => {
        const body = res.body;
        expect(res.statusCode).to.equals(200);
        expect(body).to.contain.property('order');
        done();
      })
      .catch(error => done(error));
  });
});
