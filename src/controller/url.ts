import urlSchema from "../models/url";
import { nanoid } from "nanoid";
import { marked } from "marked";
import sendMail from "../utils/mailService";
import { escapeHTML } from "../utils/escapeHTML";

function ErrorHelper(error: Error, code: number, name?: string) {
  return {
    ...error,
    code: error.name === name ? code : 500
  };
}

const urlController = {
  saveUrl: async (redirectUrl: string) => {
    try {
      const shortId = nanoid(8);
      await urlSchema.create({
        redirectUrl,
        nanoId: shortId
      });
      return { data: { shortId }, code: 200 };
    } catch (error) {
      return ErrorHelper(error as Error, 400, "ValidationError");
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
      return ErrorHelper(error as Error, 404, "NotFound");
    }
  },

  contactMail: async (title: string, description: string) => {
    try {
      const mailOptions = {
        from: process.env.MAIL_SENDER!,
        to: process.env.MAIL_TO!,
        subject: escapeHTML(title),
        html: marked(escapeHTML(description))
      };
      await sendMail(mailOptions, process.env.MAIL_PASSWORD!);
      return {
        data: { message: "Your message delivered successfully" },
        code: 200
      };
    } catch (error) {
      return { ...(error as Error), code: 500 };
    }
  }
};

export default urlController;
