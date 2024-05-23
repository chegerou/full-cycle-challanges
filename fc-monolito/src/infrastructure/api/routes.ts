import { Router } from "express";

export default class Routes {
  private router: Router;

  constructor() {
    this.router = Router();
  }

  public init(): Router {
    this.router.use("/", (req, res) => {
      res.send("Hello World");
    });
    return this.router;
  }
}
