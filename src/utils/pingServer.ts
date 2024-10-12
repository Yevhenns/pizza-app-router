const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL_NEST;

export async function pingServer() {
  try {
    await fetch(`${BASE_URL}/api/health`);
    return;
  } catch (error: any) {
    return error.message;
  }
}
