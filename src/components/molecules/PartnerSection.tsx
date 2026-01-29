import { useState } from 'react';
import styled from 'styled-components';

type Category = 'school' | 'apartment' | 'public' | 'etc';

const DATA: Record<Category, string[]> = {
  school: [
    '범박어린이집',
    '은빛나무어린이집',
    '미추홀학교',
    '아람초등학교',
    '인천가좌초등학교',
    '경원초등학교',
    '학산초등학교',
    '명선초등학교',
    '새말초등학교',
    '송파초등학교',
    '연안초등학교',
    '위례별초등학교',
    '인천공항초등학교',
    '인천예송중학교',
    '신암중학교',
    '옥련중학교',
    '인주중학교',
    '동방중학교',
    '인천뷰티\n예술고등학교',
    '인천여자\n상업고등학교',
    '서울중산고등학교',
    '고잔고등학교',
    '논현고등학교',
    '마전고등학교',
    '선사고등학교',
    '만수고등학교',
    '송도고등학교',
    '경명초등학교',
    '인천대\n학산도서관',
    '청라중학교',
    '인천대학교',
    '부개고등학교',
  ],
  apartment: [
    '시흥배곧C2\n호반써밋플레이스',
    '한양아이클래스\n구로',
    '위드프리상뜨',
    '방배아크로리버',
    '가좌아주아파트',
    '검단오류역\n우방아이유쉘',
    '운정가람마을\n휴먼시아2단지',
    '일산흰돌마을\n주공4단지',
    '청라푸르지오시티',
    '간석한진아파트',
    '구월\n지웰시티푸르지오',
    '글로벌캠퍼스\n푸르지오',
    '부평\n더프라임클래스',
    '도림벽산블루밍',
    '도화역대성유니드',
    '마전\n풍림아이원3차',
    '배곧골드클래스',
    '백송상동자이',
    '서해삼화아파트',
    '송도더프라우\n1,2단지',
    '연수우성1차',
    '연수주공1단지',
    '중동그린타운한신',
    '하우스디아파트',
    '경기광주\n오포자이디오브',
    '경주\n자이르네',
    '남양주\n별내자이더스타',
    '대구만촌자이르네',
    '부산남천자이',
    '인천용현\n자이크레스트',
    '철산역롯데캐슬&\nSKVIEW\n클래스티지',
    '반포르엘2차\n아파트',
    '반포르엘1차\n아파트',
    '의정부롯데캐슬\n골드포레',
    '노원롯데캐슬\n시그니처아파트',
    '광진구롯데캐슬\n리버파크시그니처',
    '검단SK뷰',
    '문산선유\n주공2단지아파트',
    '김포한강\n삼정그린코아\n더 베스트',
    '부평캐슬&\n더샵퍼스트',
    '강릉\n자이파인베뉴',
    '평택지제역자이',
    '청량리롯데캐슬\nSKY-L65',
  ],
  public: [
    '인천환경공단\n송산지소',
    '인천환경공단\n청라사업소',
    '인천환경공단\n강화사업소',
    '인천환경공단\n승기사업소',
    '농림축산검역본부',
    '인천시체육회',
    '인천상공회의소',
    'lh인천본부',
    '인천관광공사',
    '인천혈액원',
    '동구청',
    '공무원연금공단',
    '서구가족문화센터',
    '인천종합에너지\n주식회사',
    '인천시교육청\n학생교육원',
    '인천도시공사',
    '인천지방조달청',
    '남부교육지원청',
    '대한석탄공사',
  ],
  etc: [
    '스타일난다',
    '대양전기',
    '일진전기',
    '온힐',
    '메이드림',
    'itw',
    '쌍용건설',
    '모아저축은행',
    '롯데택배',
    'gs건설',
    '유니시스',
    'cj대한통운',
    'kt종동빌딩',
    '현대무벡스',
    '머크',
    '두산연강',
    '약사사',
    '황룡사',
    '아세아종합건설',
    '한전 경인물류',
  ],
};

export default function PartnerSection() {
  const [active, setActive] = useState<Category>('school');

  return (
    <Section>
      <Title>숲과 나무 레퍼런스</Title>

      <Tabs>
        <Tab $active={active === 'school'} onClick={() => setActive('school')}>
          학교
        </Tab>
        <Tab
          $active={active === 'apartment'}
          onClick={() => setActive('apartment')}
        >
          아파트
        </Tab>
        <Tab $active={active === 'public'} onClick={() => setActive('public')}>
          관공서
        </Tab>
        <Tab $active={active === 'etc'} onClick={() => setActive('etc')}>
          기타
        </Tab>
      </Tabs>
      <Inner>
        <List>
          {DATA[active].map((name, idx) => (
            <Item key={idx}>{name}</Item>
          ))}
        </List>
      </Inner>
    </Section>
  );
}

/* ================= styles ================= */

const Section = styled.section`
  width: 100%;
  padding: 140px 0px;

  @media (max-width: 768px) {
    padding: 100px 0px;
  }
`;

const Inner = styled.div`
  background-color: #f4f4f4;

  @media (max-width: 768px) {
    background-color: white;
  }
`;

const Title = styled.h2`
  text-align: center;
  font-size: 40px;
  font-weight: 700;
  color: #005013;
  margin-bottom: 76px;

  @media (max-width: 768px) {
    font-size: 26px;
    margin-bottom: 26px;
  }
`;

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 140px;
  margin-bottom: 60px;

  @media (max-width: 768px) {
    gap: 24px;
    flex-wrap: wrap;
    margin-bottom: 0px;
  }
`;

const Tab = styled.button<{ $active?: boolean }>`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding-bottom: 6px;
  font-weight: ${({ $active }) => ($active ? 700 : 400)};
  color: ${({ $active }) => ($active ? '#005013' : '#777')};
  border-bottom: ${({ $active }) =>
    $active ? '2px solid #005013' : '2px solid transparent'};

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  row-gap: 28px; /* ✅ 기존 12px 너무 촘촘 */
  column-gap: 44px;
  text-align: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 94px 0px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    column-gap: 28px;
  }

  /* ✅ 모바일: 3열로 고정 */
  @media (max-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    column-gap: 8px;
    row-gap: 29px;
    padding: 50px 20px; /* 좌우 여백 */
  }
`;

const Item = styled.div`
  font-size: 22px;
  font-weight: 600; /* ✅ 조금 더 또렷하게 */
  color: #5b5b5b;
  line-height: 1.35;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 130px;
  white-space: pre-line;

  @media (max-width: 768px) {
    font-size: 13px; /* ✅ 3열이면 15px은 종종 터짐 */
    height: 36px; /* ✅ 모바일에서 너무 길지 않게 */
    font-weight: 400;
  }
`;
