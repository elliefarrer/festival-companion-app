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
  {firstName: 'Ellie', lastName: 'Farrer', userName: 'ellie', email: 'ellie@email.com', mobileNumber: '07770077070', password: 'pass', passwordConfirmation: 'pass', image: 'https://i.imgur.com/cgUj7q6.png'},
  {firstName: 'Curtis', lastName: 'Burns', userName: 'curtis', email: 'curtis@email.com', mobileNumber: '07770077070', password: 'pass', passwordConfirmation: 'pass', image: 'https://i.imgur.com/dudZjsL.jpg'},
  {firstName: 'Max', lastName: 'Cramer', userName: 'max', email: 'max@email.com', currentLocation: 'W11 4PE', mobileNumber: '07770077070', password: 'pass', passwordConfirmation: 'pass', image: 'https://media.licdn.com/dms/image/C4D03AQFvQx1ZhFlX7Q/profile-displayphoto-shrink_200_200/0?e=1540425600&v=beta&t=7RkDFoQXRITS0S9A21Urami1OgIRXf3or8plFOthJTQ'},
  {firstName: 'Ben', lastName: 'User', userName: 'ben', email: 'ben@email.com', mobileNumber: '07770077070', password: 'pass', passwordConfirmation: 'pass', image: 'https://i.imgur.com/F2stGoH.png'},
  {firstName: 'Sam', lastName: 'User', userName: 'sam', email: 'sam@email.com', mobileNumber: '07770077070', password: 'pass', passwordConfirmation: 'pass', image: 'https://i.imgur.com/qUpD4GT.png'},
  {firstName: 'Molly', lastName: 'User', userName: 'molly', email: 'molly@email.com', mobileNumber: '07770077070', password: 'pass', passwordConfirmation: 'pass', image: 'https://i.imgur.com/Bp9yrkl.png'},
  {firstName: 'Jasmine', lastName: 'User', userName: 'jasmine', email: 'jasmine@email.com', mobileNumber: '07770077070', password: 'pass', passwordConfirmation: 'pass', image: 'https://i.imgur.com/dsKzIzc.png'}
];


const festivalData = [
  {
    name: 'LoveBox',
    startDate: '2018-07-13',
    endDate: '2018-07-14',
    location: {
      address: 'Gunnersbury Park',
      postcode: 'W5 4NX'
    },
    camping: 'No',
    headlining: ['Childish Gambino', 'Skepta', 'SZA'],
    photoUrl: 'https://www.ticketbooth.eu/wp-content/uploads/2018/04/lovebox.jpg',
    createdBy: '',
    attendees: [],
    comments: [
      {name: 'max', content: 'love this place go every year!'}
    ],
    socialMedia: {
      youtube: 'https://www.youtube.com/user/LoveboxTV',
      instagram: 'https://www.instagram.com/loveboxfestival/',
      twitter: 'https://twitter.com/loveboxfestival',
      facebook: 'https://www.facebook.com/loveboxfestival'
    }
  },
  {
    name: 'Citadel Festival',
    startDate: '2018-07-15',
    endDate: '2018-07-15',
    location: {
      address: 'Gunnersbury Park',
      postcode: 'W5 4NX'
    },
    camping: 'No',
    headlining: ['Tame Impala', 'Leon Bridges', 'Honne'],
    photoUrl: 'https://cdn.shopify.com/s/files/1/0601/5089/files/FB_header_2_1024x1024.jpg',
    createdBy: '',
    attendees: [],
    socialMedia: {
      instagram: 'https://www.instagram.com/citadelfestival/',
      twitter: 'https://twitter.com/CitadelFestival',
      facebook: 'https://www.facebook.com/CitadelFestival/'
    }
  },
  {
    name: 'British Summer Time',
    startDate: '2018-07-06',
    endDate: '2018-07-15',
    location: {
      address: 'Hyde Park',
      postcode: 'W2 2LG'
    },
    camping: 'No',
    headlining: ['The Cure', 'Paul Simon', 'Bruno Mars'],
    photoUrl: 'http://www.bst-hydepark.com/assets/img/BSTRW_900x560-f1dcd9adc1.jpg',
    createdBy: '',
    attendees: [],
    socialMedia: {
      instagram: 'https://www.instagram.com/bsthydepark/',
      twitter: 'https://twitter.com/BSTHydePark',
      facebook: 'https://www.facebook.com/BSTHydePark'
    }
  },
  {
    name: 'Reading Festival',
    startDate: '2018-08-24',
    endDate: '2018-08-26',
    location: {
      address: 'Richfield Avenue',
      postcode: 'RG1 8EQ'
    },
    camping: 'Yes',
    headlining: ['Fall Out Boy', 'Kendrick Lemar', 'Kings of Leon'],
    photoUrl: 'https://www.readingfestival.com/wp-content/uploads/2018/02/reading-og-master-image.jpg',
    createdBy: '',
    attendees: [],
    socialMedia: {
      youtube: 'https://www.youtube.com/user/Readingfestival1',
      instagram: 'https://www.instagram.com/officialrandl/',
      twitter: 'https://twitter.com/OfficialRandL',
      facebook: 'https://www.facebook.com/OfficialReadingFestival'
    }
  },
  {
    name: 'Wireless Festival',
    startDate: '2018-07-06',
    endDate: '2018-07-08',
    location: {
      address: 'Finsbury Park',
      postcode: 'N4 2AP'
    },
    camping: 'No',
    headlining: ['J. Cole', 'Stormzy', 'DJ Khaled'],
    photoUrl: 'https://blog.ticketmaster.co.uk/wp-content/uploads/2018/01/Wireless-18_3880_TM_738x415.jpg',
    createdBy: '',
    attendees: [],
    socialMedia: {
      instagram: 'https://www.instagram.com/wirelessfest/',
      twitter: 'https://twitter.com/wirelessfest',
      facebook: 'https://www.facebook.com/WirelessFestival'
    }
  },
  {
    name: 'Creamfields',
    startDate: '2018-08-23',
    endDate: '2018-08-26',
    location: {
      address: 'Daresbury',
      postcode: 'WA4 4AG'
    },
    camping: 'Yes',
    headlining: ['Chase and Status', 'Major Lazer', 'Tiësto'],
    photoUrl: 'https://www.creamfields.com/wp-content/uploads/2018/02/CFSocial2018.jpg',
    createdBy: '',
    attendees: [],
    socialMedia: {
      youtube: 'https://www.youtube.com/user/creamfields',
      instagram: 'https://www.instagram.com/creamfieldsofficial/',
      twitter: 'https://twitter.com/creamfields',
      facebook: 'https://www.facebook.com/OfficialCreamfields'
    }
  }
];

