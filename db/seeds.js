const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environment');
const User = require('../models/user');
const Festival = require('../models/festival');
const carShare = require('../models/car-share');

mongoose.connect(dbURI);
Festival.collection.drop();
User.collection.drop();
carShare.collection.drop();

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
  headlining: ['Childish Gambino', 'Skepta', 'SZA'],
  photoUrl: 'https://24e8e3b95851cffc9b46-ce987c743c8a722dc56cea7f8eb55a8f.ssl.cf3.rackcdn.com/LBXLogoSimple.svg',
  createdBy: '',
  attendees: [],
  comments: [
    {name: 'max', content: 'love this place go every year!'}
  ]
}, {
  name: 'Citadel Festival',
  startDate: '15th July',
  endDate: '15th July',
  location: 'Gunnersbury Park',
  camping: 'No',
  headlining: ['Tame Impala', 'Leon Bridges', 'Honne'],
  photoUrl: 'https://cdn.shopify.com/s/files/1/0601/5089/files/FB_header_2_1024x1024.jpg',
  createdBy: '',
  attendees: []
},{
  name: 'British Summer Time',
  startDate: '6th July',
  endDate: '15th July',
  location: 'Hyde Park',
  camping: 'No',
  headlining: ['The Cure', 'Paul Simon', 'Bruno Mars'],
  photoUrl: 'https://www.bst-hydepark.com/assets/img/33-29429fc891.jpg',
  createdBy: '',
  attendees: []
}];

const carShareData = [{
  createdBy: '',
  festival: '',
  rideStartTime: '12.00PM',
  estimatedRideEndTime: '3.30PM',
  from: {
    postcode: 'W2 1HQ',
    lat: 51.5167,
    lng: 0.1769
  }
}, {
  createdBy: '',
  festival: '',
  rideStartTime: '11.30AM',
  estimatedRideEndTime: '12.30PM',
  from: {
    postcode: 'W2 1HQ',
    lat: 51.5167,
    lng: 0.1769
  }
}, {
  createdBy: '',
  festival: '',
  rideStartTime: '10.00AM',
  estimatedRideEndTime: '12.30PM',
  from: {
    postcode: 'EC3N 1AH',
    lat: 51.5167,
    lng: 0.1769
  }
}];

User
  .create(userData)
  .then(users => {
    console.log(`Created ${users.length} users.`);
    festivalData[0].createdBy = users[0].id;
    festivalData[1].createdBy = users[0].id;
    festivalData[2].createdBy = users[0].id;
    festivalData[0].attendees.push(users[0].id);
    festivalData[1].attendees.push(users[1].id);
    festivalData[2].attendees.push(users[2].id);
    return Festival.create(festivalData);
  })
  .then(festivals => {
    console.log(`Created ${festivals.length} festivals.`);
    carShareData[0].createdBy = festivals[0].createdBy;
    carShareData[1].createdBy = festivals[1].createdBy;
    carShareData[2].createdBy = festivals[0].createdBy;
    carShareData[0].festival = festivals[1];
    carShareData[1].festival = festivals[0];
    carShareData[2].festival = festivals[1];
    return carShare.create(carShareData);
  })
  .then(console.log(`Created ${carShare.length} carshares`))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
