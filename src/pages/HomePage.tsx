import styled from 'styled-components';
import {
  ArtificialConstructionSection,
  FacilityConstructionSection,
  Footer,
  GardenWork,
  HomeHeader,
  LandscapeMaintenanceSection,
  QuoteBanner,
  TreeHospitalSection,
  TrimmingMowingSection,
} from '../components/molecules';

const HomePage = () => {
  return (
    <HomePageContainer>
      <HomeHeader />
      <QuoteBanner />
      <LandscapeMaintenanceSection />
      <TreeHospitalSection />
      <GardenWork />
      <TrimmingMowingSection />
      <FacilityConstructionSection />
      <ArtificialConstructionSection />
      <Footer />
    </HomePageContainer>
  );
};

export default HomePage;

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
