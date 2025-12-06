import styled from 'styled-components';
import {
  ArtificialConstructionSection,
  FacilityConstructionSection,
  GardenWork,
  HomeHeader,
  LandscapeMaintenanceSection,
  QuoteBanner,
  TimeLandscapeVideoSection,
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
      <TimeLandscapeVideoSection />
    </HomePageContainer>
  );
};

export default HomePage;

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