const carShareData = [
  {
    createdBy: 'curtis', // doesn't work
    festival: '', // LoveBox
    rideStartTime: '12.00PM',
    estimatedRideEndTime: '3.30PM',
    from: {
      postcode: 'LU1 2LT'
      // lat: 51.5167,
      // lng: 0.1769
    }
  },
  {
    createdBy: 'max',
    festival: '', // BST
    rideStartTime: '11.30AM',
    estimatedRideEndTime: '12.30PM',
    from: {
      postcode: 'MK9 3NZ'
      // lat: 51.5167,
      // lng: 0.1769
    }
  },
  {
    createdBy: 'molly',
    festival: '', // Citadel
    rideStartTime: '10.00AM',
    estimatedRideEndTime: '12.30PM',
    from: {
      postcode: 'HP5 1SP'
      // lat: 51.5167,
      // lng: 0.1769
    }
  },
  {
    createdBy: 'ellie',
    festival: '', // Reading
    rideStartTime: '10.00AM',
    estimatedRideEndTime: '12.30PM',
    from: {
      postcode: 'W2 1HQ'
      // lat: 51.5167,
      // lng: 0.1769
    }
  },
  {
    createdBy: 'molly',
    festival: '', // Reading
    rideStartTime: '10.00AM',
    estimatedRideEndTime: '12.30PM',
    from: {
      postcode: 'HP5 1SP'
      // lat: 51.5167,
      // lng: 0.1769
    }
  },
  {
    createdBy: 'ben',
    festival: '', // Wireless
    rideStartTime: '10.00AM',
    estimatedRideEndTime: '12.30PM',
    from: {
      postcode: 'CO4 3EQ'
      // lat: 51.5167,
      // lng: 0.1769
    }
  },
  {
    createdBy: 'jasmine',
    festival: '', // Creamfields
    rideStartTime: '10.00AM',
    estimatedRideEndTime: '12.30PM',
    from: {
      postcode: 'E3 2AX'
      // lat: 51.5167,
      // lng: 0.1769
    }
  },
  {
    createdBy: 'sam',
    festival: '', // Creamfields
    rideStartTime: '10.00AM',
    estimatedRideEndTime: '12.30PM',
    from: {
      postcode: 'M13 9PL'
      // lat: 51.5167,
      // lng: 0.1769
    }
  }
];

User
  .create(userData)
  .then(users => {
    // console.log(`Created ${users.length} users.`);
    festivalData[0].createdBy = users[0].id;
    festivalData[1].createdBy = users[0].id;
    festivalData[2].createdBy = users[0].id;
    festivalData[3].createdBy = users[0].id;
    festivalData[4].createdBy = users[0].id;
    festivalData[5].createdBy = users[0].id;

    return Festival.create(festivalData);
  })
  .then(festivals => {
    // console.log(`Created ${festivals.length} festivals.`);
    carShareData[0].createdBy = festivals[0].createdBy;
    carShareData[1].createdBy = festivals[1].createdBy;
    carShareData[2].createdBy = festivals[2].createdBy;
    carShareData[3].createdBy = festivals[3].createdBy;
    carShareData[4].createdBy = festivals[3].createdBy;
    carShareData[5].createdBy = festivals[4].createdBy;
    carShareData[6].createdBy = festivals[5].createdBy;
    carShareData[7].createdBy = festivals[5].createdBy;
    carShareData[0].festival = festivals[0];
    carShareData[1].festival = festivals[1];
    carShareData[2].festival = festivals[2];
    carShareData[3].festival = festivals[3];
    carShareData[4].festival = festivals[3];
    carShareData[5].festival = festivals[4];
    carShareData[6].festival = festivals[5];
    carShareData[7].festival = festivals[5];
    return carShare.create(carShareData);
  })
  // .then(console.log(`Created ${carShare.length} carshares`))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
