import LandingHeader from "../components/landing/LandingHeader/LandingHeader";
import LandingHero from "../components/landing/LandingHero";

import { Helmet } from "react-helmet-async";

const LandingPage = () => {
  return (
    <section className="landing-wrapper">
      <Helmet>
        <title>BemoUI</title>
      </Helmet> 
      <LandingHeader />
      <LandingHero />
    </section>
  );
};

export default LandingPage;
