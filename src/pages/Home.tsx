import { Hero } from '../components/Hero';
import { PostsSection } from '../components/PostsSection';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { Testimonials } from '../components/Testimonials';

export function Home() {
  return (
    <>
      <Hero />
      <PostsSection />
      <WhyChooseUs />
      <Testimonials />
    </>
  );
}
