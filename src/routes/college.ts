import { Router } from "express";
import CollegeRouter from "../controller/college";
const router = Router();

router.get("/", CollegeRouter.getAllColleges);
