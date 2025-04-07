import { Request, Response } from "express";
import { UrlService } from "../service";
import { makeID } from "../utils/helper";

export class UrlController {
  public static async createUrl(req: Request, res: Response) {
    let found_flag = 0;
    let dataId = null;
    const url = req.query?.url ?? null;

    do {
      const newID = makeID(5);
      const originUrl = await UrlService.getById(newID);
      if (
        originUrl === undefined ||
        ((originUrl ?? "")?.length > 0 && originUrl?.trim()?.length)
      ) {
        found_flag += 1;
      }
      if (originUrl === null) {
        await UrlService.create(newID, url as string);
        dataId = newID;
      }
    } while (found_flag < 10);

    if (dataId == null) res.status(400).send("Run out of Id");
    res.status(200).send(dataId);
  }

  public static async getUrlById(req: Request, res: Response) {
    const id = req.params?.id ?? null;
    const url = await UrlService.getById(id);
    if (url == null || url == undefined) {
      res.send("<h1>404</h1>");
    } else {
      res.send(url);
    }
  }
}
