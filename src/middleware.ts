export { default } from "next-auth/middleware";

export const config = { matcher: ["/api/office/:path*", "/office/:path*"] };
