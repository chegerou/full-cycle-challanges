import { Router } from "express";

export default class Routes {
  private router: Router;

  constructor() {
    this.router = Router();
  }

  public init(): Router {
    this.router.use();
    return this.router;
  }
}
