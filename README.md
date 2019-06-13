# Pratilipi Assignment

#### Problem Statement
(Fullstack Developer challenge)

The task in to Implement a server where users can login using a username and password.

After logging in, the user should be able to view his profile with following details :
  a) Name
  b) Image
  c) Job Role,
  d) Company Name(Clickable. Clicking on this should take you to the company details page)

Company Details page should have the following details :
  a) Company Name
  b) Logo
  c) Address
  d) Unique users currently viewing this company page
  e) Total views for this company page

## Solution

##### Cold Start Data
Website name : Information Center
The user logins with the credentials(here there is no sign-in,as the question tests our login implementations). Presently there are only two users:

| Username      | Password      |
| ------------- |:-------------:|
| ankur         | ankur         |
| ankurharna    | ankurharna    |

There are presently 4 companies: Pratilipi, Oyo, Paytm, Uber

##### Process flow

The website opens with the login page with '/' url. Any other route manually added is thrown error.
Upon successful login, the user is taken to the "User Details" page. Where he can see his details like photo, name, age, job profile and company.
The company is a clickable link where upon clicking takes him to the Company Details page. It has details like: name, logo, info, total page views(unique)(can be made general with 1 line code change), live page views(unique).
From the company details page the user can close the browser or go back to "user details" page.
The credentials are stored locally.So upon re-opening the username and the password is not required to be re-entered.
However the logout feature is implemented in the backend, but is not present in the frontend. A button and API call can enable this feature.

##### Installation


```bash
npm install
```

Local Development

```bash
./run_local.sh
```

Production Deployment

```bash
./deploy_production.sh
```


##### Stacks Used
* NodeJs  (pure form, no extra helper modules used)
* ReactJs (pure form, no extra helper modules used)
* Cron-jobs
* No-SQL DB (Firebase)
* Redis
* Github (for version controlling)

No boiler plates were used, everything built from scratch.
<br>


### Technical Approach
----------------------
The following problems are solved as follows:
* **Live Page counter** : Since the page access was done by the logged in users. User Id was used here. So a set data structure was used for each company name in the redis.<br>
Sockets were users to have instant two-way data communication. corner cases like: to decrement the live count value when the user abruptly closes the browser, is taken care of.

* **Total Page counter** : When a user visits the company page an entry with the timestamp(for future use, if required) is kept. A cron job then runs every 2min which reads all the entires of the visited entires and then updates the page_view field in the company details node.
* **Data Keeping** :  The information (both user and company) is saved in the DB. At no point in the website the information s edited as it is an information giving website not information editing/taking website. Also the company and user details like name etc generally remains the same.

##### Code Structure
The website has two **ejs pages** (login and main) having two seperate react bundles build at the path *app/dist/public*. **Express** is uses to serve server side rendering and authentication and API integration.<br/>
The frontend asks the API to the controller, the **controllers** serve the API from the result of the services. **Services** are independent modules used to perform heavy tasks.<br/>
The authorisation is handled by **passport** as the middleware for express routes.<br/>
The client side code (ReactJs) is in *app/src* path.<br/>
The Server Side code is in the rest directory.<br/>
There is a singleton instance of the **socket** ensuring that only one connection per client is being established. The instance is in *app/src/helper*. <br/>


##### DB structure
![Go to Screenshots folder](https://github.com/ankur17/information-center/tree/master/Screenshots/DB_Structure.png "DB structure")


##### Scalability and Adaptability

In redis the set data structure takes O(1) or constant time in adding/deleting member, so it is fast and scalable. Also redis can store around 4billion values in each key-set. So the scalability of the live count is completely manageable.<br>

The firebase DB is correctly *De-Normalised* making it highly scalable. <br>

The approach for evaluating total page count do not require immediate calculation. Thus at the time of high traffic, DB computation for each user will not be incurred. And for the smaller users, the change of counts within 2min min will not be of much noticeable amount. However, there are other approaches that can be taken, but presently is most suited one.


##### Time management

* The Assignment took 7.5hrs to complete. It includes all the research work, code structuring, DB and github setup.
* The project was started from the empty folder.
* I started the project at 5:00PM and completed till 12:30AM(next day), which is entirely within the allotted time to 7-8hrs.
* However the assignment report is not included in the 7.5hrs. The report and the screenshots is being done at 11:00AM of the day 2.



### Conclusion
----------------------
* I was able to complete all the tasks mentioned in the question.
* I successfully build the frontend the back-end of the project.
* I included the deplyment and development scripts for the project.

