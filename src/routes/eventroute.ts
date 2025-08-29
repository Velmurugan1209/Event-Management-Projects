import { Router } from "express";
import { eventattendeeList, eventConfirmation, eventCreate, eventDestroy, eventUpdate } from "../controller/eventcontroller";
import { LoginVerifyAdmin , ConfirmationVerifyByAdmin } from "../middleware/eventsmiddleware";
import { IPCreate,IPLogin } from "../controller/admincontroller";

export const router = Router();

//LoginRouter
router.post('/AdminCreate', IPCreate)
router.get('/Login', IPLogin)

//EvenRouter
router.post('/Events',  LoginVerifyAdmin, eventCreate)
//Event Confirmation by Admin
router.post('/Events/confirmation',LoginVerifyAdmin , eventConfirmation)

router.put('/Events/:id', LoginVerifyAdmin, eventUpdate)
router.delete('/Events/:id', LoginVerifyAdmin, eventDestroy)
router.get('/Events', LoginVerifyAdmin, eventattendeeList)

//EventCreateBy User
router.post('/EventsCreateUser',ConfirmationVerifyByAdmin, eventCreate)


