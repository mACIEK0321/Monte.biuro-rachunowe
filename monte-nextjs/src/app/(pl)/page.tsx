import { pageMetadata } from '@/lib/seo';
import PageSchema from '@/components/PageSchema';
export const metadata = pageMetadata({title: 'Biuro rachunkowe Kraków – księgowość firm i JDG', description: 'Biuro rachunkowe MonTe w Krakowie. Księgowość JDG i spółek, kadry i płace oraz obsługa online. Umów bezpłatną konsultację i poznaj ofertę.', path: '/', lang: 'pl'});

import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Pricing from '@/components/Pricing';
import Process from '@/components/Process';
import AboutUs from '@/components/AboutUs';
import BlogSection from '@/components/BlogSection';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';

export const revalidate = 300;

export default function Home() {
  return (
    <>
      <PageSchema path="/" title={'Biuro rachunkowe Kraków – księgowość firm i JDG'} lang="pl" />
      <Hero />
      <Services />
      <Pricing />
      <Process />
      <AboutUs />
      <BlogSection showImage={false} />
      <FAQ />
      <Contact />
    </>
  );
}
