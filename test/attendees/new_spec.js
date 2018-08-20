/* global api, beforeEach, describe, expect, it, xit */

const { secret } = require('../../config/environment');
const jwt = require('jsonwebtoken');


const User = require('../../models/user');
const userData =
  {firstName: 'Ellie', lastName: 'Farrer', userName: 'ellie', email: 'ellie@email.com', mobileNumber: '07770077070', password: 'pass', passwordConfirmation: 'pass'};

const Festival = require('../../models/festival');
const festivalData =
{name: 'LoveBox', startDate: '13th July', endDate: '14th July', location: 'Gunnersbury Park', camping: 'No', headlining: ['Childish Gambino', 'Skepta', 'SZA'], attendees: ['test', 'testagain'], photoUrl: 'https://24e8e3b95851cffc9b46-ce987c743c8a722dc56cea7f8eb55a8f.ssl.cf3.rackcdn.com/LBXLogoSimple.svg'};

describe('POST /attendees', () => {

});
