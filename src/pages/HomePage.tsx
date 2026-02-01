import styled from 'styled-components';
import {
  ArtificialConstructionSection,
  Award,
  BlogCTASection,
  FacilityConstructionSection,
  Footer,
  GardenWork,
  HomeHeader,
  LandscapeMaintenanceSection,
  PartnerSection,
  QuoteBanner,
  TreeHospitalSection,
  TrimmingMowingSection,
} from '../components/molecules';

const HomePage = () => {
  return (
    <HomePageContainer>
      <HomeHeader />
      <QuoteBanner />
      <PartnerSection />
      <LandscapeMaintenanceSection />
      <TreeHospitalSection />
      <GardenWork />
      <TrimmingMowingSection />
      <FacilityConstructionSection />
      <ArtificialConstructionSection />
      <Award />
      <BlogCTASection />
      <Footer />
    </HomePageContainer>
  );
};

export default HomePage;

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
