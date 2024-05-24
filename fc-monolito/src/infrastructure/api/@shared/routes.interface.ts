import { Router } from "express";

export default interface IRoutes {
    init(): Router;
}