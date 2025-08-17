export function GET(): Response {
  const baseUrl = "https://sla-works.com";

  const robotsTxt = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Disallow: *.json

Sitemap: ${baseUrl}/sitemap.xml
Host: ${baseUrl}
`;

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
