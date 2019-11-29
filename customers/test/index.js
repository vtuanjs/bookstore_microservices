'use strict';
const Customer = require('../model');
const database = require('../database');
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app');

let listCustomerIds = [];

before(done => {
  console.log('Loading test...');
  database
    .connect()
    .then(() => {
      return Customer.remove();
    })
    .then(() => {
      done();
    })
    .catch(error => done(error));
});

after(() => {
  console.log('Test customer completed');
});

describe('POST /customers', () => {
  it('OK, create customer Le Thi Ngoc An', done => {
    request(app)
      .post(`/customers`)
      .send({
        name: 'Lê Thị Ngọc An',
        age: 23,
        address: 'Tan Phu, TP HCM',
      })
      .then(res => {
        const body = res.body;
        expect(res.statusCode).to.equals(200);
        expect(body).to.contain.property('customer');
        expect(body.customer.name).to.equals(
          'Lê Thị Ngọc An'
        );
        done();
      })
      .catch(error => done(error));
  });

  it('OK, create customer Thông Minh Lư', done => {
    request(app)
      .post(`/customers`)
      .send({
        name: 'Thông Minh Lư',
        age: 23,
        address: 'Tan Phu, TP HCM',
      })
      .then(res => {
        const body = res.body;
        expect(res.statusCode).to.equals(200);
        expect(body).to.contain.property('customer');
        expect(body.customer.name).to.equals(
          'Thông Minh Lư'
        );
        done();
      })
      .catch(error => done(error));
  });

  it('OK, create customer Châu Tuấn', done => {
    request(app)
      .post(`/customers`)
      .send({
        name: 'Châu Tuấn',
        age: 23,
        address: 'Tan Phu, TP HCM',
      })
      .then(res => {
        const body = res.body;
        expect(res.statusCode).to.equals(200);
        expect(body).to.contain.property('customer');
        expect(body.customer.name).to.equals(
          'Châu Tuấn'
        );
        done();
      })
      .catch(error => done(error));
  });

  it('OK, create customer Thắng Phạm', done => {
    request(app)
      .post(`/customers`)
      .send({
        name: 'Thắng Phạm',
        age: 23,
        address: 'Tan Phu, TP HCM',
      })
      .then(res => {
        const body = res.body;
        expect(res.statusCode).to.equals(200);
        expect(body).to.contain.property('customer');
        expect(body.customer.name).to.equals(
          'Thắng Phạm'
        );
        done();
      })
      .catch(error => done(error));
  });
});

describe('GET /customers', () => {
  it('OK, get list customers', done => {
    request(app)
      .get('/customers')
      .then(res => {
        const body = res.body;
        expect(res.statusCode).to.equals(200);
        expect(body).to.contain.property('customers');
        expect(body.customers.length).to.greaterThan(0);
        // Save list customer ids
        listCustomerIds = body.customers.map(customer => {
          return customer._id;
        });
        done();
      })
      .catch(error => done(error));
  });

  it('OK, get list customers with select field name', done => {
    request(app)
      .get('/customers?fields=name')
      .then(res => {
        const body = res.body;
        expect(res.statusCode).to.equals(200);
        expect(body).to.contain.property('customers');
        expect(body.customers.length).to.greaterThan(0);
        expect(body.customers[0]).has.ownProperty('name')
        expect(body.customers[0]).to.not.has.ownProperty('age')
        done();
      })
      .catch(error => done(error));
  });
});

describe('GET /customers/:customerId', () => {
  it('OK, get customer', done => {
    request(app)
      .get(`/customers/${listCustomerIds[0]}`)
      .then(res => {
        const body = res.body;
        expect(res.statusCode).to.equals(200);
        expect(body).to.contain.property('customer');
        expect(body.customer.name).to.equals('Lê Thị Ngọc An');
        done();
      })
      .catch(error => done(error));
  });

  it('OK, get customer with select field name', done => {
    request(app)
      .get(`/customers/${listCustomerIds[0]}?fields=name`)
      .then(res => {
        const body = res.body;
        expect(res.statusCode).to.equals(200);
        expect(body).to.contain.property('customer');
        expect(body.customer.name).to.equals('Lê Thị Ngọc An');
        expect(body.customer).to.not.has.ownProperty('author');
        done();
      })
      .catch(error => done(error));
  });
});

describe('PUT /customers/:customerId', () => {
  it('OK, update customer', done => {
    request(app)
      .put(`/customers/${listCustomerIds[2]}`)
      .send({
        name: 'Ngọc An 2',
        age: 18,
        address: 'Go Dau, Tp HCM',
      })
      .then(res => {
        const body = res.body;
        expect(res.statusCode).to.equals(200);
        expect(body).to.contain.property('customer');
        expect(body.customer.name).to.equals('Ngọc An 2');
        expect(body.customer.age).to.equals(18);
        expect(body.customer.address).to.equals('Go Dau, Tp HCM');
        done();
      })
      .catch(error => done(error));
  });
});

describe('DELETE /customers/:customerId', () => {
  it('OK, delete customer', done => {
    request(app)
      .delete(`/customers/${listCustomerIds[3]}`)
      .then(res => {
        const body = res.body;
        expect(res.statusCode).to.equals(200);
        expect(body).to.contain.property('customer');
        done();
      })
      .catch(error => done(error));
  });
});
