import { Router, Request, Response } from "express";
import { UrlService } from "../service";
import { makeID } from "../utils/helper";

const router = Router();

router.post("/create/", async (req: Request, res: Response) => {
  const url = req.body?.url ?? null;

  if (!url || typeof url !== "string") {
    res.status(400).json("Missing or invalid 'url' in request body");
    return;
  }

  let found_flag = 0;
  let dataId = null;
  do {
    const newID = makeID(url, found_flag);
    const originUrl = await UrlService.getById(newID);

    if (
      originUrl !== undefined &&
      originUrl !== null &&
      (originUrl ?? "")?.length > 0 &&
      originUrl?.trim()?.length
    ) {
      found_flag += 1;
      continue;
    }

    await UrlService.create(newID, url as string);
    dataId = newID;
    break;
  } while (found_flag < 10);

  if (dataId == null) {
    res.status(400).send("Run out of Id");
  } else {
    res.status(201).json({ shortUrl: `http://127.0.0.1:3000/${dataId}` });
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
