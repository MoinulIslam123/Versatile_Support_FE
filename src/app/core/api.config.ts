/** Address of the ASP.NET Core API (backend/VersatileApi). Change it when you deploy. */
export const API_URL = 'http://localhost:5080/api';

/** The API's address without "/api" - uploaded photos are served from here (e.g. http://localhost:5080/uploads/x.jpg). */
export const API_ORIGIN = API_URL.replace(/\/api$/, '');

/** Turns a stored photo address ("/uploads/x.jpg") into one the browser can load. */
export function fileUrl(url?: string | null): string {
  if (!url) return '';
  return url.startsWith('/') ? API_ORIGIN + url : url;
}
