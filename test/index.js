require('dotenv').config();
const app = require('./../server');
const chai = require('chai');
const mongoose = require('mongoose');
const chaiHttp = require('chai-http');
chai.config.includeStack = true;
const should = chai.should();
const expect = chai.expect;
const assert = chai.assert;
const { before, after, describe, it } = require('mocha');
const User = require('../models/user');
const Quote = require('../models/quote.js');
chai.use(chaiHttp);
const agent = chai.request.agent(app);

after((done) => {
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe('API Tests', function () {
  const user = {
    username: 'user',
    password: 'password',
  };

  before(function (done) {
    agent
      .post('/sign-up')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send(user)
      .then(function (res) {
        done();
      })
      .catch(function (err) {
        done(err);
      });
  });

  beforeEach((done) => {
    const sampleQuote = new Quote({
      body: 'The body of the quote contains a lot of words',
      author: 'Anonymous author',
      _id: 'aaaaaaaaaaaa',
    });

    sampleQuote.save().then(() => {
      done();
    });
  });

  afterEach((done) => {
    Quote.deleteMany({ _id: 'aaaaaaaaaaaa' }).then(() => {
      done();
    });
  });

  it('should load all quotes', (done) => {
    chai.request(app);
    agent.get('/index').end((err, res) => {
      if (err) {
        done(err);
      }
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      done();
    });
  });

  it('should get one specific quote', (done) => {
    chai.request(app);
    agent.get(`/index/aaaaaaaaaaaa`).end((err, res) => {
      if (err) {
        done(err);
      }
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.author).to.equal('Anonymous author');
      expect(res.body.body).to.equal(
        'The body of the quote contains a lot of words'
      );
      done();
    });
  });

  it('should post a new quote', (done) => {
    chai.request(app);
    agent
      .post('/index')
      .send({ author: 'a new author', body: 'this quote is really important' })
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res.body).to.be.an('object');

        // check that quote is actually inserted into database
        Quote.findOne({ title: 'a-new-quote' }).then((quote) => {
          expect(quote).to.be.an('object');
        });
        done();
      });
  });

  it('should update a quote', (done) => {
    chai.request(app);
    agent
      .put(`/index/aaaaaaaaaaaa`)
      .send({
        author: 'George Lucas',
        body: 'something very interesting',
      })
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('author', 'George Lucas');

        // check that quote is actually inserted into database
        Quote.findOne({ author: 'George Lucas' })
          .then((quote) => {
            expect(quote).to.be.an('object');
            done();
          })
          .catch((err) => {
            throw err.message;
          });
      });
  });

  it('should delete a quote', (done) => {
    chai.request(app);
    agent.delete(`/index/aaaaaaaaaaaa`).end((err, res) => {
      if (err) {
        done(err);
      }
      expect(res.body.message).to.equal('deleted quote');

      // check that quote is actually deleted from database
      Quote.findOne({ author: 'George Lucas' }).then((quote) => {
        expect(quote).to.equal(null);
        done();
      });
    });
  });

  after((done) => {
    console.log('went into after!');
    Quote.deleteMany({ author: 'a new author' }).then(() => {
      done();
    });
  });
});
