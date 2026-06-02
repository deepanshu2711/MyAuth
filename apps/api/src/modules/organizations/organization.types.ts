import type { Types } from "mongoose";

export interface CreateOrgInput {
  name: string;
  ownerId: Types.ObjectId | string;
  isPersonal?: boolean;
}
