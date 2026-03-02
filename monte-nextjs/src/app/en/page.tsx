import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Pricing from '@/components/Pricing';
import Process from '@/components/Process';
import AboutUs from '@/components/AboutUs';
import BlogSection from '@/components/BlogSection';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';

export const revalidate = 300;

export default function HomeEN() {
  return (
    <>
      <Hero />
      <Services />
      <Pricing />
      <Process />
      <AboutUs />
      <BlogSection lang="en" />
      <FAQ />
      <Contact />
    </>
  );
}
