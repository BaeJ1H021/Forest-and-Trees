import styled from 'styled-components';
import {
  Footer,
  HomeHeader,
  LandscapeMaintenanceSection,
  QuoteBanner,
  TreeHospitalSection,
} from '../components/molecules';

const HomePage = () => {
  return (
    <HomePageContainer>
      <HomeHeader />
      <QuoteBanner />
      <LandscapeMaintenanceSection />
      <TreeHospitalSection />
      <Footer />
    </HomePageContainer>
  );
};

export default HomePage;

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
