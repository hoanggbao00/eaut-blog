const PROTOCOL = process.env.VERCEL_ENV === 'development' ? 'http://' :  'https://';
export const BASE_API_URL = PROTOCOL + process.env.VERCEL_URL