import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Courses from './Courses';
import Features from './Features';
import Promo from './Promo';
import Testimonials from './Testimonials';
import Location from './Location';
import RegistrationForm from './RegistrationForm';
import Footer from './Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Courses />
        <Features />
        <Promo />
        <Testimonials />
        <RegistrationForm />
        <Location />
      </main>
      <Footer />
    </>
  );
}
