# capstoneFYND-himanshu

## CourseApp

### Hosted Website Live Link - https://courseapp-eahp.netlify.app/
### Hosted Backend Api Link - https://capstonefynd-himanshu-production.up.railway.app/
### Front End Directory - courseApp
### Back End Directory - courseApp-server

### Tech Stack

#### Front-end Tech - HTML , CSS, JavaScript, VueJS 
#### Back-end Tech - Node js , Express js Framework
#### Database - MongoDb (hosted On MongoDb Atlas)

### Specifications:-
1. Used vuex for state management.
2. Authentication/Authorization using JSON Web Token. 
3. Backend API functions are not accessible without appropriate roles(stored in token).
4. Validation checks and Availability checks at registration and course creation.
5. Responsive UI: designed with consideration for smaller width devices.
6. Auto login on reload using a token stored in the local storage.
7. Loading screen implementation for smooth user experience.
8. Password encryption using bcrypt library.

### User Story:-
1. New Users can view course previews from the homepage. 
2. They can then register/login to access the courses. 
3. Once logged in they can enroll and progress through the courses. 
4. If they have any doubt then they can ask questions.
5. Once all the sections of the course is complete they can view their certificate from MyProfile page.
6. They can view their asked questions from MyQuestions page.

- Tutors once logged in are able to answer question from their assigned courses.
- Admin ance logged in and verified are able to create courses for users to view and assign tutors.



