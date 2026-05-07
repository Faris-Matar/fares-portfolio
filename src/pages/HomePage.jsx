import { Helmet } from "react-helmet-async";
import Hero from "@/sections/Hero";
import Projects from "@/sections/Projects";
import About from "@/sections/About";
import Skills from "@/sections/Skills";
import Contact from "@/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Fares Matar, EEE Graduate | Embedded Systems and AI Engineer</title>
        <meta
          name="description"
          content="Portfolio of Fares Matar, Electrical and Electronic Engineering graduate specialising in embedded systems, AI pipelines, and web development."
        />
      </Helmet>
      <Hero />
      <Projects />
      <About />
      <Skills />
      <Contact />
    </>
  );
}
