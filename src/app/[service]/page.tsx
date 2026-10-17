import { notFound } from "next/navigation";
import { services, serviceBySlug } from "@/data/services";
import { pageMetadata } from "@/lib/seo";
import { ServicePage } from "@/components/service-page";
export const dynamicParams = false;
export function generateStaticParams() { return services.map((service) => ({ service: service.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ service: string }> }) {
  const { service: slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) return {};
  return pageMetadata(service.title, service.description, "/" + service.slug);
}
export default async function Page({ params }: { params: Promise<{ service: string }> }) {
  const { service: slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) notFound();
  return <ServicePage service={service}/>;
}
