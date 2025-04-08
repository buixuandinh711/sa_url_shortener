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

    return data?.url ?? null;
  }

  public static async validateExistance(url: string | null) {
    if (url == null) {
      return false;
    }
    const data_exist = await UrlService.urlRepo.exists({
      where: { url },
    });

    return data_exist;
  }

  public static async create(id: string, url: string) {
    if (!id || !url || url.trim().length === 0) {
      throw new Error("Invalid input data");
    }

    const newUrl = UrlService.urlRepo.create({ id, url });
    return await UrlService.urlRepo.save(newUrl);
  }
}
