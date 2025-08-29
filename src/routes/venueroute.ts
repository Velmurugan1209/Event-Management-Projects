import { Router } from "express";
import { venueCreate, venueDelete, venueUpdate } from "../controller/venuecontroller";


export const VenueRoute = Router();
 

VenueRoute.post('/Create' , venueCreate)
VenueRoute.put('/Update' , venueUpdate)
VenueRoute.delete('/delete/:id', venueDelete)