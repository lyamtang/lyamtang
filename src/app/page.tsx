import Hero from '@/components/layout/Hero';
import { About } from '@/components/sections/About';
import { Certifications } from '@/components/sections/Certifications';
import { Education } from '@/components/sections/Education';
import { Experience } from '@/components/sections/Experience';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Education />
      <Certifications />
    </>
  );
}
