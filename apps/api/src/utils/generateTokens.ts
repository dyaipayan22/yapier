import jwt from 'jsonwebtoken';

export function generateAccessToken(userId: string) {
  return jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: '3d',
  });
}

function generateRefreshToken(userId: string) {
  return jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET as string, {
    expiresIn: '30d',
  });
}

export function generateTokens(userId: string) {
  const accessToken = generateAccessToken(userId);
  const refreshToken = generateRefreshToken(userId);
  return { accessToken, refreshToken };
}
