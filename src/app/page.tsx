import Hero from '@/components/layout/Hero';
import { About } from '@/components/sections/About';
import { Education } from '@/components/sections/Education';
import { Certifications } from '@/components/sections/Certifications';
import { Experience } from '@/components/sections/Experience';
import { Projects } from '@/components/sections/Projects';
import { Contact } from '@/components/sections/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Education />
      <Certifications />
      <Experience />
      <Projects />
      <Contact />
    </>
  );
}
