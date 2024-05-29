import { Request, Response } from "express";

export default interface ClientAdmControllerInterface {
    create(req: Request, res: Response): Promise<Response>;
}