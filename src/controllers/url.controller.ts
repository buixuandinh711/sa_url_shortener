import { Router, Request, Response } from "express";
import { UrlService } from "../service";
import { makeID } from "../utils/helper";

const router = Router();

router.post("/create/", async (req: Request, res: Response) => {
  const url = req.body?.url ?? null;

  if (!url || typeof url !== "string" || url.trim().length === 0) {
    res.status(400).json("Missing or invalid 'url' in request body");
    return;
  }

  let found_flag = 0;
  let dataId = null;
  do {
    const createdId = makeID(url, found_flag);
    const originUrl = await UrlService.getById(createdId);

    if (originUrl !== undefined && originUrl !== null) {
      if (originUrl === url) {
        dataId = createdId;
        break;
      } else {
        found_flag += 1;
        continue;
      }
    }

    try {
      await UrlService.create(createdId, url as string);
      dataId = createdId;
      break;
    } catch (error) {
      console.log(error);
      res.status(500).send("Failed to store URL");
      return;
    }
  } while (found_flag < 10);

  if (dataId == null) {
    res.status(400).send("Run out of Id");
  } else {
    res.status(201).json({ shortUrl: `http://127.0.0.1:8080/${dataId}` });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  const id = req.params?.id ?? null;
  const url = await UrlService.getById(id);

  if (!url) {
    res.status(404).send("<h1>404</h1>");
  } else {
    res.redirect(url);
  }
});

export default router;
