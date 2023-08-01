import dotenv from 'dotenv'

dotenv.config()

export const authConfig = {
  secretToken: process.env.JWT_SECRET,
  secretRefreshToken: process.env.JWT_REFRESH_TOKEN,
  expiresInToken: "15m",
  expiresInRefreshToken: "30d",
  expiresRefreshTokenDays: 30
}