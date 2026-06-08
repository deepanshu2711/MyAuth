import type { Request, Response } from "express";

export const createInvitation = async (req: Request, res: Response) => {
  const { orgId, email, role } = req.body;
  const inviteByUserId = req.user?.userId;
};
