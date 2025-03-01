import { clsx, type ClassValue } from "clsx"
import { TokenPayload } from "google-auth-library";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// function to remove accents from Vietnamese, for more pleasant searching (filtering)
export function removeAccents(s: string): string {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function OauthPayloadChecks(payload: TokenPayload | undefined, cliendId: string): {status: boolean; message: string} {

  if (!payload) {
    return {status: false, message: "No payload"}
  }

  const { iss, azp, aud } = payload

  if (iss !== "https://accounts.google.com" && iss !== "accounts.google.com") {
    return {status: false, message: 'Wrong iss'}
  }
  if (aud !== cliendId && azp !== cliendId) {
    return {status: false, message: 'Wrong aud or azp'}
  }
  // Check if token is expired
  const now = Math.floor(Date.now() / 1000);
  if (payload.exp && payload.exp < now) {
    return {status: false, message: 'Expired token'}
  }

  return {status: true, message: 'Successful check'};


}