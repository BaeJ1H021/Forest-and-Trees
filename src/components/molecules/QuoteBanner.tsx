import styled from 'styled-components';

export default function QuoteBanner() {
  return (
    <Wrapper>
      <Content>
        <QuoteMark>❝</QuoteMark>
        <Text>
          책임감 있는 조경유지관리와
          <br />
          세상에 없는 창의적인 정원을 만든다.
        </Text>
        <QuoteMark>❞</QuoteMark>
      </Content>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 260px;
  background-color: #f8fff8; /* 연한 초록 배경 */
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  gap: 24px;
`;

const QuoteMark = styled.div`
  font-size: 60px;
  color: #005013;
  font-weight: bold;
  margin-bottom: 40px;
`;

const Text = styled.div`
  font-size: 40px;
  font-weight: bold;
  color: #005013;
  line-height: 1.4;
`;
