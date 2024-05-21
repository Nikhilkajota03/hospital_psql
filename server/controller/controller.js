// controller.js
import pool from "../db.js";



export const addpSychiatrists = async (req, res) => {
  const { name, hospital_id } = req.body;

  if (!name || !hospital_id) {
    return res.status(400).json({ error: 'Missing required fields: name and hospital_id' });
  }

  try {
    const result = await pool.query("INSERT INTO Psychiatrists (name, hospital_id) VALUES ($1, $2) RETURNING *", [name, hospital_id]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
};

export const fetchHospitalDetails = async (req, res) => {
  const { hospital_id } = req.body;

  try {
    const hospitalQuery = "SELECT name FROM Hospitals WHERE id = $1";
    const hospitalResult = await pool.query(hospitalQuery, [hospital_id]);

    if (hospitalResult.rows.length === 0) {
      return res.status(404).send("Hospital not found.");
    }

    const hospitalName = hospitalResult.rows[0].name;

    const psychiatristsQuery = `
  SELECT
    p.id,
    p.name,
    COUNT(pp.patient_id) as patients_count
  FROM
    Psychiatrists p
  LEFT JOIN
    PsychiatristPatients pp ON p.id = pp.psychiatrist_id
  LEFT JOIN
    Patients pt ON pp.patient_id = pt.id
  WHERE
    p.hospital_id = $1
  GROUP BY
    p.id, p.name;
`;
    const patientsQuery = `
        SELECT COUNT(*) as total_patients
        FROM Patients
        WHERE hospital_id = $1;
      `;

    const totalPsychiatristsQuery = `
        SELECT COUNT(*) as total_psychiatrists
        FROM Psychiatrists
        WHERE hospital_id = $1;
      `;

    const [psychiatristsResult, patientsResult, totalPsychiatristsResult] =
      await Promise.all([
        pool.query(psychiatristsQuery, [hospital_id]),
        pool.query(patientsQuery, [hospital_id]),
        pool.query(totalPsychiatristsQuery, [hospital_id]),
      ]);

    const totalPatients = patientsResult.rows[0].total_patients;
    const totalPsychiatrists =
      totalPsychiatristsResult.rows[0].total_psychiatrists;

    res.status(200).json({
      hospital_name: hospitalName,
      total_psychiatrist_count: totalPsychiatrists,
      total_patients_count: totalPatients,
      psychiatrist_details: psychiatristsResult.rows,
    });
  } catch (error) {
    res.status(500).send("Error fetching hospital details.");
  }
};

export const patient = async (req, res) => {
    const { name, address, email, phone, password, photo, hospital_id, psychiatrist_id } = req.body;
  
    if (!name || !address || !email || !phone || !password || !photo || !hospital_id || !psychiatrist_id) {
      return res.status(400).send("All fields are required.");
    }
  
    if (address.length < 10) {
      return res.status(400).send("Address should be at least 10 characters.");
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send("Invalid email address.");
    }
  
    if (phone.length < 10) {
      return res.status(400).send("Phone number should be at least 10 characters.");
    }
  
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,15}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).send("Password must contain one upper character, one lower character, and a number. Min length 8 and max length 15.");
    }
  
    try {


      const addPatientQuery = `
        INSERT INTO Patients (name, address, email, phone, password, photo, hospital_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
      `;
  
      const result = await pool.query(addPatientQuery, [
        name,
        address,
        email,
        phone,
        password,
        photo,
        hospital_id,
      ]);
  
      const patient_id = result.rows[0].id;
  
      // Add entry to PsychiatristPatients table
      const addPsychiatristPatientQuery = `
        INSERT INTO PsychiatristPatients (psychiatrist_id, patient_id)
        VALUES ($1, $2);
      `;

      console.log("addPsychiatristPatientQuery")
  
      await pool.query(addPsychiatristPatientQuery, [psychiatrist_id, patient_id] , (error ,result)=>{

          if(error){
            console.log(error)
          }else{
            console.log(result)
          }

      });
  
      res.status(201).json(result.rows[0]);
    } catch (error) {
      if (error.code === "23505") {
        res.status(409).send("Email already exists.");
      } else {
        res.status(500).send("Error registering patient.");
      }
    }
  };
  
