import HeroSection from "@/components/home/hero-section";
import FeaturesSection from "@/components/home/features-section";
import BlogPreviewSection from "@/components/home/blog-preview-section";
import CallToActionSection from "@/components/home/cta-section";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <BlogPreviewSection />
      <CallToActionSection />
    </div>
  );
}
