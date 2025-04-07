import { ShortURL } from "../models/url.model";
import { AppDataSource } from "../utils/database.connector";

export class UrlService {
  private static readonly urlRepo = AppDataSource.getRepository(ShortURL);

  public static async getById(id: string | null) {
    if (id == null) {
      return undefined;
    }
    const data = await UrlService.urlRepo.findOneBy({
      id: id,
    });

    return data?.id ?? null;
  }

  public static async create(id: string, url: string) {
    try {
      if (id == null || url == null) {
        throw { message: "Null data" };
      }
      if (url.trim().length == 0) {
        throw { message: "Empty data" };
      }
      const data = await UrlService.urlRepo.create({
        id: id,
        url: url,
      });
      return data;
    } catch (error) {
      return error;
    }
  }
}
