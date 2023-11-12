import urlSchema from "../models/url";
import { nanoid } from "nanoid";

function ErrorHelper(error: Error, name: string, code: number) {
  return {
    ...error,
    code: error.name === name ? code : 500,
  };
}

const urlController = {
  saveUrl: async (redirectUrl: string) => {
    try {
      const shortId = nanoid(8);
      await urlSchema.create({
        redirectUrl,
        nanoId: shortId,
      });
      return { data: { shortId }, code: 200 };
    } catch (error) {
      return ErrorHelper(error as Error, "ValidationError", 400);
    }
  },

  getUrl: async (shortId: string) => {
    try {
      const redirectUrl = (
        await urlSchema.findOne({ nanoId: shortId }).select("redirectUrl")
      )?.redirectUrl;
      if (!redirectUrl)
        throw { message: "Requested resource not found", name: "NotFound" };
      return { redirectUrl, code: 200 };
    } catch (error) {
      return ErrorHelper(error as Error, "NotFound", 404);
    }
  },
};

export default urlController;
