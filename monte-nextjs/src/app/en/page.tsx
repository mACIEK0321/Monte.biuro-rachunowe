import { pageMetadata } from '@/lib/seo';
import PageSchema from '@/components/PageSchema';
export const metadata = pageMetadata({title: 'Accounting Firm Kraków – English-Speaking Accountants', description: 'Accounting for sole traders and companies in Kraków and across Poland. Bookkeeping, payroll and online support in English. Book a free consultation.', path: '/en/', lang: 'en'});

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
      <PageSchema path="/en/" title={'Accounting Firm Kraków – English-Speaking Accountants'} lang="en" />
      <Hero />
      <Services />
      <Pricing />
      <Process />
      <AboutUs />
      <BlogSection lang="en" showImage={false} />
      <FAQ />
      <Contact />
    </>
  );
}
