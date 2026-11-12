import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Spaces from "@/components/Spaces";
import Navbar from "@/components/Navbar";
import Process from "@/components/Process";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import { getSite } from "@/data/data";

// Home landing page
export default async function Home() {
  const s = await getSite();

  return (
    <>
      <Navbar
        brand={s.brand}
        image={s.hero.image}
        navigation={s.navigation}
        consultationButton={s.consultationButton}
      />
      <main>
        <Hero
          hero={s.hero}
          images={s.hero.images}
          image={s.hero.image}
          name={s.brand.name}
        />
        <Spaces spaces={s.spaces} />
        <Intro intro={s.intro} />
        <Projects projects={s.projects} items={s.projects.items} />
        <Services services={s.services} items={s.services.items} />
        <Gallery gallery={s.gallery} items={s.gallery.items} />
        <Process process={s.process} items={s.process.items} />
        <Testimonials testimonials={s.testimonials} items={s.testimonials.items} />
        <Contact
          brand={s.brand}
          image={s.contact.image}
          contact={s.contact}
        />
      </main>
      <Footer
        brand={s.brand}
        footer={s.footer}
        navigation={s.navigation}
      />
    </>
  );
}
