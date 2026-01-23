import styled from 'styled-components';

const Award = () => {
  return (
    <AwardContainer>
      <AwardImage />
    </AwardContainer>
  );
};

export default Award;

/* ================= styles ================= */

const AwardContainer = styled.section`
  width: 100%;
  overflow: hidden;
`;

const AwardImage = styled.div`
  width: 100%;
  aspect-ratio: 1920 / 911; /* ✅ PC 비율 */

  background-image: url('images/award_web.webp'); /* PC용 */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  @media (max-width: 768px) {
    aspect-ratio: 360 / 895; /* ✅ 모바일 비율 */
    background-image: url('images/award_mobile.webp'); /* 모바일용 */
  }
`;
