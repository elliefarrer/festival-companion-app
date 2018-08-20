/* global describe it expect api beforeEach*/

const User = require('../../models/user');
const { secret } = require('../../config/environment');
const jwt = require('jsonwebtoken');
let token;
let friendId;

const userData = [
  {firstName: 'Ellie', lastName: 'Farrer', userName: 'ellie', email: 'ellie@email.com', mobileNumber: '07770077070', password: 'pass', passwordConfirmation: 'pass'},
  {firstName: 'Curtis', lastName: 'Burns', userName: 'curtis', email: 'curtis@email.com', mobileNumber: '07770077070', password: 'pass', passwordConfirmation: 'pass'},
  {firstName: 'Max', lastName: 'Cramer', userName: 'max', email: 'max@email.com', mobileNumber: '07770077070', password: 'pass', passwordConfirmation: 'pass'}
];

// Describe('GET /passenger', () => {
//   beforeEach(done => {
//     User.remove({})
//       .then(() => User.create(userData))
//       .then(users => {
//         const loggedIn = users.filter(chosenUser => {
//           chosenUser.userName === 'ellie';
//           token = jwt.sign({ sub: loggedIn.id }, secret, {expiresIn: '1hr'});
//         });
//         const tobeFriended = users.filter(chosenFriend => {
//           chosenFriend.userName === 'curtis';
//         });
//       });
//   });
//   it('should ')
//
//   //need to finish
//
// });
