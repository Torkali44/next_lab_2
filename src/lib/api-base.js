export function getApiBaseUrl(req) {
  if (req?.headers?.host) {
    const protocol = req.headers["x-forwarded-proto"] || "http";
    return `${protocol}://${req.headers.host}`;
  }

  return process.env.NEXTAUTH_URL || "http://localhost:3000";
}
