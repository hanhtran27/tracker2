var chai = require('chai');
var chaiHttp = require('chai-http');
var async = require('async');
var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();
var http = require('http');
chai.use(chaiHttp);

//GET A GOAL BY GOAL ID
describe('/goal/:id test to get a goal by Id', () => {
    it('return a goal object by goalId', (done) => {
        let goalId = '5cfd3e4df4c314b14b3c923f';
        chai.request("https://goaltracker-v2.azurewebsites.net")
            .get('/goal/' + goalId)
            .end((err, res) => {
                expect(err).to.be.null;
                res.should.have.status(200);
                res.body.should.be.a('object');
                expect(res.body).to.have.property('goalName');
                expect(res.body).to.have.property('tag');
                expect(res.body).to.have.property('goalNumber');
                expect(res.body).to.have.property('goalUnit');
                expect(res.body).to.have.property('startDate');
                expect(res.body).to.have.property('dueDate');
                expect(res.body).to.have.property('_id');
                expect(res.body).to.have.property('_id').eql(goalId);
                expect(res.body).to.have.property('goalName').that.is.a('string');
                expect(res.body).to.have.property('tag').that.is.a('string');
                expect(res.body).to.have.property('goalNumber').that.is.a('Number');
                expect(res.body).to.have.property('goalUnit').that.is.a("string");

                done();
            });
    });
});

//GET LIST OF GOALS
describe('/GET Test for list of goal', function () {
    var response;

    before(function (done) {
        // chai.request("http://localhost:8080")
        chai.request("https://goaltracker-v2.azurewebsites.net")
            .get("/goals")
            .end(function (err, res) {
                // result = res.body;
                response = res;
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });

    it('Elements in array have the right properties', function () {
        expect(response.body).to.not.be.a.string;
        expect(response.body).to.satisfy(
            function (body) {
                for (var i = 0; i < body.length; i++) {
                    expect(body[i]).to.have.property('goalName');
                    expect(body[i]).to.have.property('tag');
                    expect(body[i]).to.have.property('goalNumber');
                    expect(body[i]).to.have.property('goalUnit');
                    expect(body[i]).to.have.property('startDate');
                    expect(body[i]).to.have.property('dueDate');
                    expect(body[i]).to.have.property('_id');
                    expect(body[i]).to.have.property('goalName').that.is.a('string');
                    expect(body[i]).to.have.property('tag').that.is.a('string');
                    expect(body[i]).to.have.property('goalNumber').that.is.a('Number');
                    expect(body[i]).to.have.property('goalUnit').that.is.a("string");
                }
                return true;
            });
    });

    it('return an array with more than one object', function () {
        expect(response.body).to.have.length.above(1);
        response.body.should.be.a('array');
        expect(response).to.have.status(200);

    });

});

describe('/POST Test for a single goal', function () {

    it('it should post a goal', function (done) {
        var goal = {
            userId: "5cf88c68cf728f3eaf1d1479",
            goalName: "eat breakfast",
            tag: "health",
            goalNumber: 7,
            goalUnit: "meals",
            startDate: "2019-06-05",
            dueDate: "2019-06-11"
        }
        chai.request("https://goaltracker-v2.azurewebsites.net")
        .post("/goal")
        .send(goal)
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.not.be.a.string;
            res.body.should.be.a('object');
            res.body.should.have.property('goalName').eql('eat breakfast');
            res.body.should.have.property('userId');
            res.body.should.have.property('tag');
            res.body.should.have.property('goalNumber');
            res.body.should.have.property('goalUnit');
            res.body.should.have.property('startDate');
            res.body.should.have.property('dueDate');
            done();
        });
    });

});

// describe('/POST Test for a record', function () {

//     it('it should post a record', function (done) {
//         var record = {
//             // your goalId in mongodb
//             goalId: "5cf88c68cf728f3eaf1d147c",
//             finishedUnits: 10,
//             finishedDate: "2019-06-05",
//         }
//         chai.request("http://localhost:8080")
//         .post("/record")
//         .send(record)
//         .end(function (err, res) {
//             expect(err).to.be.null;
//             expect(res).to.have.status(200);
//             expect(res.body).to.not.be.a.string;
//             res.body.should.be.a('object');
//             res.body.should.have.property('goalId').eql('5cf88c68cf728f3eaf1d147c');
//             res.body.should.have.property('finishedUnits');
//             res.body.should.have.property('finishedDate');
//             done();
//         });
//     });

// });