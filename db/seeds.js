const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environment');
const User = require('../models/user');
const Festival = require('../models/festival');

mongoose.connect(dbURI);
Festival.collection.drop();
User.collection.drop();

const userData = [
  {firstName: 'Ellie', lastName: 'Farrer', userName: 'ellie', email: 'ellie@email.com', mobileNumber: '07770077070', password: 'pass', passwordConfirmation: 'pass'},
  {firstName: 'Curtis', lastName: 'Burns', userName: 'curtis', email: 'curtis@email.com', mobileNumber: '07770077070', password: 'pass', passwordConfirmation: 'pass'},
  {firstName: 'Max', lastName: 'Cramer', userName: 'max', email: 'max@email.com', mobileNumber: '07770077070', password: 'pass', passwordConfirmation: 'pass'}
];


const festivalData = [{
  name: 'LoveBox',
  startDate: '13th July',
  endDate: '14th July',
  location: 'Gunnersbury Park',
  camping: 'No',
  headlining: 'Childish Gambino, Skepta, SZA',
  photoUrl: 'https://24e8e3b95851cffc9b46-ce987c743c8a722dc56cea7f8eb55a8f.ssl.cf3.rackcdn.com/LBXLogoSimple.svg',
  createdBy: 'max'
}, {
  name: 'Citadel Festival',
  startDate: '15th July',
  endDate: '15th July',
  location: 'Gunnersbury Park',
  camping: 'No',
  headlining: 'Tame Impala, Leon Bridges, Honne',
  photoUrl: 'https://e0af4153dabf8f9d6b2b-0afdb671d2fada65aba92528a1f1e10d.ssl.cf3.rackcdn.com/wp-content/uploads/2017/01/Citadel-white.png',
  createdBy: 'max'
},{
  name: 'British Summer Time',
  startDate: '6th July',
  endDate: '15th July',
  location: 'Hyde Park',
  camping: 'No',
  headlining: 'The Cure, Paul Simon, Bruno Mars',
  photoUrl: 'https://www.bst-hydepark.com/assets/img/33-29429fc891.jpg',
  createdBy: 'max'
}];

carShares = [{
  
}]

User
  .create(userData)
  .then(users => {
    console.log(`Created ${users.length} users.`);
    festivalData[0].createdBy = users[0].id;
    festivalData[1].createdBy = users[0].id;
    return Festival.create(festivalData);
  })
  .then(festivals => {
    console.log(`Created ${festivals.length} whiskeys.`);
  })
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
