import Hero from '@/components/layout/Hero';

export default function Home() {
  return (
    <>
      <Hero />
      
      {/* Placeholder sections for future content */}
      <section id="about" className="min-h-screen bg-muted/30 px-4 py-24">
        <div className="container mx-auto max-w-7xl">
          <h2 className="mb-8 text-4xl font-bold">About</h2>
          <p className="text-lg text-muted-foreground">
            This section will contain information about your background, education, and experience.
          </p>
        </div>
      </section>

      <section id="projects" className="min-h-screen px-4 py-24">
        <div className="container mx-auto max-w-7xl">
          <h2 className="mb-8 text-4xl font-bold">Projects</h2>
          <p className="text-lg text-muted-foreground">
            This section will showcase your portfolio projects.
          </p>
        </div>
      </section>

      <section id="contact" className="min-h-screen bg-muted/30 px-4 py-24">
        <div className="container mx-auto max-w-7xl">
          <h2 className="mb-8 text-4xl font-bold">Contact</h2>
          <p className="text-lg text-muted-foreground">
            This section will contain your contact information and form.
          </p>
        </div>
      </section>
    </>
  );
}
