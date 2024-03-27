const PROTOCOL = process.env.NEXT_PUBLIC_VERCEL_ENV === 'development' ? 'http://' :  'https://';
export const BASE_API_URL = PROTOCOL + process.env.NEXT_PUBLIC_VERCEL_URL