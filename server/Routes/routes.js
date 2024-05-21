const router = express.Router();
import { patient , addpSychiatrists , fetchHospitalDetails } from "../controller/controller.js";
import express from "express";


router.post("/addpatient" , patient);

router.post("/psychiatrists" , addpSychiatrists);

router.get('/hospitalDetail', fetchHospitalDetails);



export default router;