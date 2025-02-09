export function formatPhoneNumber(phoneNumber: string) {
  if (phoneNumber.length === 0) {
    return '';
  }
  return '+' + phoneNumber.replace(/\D/g, '');
}
