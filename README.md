# General Assembly WDI Project 3: Festinate (Group Project)

[Heroku](https://festinate.herokuapp.com/)

[GitHub Repo](https://github.com/platypotomus/festival-companion-app)

## Brief
Your instructors will partner you with other classmates to design and collaboratively build a MEAN stack app of your own design.

Your app must:
* Use Mongo, Node & Express to build a server-side API
* Your API must have at least 2 related models, one of which should be a user
* Your API should include all RESTFUL actions for at least one of those models
* Include authentication to restrict access to appropriate users
* Include at least one referenced or embedded sub-document, however don't go crazy! You need to manage your time effectively...
* Include automated tests for at least one resource
* Use Angular to build a front-end that consumes your API
* Use SCSS instead of CSS
* Use Webpack & Yarn to manage your dependencies and compile your source code


## App Description
Festinate is a festival companion app, designed for mobile first. Users have access to a variety of features, such as adding festivals, adding and deleting other users as friends, and creating and managing car shares. It also features external APIs to offer useful, up-to-date information about the festival.


## Technologies Used
* HTML5
* SCSS
* JavaScript(ECMAScript 6)
* Node.js
* angular: v1.7.3
* @uirouter/angularjs: v1.0.20
* bulma: v0.7.1
* moment: v2.22.2
* satellizer: v0.15.5
* MongoDB
* bcrypt: v3.0.0
* bluebird: v3.5.1
* body-parser: v1.18.3
* express: v4.16.3
* jsonwebtoken: v8.3.0
* mongoose: v5.2.8
* morgan: v1.9.0
* request-promise: v4.2.2
* chai: v4.1.2
* mocha: v5.2.0
* nyc: v12.0.2
* supertest: v3.1.0
* Git
* GitHub
* Heroku
* Trello
* Sketch
* Marvel
* Google Fonts
* Fontawesome

## APIs Used
* Dark Skies
* Filestack
* Mapquest
* Nominatim


## Approach Taken

### Wireframes
We began wireframing on Sketch, using a Sketch template as a guide. We then moved to [Marvel](https://marvelapp.com/428e1e4/screen/46835471) to link the pages up.

#### Login
![Login Wireframe](./wireframes/login.png)

#### Festivals Index
![Festivals Index Wireframe](./wireframes/festivals-index.png)

#### Festivals Show
![Festivals Show Wireframe](./wireframes/festival-show.png)

##### Car Shares Index
![Car Shares Index Wireframe](./wireframes/car-shares-index.png)

##### Profile Page
![Profile Page Wireframe](./wireframes/profile-page.png)


### Functionality
We started out by building and testing the back end, before building the front end and styling. Everyone in the group worked on a part of each section.

We started out by getting the basic RESTful routes working (users, festivals, and car shares) before moving onto extras such as friend and passenger requests, which took longer.

APIs came a little later, which, apart from Filestack, were handled by me. We did have a list of other APIs we wanted to include, which are potential future features.


### Styling
We chose a neutral black and dark purple for our colour scheme. We used three Google fonts: Oxygen for all the text apart from the app name on the login page, for which we used Orbitron and Shrikhand.

Since most people would use this app on mobile, perhaps even whilst at a festival, we designed for mobile first. So we used Bulma to take advantage of its cross-device capabilities. At the time of delivery, Festinate was optimised for iPhone 8 (and other phones of similar screen sizes,) and was not styled so well for larger or smaller screens. However, this is something to change in the future.


### Finished Product

#### Welcome/Login
![Login](./screenshots/login.png)

#### Festival Index
![Festivals Index](./screenshots/festivals-index.png)

#### Festival Show
![Festival Show](./screenshots/festivals-show.png)
![Festival Show](./screenshots/festivals-show2.png)

#### Car Share Index
![Car Shares Index](./screenshots/car-shares-index.png)

#### User Index
![User Index](./screenshots/find-friends.png)

#### Profile Page
![Profile Page](./screenshots/profile-page.png)

## Wins and Blockers
As a team, I would say the styling was a huge win. We were really pleased with the design, both of small components, and the bigger picture. Our biggest blocker was probably getting friend requests, passenger requests, and attendees working on both the front end and the back end. I think it would have been good to start these more difficult elements earlier than we did.

In terms of the elements I built, the biggest win was working with the APIs, in particular MapQuest, which I had never used prior to starting this project. It was harder to get to grips with than Leaflet, which I had used before. But we loved MapQuest's tiles and markers so I persisted. I looked at getting a road map on the car share show page with MapQuest's direction endpoint, instead of the straight line. I could see how I could do it in a rough way, but it didn't come together, so this is something I would like to add as a future feature.

My biggest blocker was probably testing. The main difficulty was when tests broke, it was hard to know whether that was because the code was wrong, or because the tests weren't written properly.


## Future Features
Among the APIs we would like to add in the future are Twilio to send SMS messages about car shares, and TfL and Transport API to incorporate public transport timetables and service updates. The latter especially is something I would like to focus on next.

We would also like to allow the festival organisers to place points on the site map to show where the stage, toilets, entrances and exits etc were. Then the user could mark the location of their tent, and navigate around the festival site easier.
