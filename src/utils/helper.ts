import { createHash } from "crypto";

function makeID(input: string, salt: number): string {
  const saltedInput = `${input}${salt}`;
  const hashBuffer = createHash("sha3-256").update(saltedInput).digest();
  const truncated = hashBuffer.subarray(0, 12); // 12 bytes = 96 bits
  return truncated.toString("base64url"); // URL-safe and shorter than regular base64
}

export { makeID };
