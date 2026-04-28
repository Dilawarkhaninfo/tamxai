import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import {
  getNavigationServices,
  getNavigationProducts,
  getSiteSettings,
} from "@/app/_actions/navigation";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [services, products, settings] = await Promise.all([
    getNavigationServices(),
    getNavigationProducts(),
    getSiteSettings(),
  ]);

  return (
    <>
      <Navbar services={services} products={products} />
      <PageTransition>{children}</PageTransition>
      <Footer
        contactEmail={settings.contact_email}
        socialLinkedin={settings.social_linkedin}
      />
    </>
  );
}
