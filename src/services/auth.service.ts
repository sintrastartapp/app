import "server-only";

import { db } from "@/database";
import { oauthAccounts } from "@/database/schema";

export type CreateProviderAccountInput = {
  providerId: string;
  providerUserId: string;
  userId: string;
  refreshToken?: string;
  refreshTokenExpiresAt?: Date;
};

export class AuthService {
  static async createProviderAccount(data: CreateProviderAccountInput) {
    const query = db.insert(oauthAccounts).values({
      providerId: data.providerId,
      providerUserId: data.providerUserId,
      userId: data.userId,
      refreshToken: data.refreshToken,
      refreshTokenExpiresAt: data.refreshTokenExpiresAt,
    });

    if (!data.refreshToken) {
      return query.onConflictDoNothing();
    }

    return query.onConflictDoUpdate({
      target: oauthAccounts.providerId,
      set: {
        refreshToken: data.refreshToken,
        refreshTokenExpiresAt: data.refreshTokenExpiresAt,
      },
    });
  }
}
