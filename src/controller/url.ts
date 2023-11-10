import urlSchema from "../models/url";
import { nanoid } from "nanoid";

const urlController = {
  saveUrl: async (redirectUrl: string) => {
    try {
      const shortId = nanoid(8);
      await urlSchema.create({
        redirectUrl,
        nanoId: shortId,
      });
      return { data: { shortId }, statusText: "success" };
    } catch (error) {
      return { error, statusText: "failed" };
    }
  },

  getUrl: async (shortId: string) => {
    try {
      const redirectUrl = (
        await urlSchema.findOne({ nanoId: shortId }).select("redirectUrl")
      )?.redirectUrl;
      const data = redirectUrl
        ? { redirectUrl }
        : { data: { message: "Page not found" } };
      return { ...data, statusText: "success" };
    } catch (error) {
      return { error, statusText: "failed" };
    }
  },
};

export default urlController;
