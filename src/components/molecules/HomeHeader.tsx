import styled from 'styled-components';

const HomeHeader = () => {
  return (
    <HeaderContainer>
      <HeaderImage />
    </HeaderContainer>
  );
};

export default HomeHeader;

/* ================= styles ================= */

const HeaderContainer = styled.header`
  width: 100%;
  overflow: hidden;
`;

const HeaderImage = styled.div`
  width: 100%;
  aspect-ratio: 1920 / 911;

  background-image: url('images/pc_header.webp'); /* ✅ PC용 */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  @media (max-width: 768px) {
    aspect-ratio: 360 / 895; /* ✅ 모바일 헤더 원본 비율 */
    background-image: url('images/mobile_header.webp'); /* ✅ 모바일용 */
  }
`;
