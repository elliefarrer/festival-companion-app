/* global describe, it, api, expect, beforeEach */

const Festival = require('../../models/festival');
const festivalData = [{
  name: 'LoveBox',
  startDate: '13th July',
  endDate: '14th July',
  location: 'Gunnersbury Park',
  camping: 'No',
  headlining: ['Childish Gambino', 'Skepta', 'SZA'],
  photoUrl: 'https://24e8e3b95851cffc9b46-ce987c743c8a722dc56cea7f8eb55a8f.ssl.cf3.rackcdn.com/LBXLogoSimple.svg'
}, {
  name: 'Citadel Festival',
  startDate: '15th July',
  endDate: '15th July',
  location: 'Gunnersbury Park',
  camping: 'No',
  headlining: ['Tame Impala', 'Leon Bridges', 'Honne'],
  photoUrl: 'https://e0af4153dabf8f9d6b2b-0afdb671d2fada65aba92528a1f1e10d.ssl.cf3.rackcdn.com/wp-content/uploads/2017/01/Citadel-white.png'
},{
  name: 'British Summer Time',
  startDate: '6th July',
  endDate: '15th July',
  location: 'Hyde Park',
  camping: 'No',
  headlining: ['The Cure', 'Paul Simon', 'Bruno Mars'],
  photoUrl: 'https://www.bst-hydepark.com/assets/img/33-29429fc891.jpg'
}];

describe('GET /festivals', () => { // Test the index route
  // Mocha test lifecycle hooks
  beforeEach(done => {
    // Run this before every test in this 'discribe' block
    Festival.remove({}) // Remove ALL the whiskeys
      .then(() => Festival.create(festivalData))
      .then(() => done());
  });

  // Mocha tests
  it('should return a 200 response', done => { // like 'next' in express. Call this when we're done!
    api.get('/api/festivals')
      .end((err, res) => {
        // Now use chai's 'expect'
        expect(res.status).to.equal(200);
        done(); // tells mocha the test has finshed
      });
  });

  it('should return an array', done => {
    api.get('/api/festivals')
      .end((err, res) => {
        expect(res.body).to.be.an('array');
        done(); // tells mocha the test has finished
      });
  });

  it('should return an array of the correct length', done => {
    api.get('/api/festivals')
      .end((err, res) => {
        expect(res.body.length).to.eq(festivalData.length);  // expecting body length (the array) to equal 5
        done(); // tells mocha the test has finished
      });
  });

  it('should return an array of objects', done => {
    api.get('/api/festivals')
      .end((err, res) => {
        console.log('The festivals are', res.body);
        res.body.forEach(festival => expect(festival).to.be.an('object'));
        done(); // tells mocha the test has finished
      });
  });

  it('should return the correct data', done => {
    api.get('/api/festivals') // fetching DATA
      .end((err, res) => {
        res.body.forEach((festival) => {
          // Get the right data from whiskey array
          const dataFestival = festivalData.filter(w => w.name === festival.name)[0]; // finding the write name, must be 0'd
          expect(festival.name).to.eq(dataFestival.name);  // compare to whiskey found to check for right name
          expect(festival.location).to.eq(dataFestival.location);
          expect(festival.photoUrl).to.eq(dataFestival.photoUrl);
        });
      });
    done(); // tells mocha the test has finished
  });
});
