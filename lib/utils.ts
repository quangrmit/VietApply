import { clsx, type ClassValue } from "clsx"
import { TokenPayload } from "google-auth-library";
import { twMerge } from "tailwind-merge"
import jwt, { Secret } from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import { JwtPayload } from "./types";

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

export function splitByComma(str: string) {
  // Check if the input is a string
  if (typeof str !== 'string') {
    return [str];
  }

  // Trim the string first
  const trimmedStr = str.trim();

  // Check if the trimmed string contains a comma
  if (trimmedStr.includes(',')) {
    // Split by comma and trim each resulting value
    return trimmedStr.split(',')
      .map(item => item.trim())
    // .filter(item => item !== '');
  } else {
    // Return an array with just the trimmed original string
    return [trimmedStr];
  }
}

export function generateToken(payload: JwtPayload) {
  const secret = <Secret>process.env.JWT_SECRET;
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT secret is missing from environment variables");
  }

  const token = jwt.sign(
    payload,
    secret,            // secret key
    { expiresIn: '100h' }                // options
  );
  return token;
}

// Verifying a password
export async function verifyPassword(password: string, hashedPassword: string) {
  return await bcrypt.compare(password, hashedPassword);
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