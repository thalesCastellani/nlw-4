import { Router } from "express";
import { AnswerController } from "./controllers/AnswerController";
import { NpsController } from "./controllers/NpsController";
import { SendMailController } from "./controllers/SendMailController";
import { SurveysController } from "./controllers/SurveysController";
import { UserController } from "./controllers/UserController";

const router = Router();

const userController = new UserController();

const surveysController = new SurveysController();
const surveysUsersController = new SendMailController();

const aswerController = new AnswerController();

const npsController = new NpsController();

router.post("/users", userController.create);
router.get("/users", userController.show);

router.post("/surveys", surveysController.create);
router.get("/surveys", surveysController.show);

router.post("/sendMail", surveysUsersController.execute);

router.get("/answers/:value", aswerController.execute);

router.get("/nps/:survey_id", npsController.execute);

export { router };