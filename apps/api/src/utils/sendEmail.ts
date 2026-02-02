import { emailService } from "./email.js";

export interface SendEmailOptions {
  to: string;
  subject: string;
  html?: string;
  text?: string;
}

export const sendEmail = async (options: SendEmailOptions): Promise<void> => {
  await emailService.sendEmail(options);
};

export const verifyEmailConnection = async (): Promise<boolean> => {
  return await emailService.verifyConnection();
};
