// CREATE TABLE Hospitals (
//     id SERIAL PRIMARY KEY,
//     name VARCHAR(255) NOT NULL
// );



// -- Inserting predefined list of hospitals
// INSERT INTO Hospitals (name) VALUES
// ('Apollo Hospitals'),
// ('Jawaharlal Nehru Medical College and Hospital'),
// ('Indira Gandhi Institute of Medical Sciences (IGIMS)'),
// ('AIIMS - All India Institute Of Medical Science');

// -- Creating the Patients table
// CREATE TABLE Patients (
//     id SERIAL PRIMARY KEY,
//     name VARCHAR(255) NOT NULL,
//     address VARCHAR(255) NOT NULL CHECK (length(address) >= 10),
//     email VARCHAR(255) NOT NULL UNIQUE,
//     phone VARCHAR(15) NOT NULL CHECK (length(phone) >= 10),
//     password VARCHAR(255) NOT NULL,
//     photo BYTEA NOT NULL,
//     hospital_id INT NOT NULL,
//     FOREIGN KEY (hospital_id) REFERENCES Hospitals (id)
// );

// -- Creating the Psychiatrists table
// CREATE TABLE Psychiatrists (
//     id SERIAL PRIMARY KEY,
//     name VARCHAR(255) NOT NULL,
//     hospital_id INT NOT NULL,
//     FOREIGN KEY (hospital_id) REFERENCES Hospitals (id)
// );







// -- Creating the PsychiatristPatients table
// CREATE TABLE PsychiatristPatients (
//     psychiatrist_id INT NOT NULL,
//     patient_id INT NOT NULL,
//     PRIMARY KEY (psychiatrist_id, patient_id),
//     FOREIGN KEY (psychiatrist_id) REFERENCES Psychiatrists (id),
//     FOREIGN KEY (patient_id) REFERENCES Patients (id)
// );