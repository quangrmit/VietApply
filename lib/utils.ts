import { clsx, type ClassValue } from "clsx"
import { TokenPayload } from "google-auth-library";
import { twMerge } from "tailwind-merge"
import jwt, { Secret } from "jsonwebtoken";
import bcrypt from 'bcryptjs';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// function to remove accents from Vietnamese, for more pleasant searching (filtering)
export function removeAccents(s: string): string {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
 // Hashing a password
export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

// Verifying a password
export async function verifyPassword(password: string, hashedPassword: string) {
  return await bcrypt.compare(password, hashedPassword);
}

export function verifyToken(token: string) {

  const JWT_KEY = <Secret>process.env.JWT_SECRET;
  
  // Verify a token
  try {
    const decoded = jwt.verify(token, JWT_KEY);
    console.log(decoded);
  } catch (error) {
    console.error('Invalid token');
  }
}

export function OauthPayloadChecks(payload: TokenPayload | undefined, cliendId: string): { status: boolean; message: string } {

  if (!payload) {
    return { status: false, message: "No payload" }
  }

  const { iss, azp, aud } = payload

  if (iss !== "https://accounts.google.com" && iss !== "accounts.google.com") {
    return { status: false, message: 'Wrong iss' }
  }
  if (aud !== cliendId && azp !== cliendId) {
    return { status: false, message: 'Wrong aud or azp' }
  }
  // Check if token is expired
  const now = Math.floor(Date.now() / 1000);
  if (payload.exp && payload.exp < now) {
    return { status: false, message: 'Expired token' }
  }

  return { status: true, message: 'Successful check' };


}