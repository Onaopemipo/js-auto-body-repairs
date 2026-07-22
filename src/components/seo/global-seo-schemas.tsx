import { OrganizationSchema } from "@/components/seo/organization-schema";
import { WebsiteSchema } from "@/components/seo/website-schema";

export function GlobalSeoSchemas() {
  return (
    <>
      <WebsiteSchema />
      <OrganizationSchema />
    </>
  );
}
