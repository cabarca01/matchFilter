const request = require('supertest');
const {app} = require('./../../server/server');

describe('server/server', ()=> {
    test('Should resolve correctly a call to /', (done) => {
        request(app)
            .get('/')
            .send()
            .expect(200)
            .end(done);
    });

    test('Should resolve correctly a call to /filter', (done) => {
        let filter = {
            hasPhoto: false,
            inContact: false,
            isFavourite: false,
            minCompatibilityScore: 0.01,
            maxCompatibilityScore: 0.99,
            minAge: 18,
            maxAge: 99,
            minHeight: 120,
            maxHeight: 210,
            distance: 30,
            city: {
                latitude: 51.509865,
                longitude: -0.118092
            }
        };
        request(app)
            .post('/filter')
            .send(filter)
            .expect(200)
            .end((err, res) => {
                if(err) {
                    return done(err);
                }
                let response = JSON.parse(res.text);
                expect(response.matchList).not.toBeUndefined();
                return done();
            });
    })
});