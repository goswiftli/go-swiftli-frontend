import { Box } from '@chakra-ui/react';

import {
  Carousel,
  ContactUs,
  Faq,
  Features,
  Hero,
  HowItWorks,
  Testimonials,
  WhoWeServe,
  WhyChoose,
} from '../components';

export const LandingPageView = () => {
  return (
    <Box minH="100vh">
      <Hero />
      <Carousel />
      <HowItWorks />
      <WhoWeServe />
      <Features />
      <WhyChoose />
      <Testimonials />
      <Faq />
      <ContactUs />
    </Box>
  );
};
