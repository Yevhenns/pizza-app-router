const localhost = 'http://localhost:3000';
const url = process.env.NEXT_PUBLIC_BASE_URL;

export const BASE_URL =
  process.env.NODE_ENV === 'development' ? localhost : (url as string);

export const BASE_URL_API =
  process.env.NODE_ENV === 'development'
    ? `${localhost}/api/v1`
    : `${url}/api/v1`;
