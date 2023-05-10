require('dotenv').config();
const app = require("./../server");
const chai = require("chai");
const mongoose = require('mongoose');
const chaiHttp = require("chai-http");
chai.config.includeStack = true;
const should = chai.should();
const expect = chai.expect;
const assert = chai.assert;

const Quote = require('../models/quotes.js')

chai.use(chaiHttp);

after((done) => {
  mongoose.models = {}
  mongoose.modelSchemas = {}
  mongoose.connection.close()
  done()
})

describe("API Tests", function() {
  it("TODO: Should test each endpoint of your API");

  /*
  
    beforeEach((done) => {
        // TODO: add any beforeEach code here
        const sampleMessage = new Message({
            title: "message-title",
            body: "The body of the message contains a lot of words",
            author: USER_ID,
            _id: MESSAGE_ID
        })
        
        sampleMessage.save()
        .then(() => {
            done()
        })
    })

    afterEach((done) => {
        // TODO: add any afterEach code here
        Message.deleteMany({ _id: "aaaaaaaaaaaa" })
        //Message.remove({})
        .then(() => {
            done()
        })
    })

    it('should load all messages', (done) => {
        // TODO: Complete this
        chai.request(app)
        .get('/messages')
        .end((err, res) => {
            if (err) { done(err) }
            expect(res).to.have.status(200)
            expect(res.body.messages).to.be.an("array")
            done()
        })
    })

    it('should get one specific message', (done) => {
        // TODO: Complete this
        chai.request(app)
        .get(`/messages/${MESSAGE_ID}`)
        .end((err, res) => {
            if (err) { done(err) }
            expect(res).to.have.status(200)
            expect(res.body.message).to.be.an('object')
            expect(res.body.message.title).to.equal('message-title')
            expect(res.body.message.body).to.equal('The body of the message contains a lot of words')
            done()
        })
    })

    it('should post a new message', (done) => {
        const sampleUser = new User({
            username: 'myuser',
            password: 'mypassword',
            _id: USER_ID
        })
        sampleUser.save()

        // TODO: Complete this
        chai.request(app)
        .post('/messages')
        .send({title: 'a-new-message', body: 'A new message that has a lot of words', author: USER_ID})
        .end((err, res) => {
            if (err) { done(err) }
            expect(res.body).to.be.an('object')

            // check that message is actually inserted into database
            Message.findOne({title: 'a-new-message'}).then(message => {
                expect(message).to.be.an('object')
                done()
            })
        })
        User.deleteMany({ username: ['myuser'] })
    })

    it('should update a message', (done) => {
        // TODO: Complete this
        chai.request(app)
        .put(`/messages/${MESSAGE_ID}`)
        .send({title: 'new-title'})
        .end((err, res) => {
            if (err) { done(err) }
            expect(res.body.message).to.be.an('object')
            expect(res.body.message).to.have.property('title', 'new-title')

            // check that message is actually inserted into database
            Message.findOne({title: 'new-title'})
            .then(message => {
                expect(message).to.be.an('object')
                done()
            }).catch(err => {
                throw err.message
            })
        })
    })

    it('should delete a message', (done) => {
        // TODO: Complete this
        chai.request(app)
        .delete(`/messages/${MESSAGE_ID}`)
        .end((err, res) => {
            if (err) { done(err) }
            expect(res.body.message).to.equal('Successfully deleted.')
            expect(res.body._id).to.equal(MESSAGE_ID)

            // check that message is actually deleted from database
            Message.findOne({title: 'message-title'}).then(message => {
                expect(message).to.equal(null)
                done()
            })
        })
    })
  
  */
});
