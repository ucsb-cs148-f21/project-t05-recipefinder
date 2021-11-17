const assert = require('assert');
const expect = require('chai').expect
const request = require('supertest');
const app = require('../db.js')

describe('integration testing the /api', function() {
    it('should return 200 status', function() {
      return request(app)
        .get('/api')
        .then(function(response){
            assert.equal(response.status, 200)
        })
    });

    it('should PASS for one+ ingredients', function() {
      return request(app)
        .get('/api/recipes/?ingredients=water')
        .then(function(response){
            assert.equal(response.status, 200)
        })
    });

});

