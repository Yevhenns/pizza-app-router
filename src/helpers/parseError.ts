export function parseError(error: any) {
  return JSON.parse(error.message).error;
}
