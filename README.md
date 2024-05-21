# HOSPITAL BACKEND (PERN Stack)


## Features

- **Create**: Add new Patients AND Psychiatrists  records with relevant details.
- **Read**: View existing Hospitals records with their information.

## Technologies Used

- **PostgreSQL**: SQL database for storing Hospital information.
- **Express.js**: Backend framework for handling HTTP requests and routing.
- **Node.js**: JavaScript runtime environment for server-side development.

## Installation

To run the Hospital backend on your local machine, follow these steps:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/Nikhilkajota03/hospital_psql.git  
   ```

2. Navigate to the project directory:

   ```bash
   cd server
   ```

3. Install server-side dependencies:

   ```bash
   cd server
   npm install
   ```

4. Run all the queries on psql terminal which is  written in database.sql:
    

5. Start the backend server:

   ```bash
   cd ../server
   nodemon app.js
   ```


## APIs

Description of all the apis used in the project : https://documenter.getpostman.com/view/29139183/2sA3QniEHk

Postman collection access json data  : https://drive.google.com/file/d/1FhqWYvmHg04BA5Ye4TEZh2LjzaQV6etG/view?usp=sharing




1. Api For getting all the data related to the hospitals:

   ```bash
   GET    http://localhost:3007/api/v1/students/hospitalDetail  
   ```

2. Api For Posting the details related to Patients :

   ```bash
   POST   http://localhost:3007/api/v1/students/addpatient  
   ```

3. Api For Posting the details related to Psychiatrist :

   ```bash
   POST   http://localhost:3007/api/v1/students/psychiatrists
   ```     








