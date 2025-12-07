// src/components/BlogCTASection.tsx
import styled from 'styled-components';

export default function BlogCTASection() {
  const openBlog = () => {
    window.open('https://blog.naver.com/fntree22', '_blank');
  };

  return (
    <Section>
      {/* ---------- WEB LAYOUT ---------- */}
      <WebWrapper>
        <Left>
          <BlogIcon src="/images/blog_icon.png" alt="블로그 아이콘" />
        </Left>

        <Right>
          <Title>
            숲과 나무
            <br />
            블로그 보러가기
          </Title>
          <Description>더 많은 작업결과물을 구경하세요!</Description>

          <Button onClick={openBlog}>보러가기</Button>
        </Right>
      </WebWrapper>

      {/* ---------- MOBILE LAYOUT ---------- */}
      <MobileWrapper>
        <MobileIcon src="/images/blog_icon.png" alt="블로그 아이콘" />

        <MobileTitle>
          숲과 나무
          <br />
          블로그 보러가기
        </MobileTitle>

        <MobileDesc>더 많은 작업결과물을 구경하세요!</MobileDesc>

        <MobileButton onClick={openBlog}>보러가기</MobileButton>
      </MobileWrapper>
    </Section>
  );
}

/* =========================================================
   스타일
========================================================= */

const Section = styled.section`
  width: 100%;
  background: #1c1c1c;
  padding: 64px 0;
  display: flex;
  justify-content: center;
  color: #ffffff;

  @media (max-width: 768px) {
    padding: 150px 20px;
  }
`;

/* ------------------- WEB ------------------- */
const WebWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 88px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Left = styled.div``;

const BlogIcon = styled.img`
  width: 220px;
  height: auto;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Title = styled.h2`
  font-size: 40px;
  font-weight: 700;
  line-height: 1.3;
  color: #32b44a;
`;

const Description = styled.p`
  font-size: 18px;
  color: #989898;
  margin-bottom: 10px;
`;

const Button = styled.button`
  width: 180px;
  padding: 14px 0;
  background: #32b44a;
  color: #1c1c1c;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background: #27ae60;
  }
`;

/* ------------------- MOBILE ------------------- */
const MobileWrapper = styled.div`
  width: 100%;
  text-align: center;

  @media (min-width: 769px) {
    display: none;
  }
`;

const MobileIcon = styled.img`
  width: 120px;
  margin: 0 auto 24px;
`;

const MobileTitle = styled.h2`
  font-size: 28px;
  color: #32b44a;
  font-weight: 700;
  margin-bottom: 20px;
  line-height: 1.4;
`;

const MobileDesc = styled.p`
  font-size: 15px;
  color: #dbdbdb;
  margin-bottom: 37px;
`;

const MobileButton = styled.button`
  width: 100%;
  max-width: 360px;
  padding: 16px 0;
  background: #32b44a;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
`;
