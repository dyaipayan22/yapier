import { generate } from 'otp-generator';

export function generateOtp() {
  return generate(4, {
    digits: true,
    lowerCaseAlphabets: false,
    specialChars: false,
    upperCaseAlphabets: false,
  });
}
