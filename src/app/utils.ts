export function generateRandomString(len: number) {
  var arr = new Uint8Array((len || 40) / 2);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, (dec) => dec.toString(16).padStart(2, '0')).join('');
}

export function getErrorMessage(error: any): string {
  if (error?.error?.error && error.error?.error_description)
    return `${error.error.error} (${error.error.error_description})`;
  if (typeof error?.error?.error?.message === 'string')
    return error.error.error.message;
  else if (typeof error?.error?.error === 'string') return error.error.error;
  else if (typeof error?.message === 'string') return error.message;
  else return error.toString();
}
