import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import ProjectsShowcase from '../components/home/ProjectsShowcase';
import Statistics from '../components/home/Statistics';
import Testimonials from '../components/home/Testimonials';
import CallToAction from '../components/home/CallToAction';

const Home = () => {
  return (
    <div>
      <Hero />
      <Features />
      <ProjectsShowcase />
      <Statistics />
      <Testimonials />
      <CallToAction />
    </div>
  );
};

export default Home;
