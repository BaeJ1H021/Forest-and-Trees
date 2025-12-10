import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useInViewOnce } from '../../hooks/useInViewOnce';

const IMAGES = [
  '/images/garden_work/1.png',
  '/images/garden_work/2.png',
  '/images/garden_work/3.png',
  '/images/garden_work/4.png',
  '/images/garden_work/5.png',
  '/images/garden_work/6.png',
  '/images/garden_work/7.png',
  '/images/garden_work/8.png',
];

export default function GardenWork() {
  const [index, setIndex] = useState(0); // 데스크탑: 그룹 인덱스 / 모바일: 이미지 인덱스
  const touchStartX = useRef<number | null>(null);

  const maxDesktopIndex = Math.floor(IMAGES.length / 4); // 4장씩

  // ✅ 현재 뷰포트가 모바일인지 여부
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth <= 768;
  });

  useEffect(() => {
    const handleResize = () => {
      if (typeof window === 'undefined') return;
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ✅ PC <-> 모바일 전환 시 인덱스 초기화
  useEffect(() => {
    setIndex(0);
  }, [isMobile]);

  // ✅ 인뷰 상태 훅
  const { ref: textRef, inView: textInView } = useInViewOnce();
  const { ref: desktopRef, inView: desktopInView } = useInViewOnce();
  const { ref: mobileRef, inView: mobileInView } = useInViewOnce();

  // ------------------------ DESKTOP ARROWS ------------------------
  const onPrev = () => {
    setIndex((prev) => {
      if (prev === 0) return prev; // 맨 왼쪽 → 그대로
      return prev - 1;
    });
  };

  const onNext = () => {
    setIndex((prev) => {
      if (prev === maxDesktopIndex - 1) return prev; // 맨 오른쪽 → 그대로
      return prev + 1;
    });
  };

  // ------------------------ MOBILE SWIPE ------------------------
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;

    const diff = e.changedTouches[0].clientX - touchStartX.current;

    if (diff > 50) {
      // 오른쪽 → 왼쪽 swipe: 이전
      setIndex((prev) => {
        if (prev === 0) return prev; // 맨 처음이면 멈춤
        return prev - 1;
      });
    } else if (diff < -50) {
      // 왼쪽 → 오른쪽 swipe: 다음
      setIndex((prev) => {
        if (prev === IMAGES.length - 1) return prev; // 맨 끝이면 멈춤
        return prev + 1;
      });
    }
  };

  return (
    <Wrapper>
      <Inner>
        {/* 텍스트 블럭 fade-up */}
        <TextBlock ref={textRef} $inView={textInView}>
          <Title>정원공사</Title>
          <SubTitle>카페, 학교, 법인 회사, 전원주택, 정원공사</SubTitle>
          <Description>
            쉼과 산책로/숲길 학교정원, 나무와 꽃이 <MobileBr /> 어우러진 포토존
            카페정원, 잡초 관리가 어려운 <br /> 법인회사 드라이정원 등 나무,
            석주, 이끼, 바위술 등 <MobileBr />
            다양한 소재로 완성도 높은 공간창출
          </Description>
        </TextBlock>

        {/* -------------------------- DESKTOP VIEW -------------------------- */}
        <DesktopContainer ref={desktopRef} $inView={desktopInView}>
          <ArrowLeft onClick={onPrev} />
          <ArrowRight onClick={onNext} />

          <DesktopViewport>
            <DesktopSlider
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {Array.from({ length: maxDesktopIndex }).map((_, groupIndex) => (
                <ImageGroup key={groupIndex}>
                  {IMAGES.slice(groupIndex * 4, groupIndex * 4 + 4).map(
                    (src, i) => (
                      <ImageItem key={i}>
                        <img src={src} alt={`정원 이미지 ${i}`} />
                      </ImageItem>
                    ),
                  )}
                </ImageGroup>
              ))}
            </DesktopSlider>
          </DesktopViewport>
        </DesktopContainer>

        {/* -------------------------- MOBILE VIEW -------------------------- */}
        <MobileContainer
          ref={mobileRef}
          $inView={mobileInView}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <MobileSlider style={{ transform: `translateX(-${index * 100}%)` }}>
            {IMAGES.map((src, i) => (
              <MobileImage key={i} src={src} />
            ))}
          </MobileSlider>

          {/* 모바일 인디케이터 */}
          <MobileDots>
            {IMAGES.map((_, i) => (
              <Dot key={i} active={i === index} />
            ))}
          </MobileDots>
        </MobileContainer>
      </Inner>
    </Wrapper>
  );
}

/* ----------------- 공통 fade-up 믹스인 ----------------- */

const fadeUpMixin = css<{ $inView?: boolean }>`
  opacity: 0;
  transform: translateY(40px);
  transition:
    opacity 0.7s ease-out,
    transform 0.7s ease-out;

  ${({ $inView }) =>
    $inView &&
    css`
      opacity: 1;
      transform: translateY(0);
    `}
`;

/* ----------------- STYLES ----------------- */

const Wrapper = styled.div`
  width: 100%;
  padding: 320px 50px;

  @media (max-width: 1550px) {
    padding: 320px 100px;
  }

  @media (max-width: 768px) {
    padding: 180px 20px;
  }
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

/** 텍스트 영역 전체를 fade-up */
const TextBlock = styled.div<{ $inView?: boolean }>`
  ${fadeUpMixin};
`;

const Title = styled.h2`
  font-size: 40px;
  font-weight: 700;
  color: #005013;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    font-size: 28px;
    margin-bottom: 16px;
  }
`;

const SubTitle = styled.p`
  font-size: 20px;
  font-weight: 700;
  color: #282828;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 26px;
    line-height: 1.4;
  }
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #8e8e8e;
  margin-bottom: 71px;

  @media (max-width: 768px) {
    font-size: 15px;
    margin-bottom: 52px;
    line-height: 1.6;
  }
`;

/* ----------------- DESKTOP ----------------- */

const DesktopContainer = styled.div<{ $inView?: boolean }>`
  position: relative; /* 화살표 기준점 */
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  ${fadeUpMixin};

  @media (max-width: 768px) {
    display: none;
  }
`;

/** 실제 슬라이드 영역만 가리는 뷰포트 */
const DesktopViewport = styled.div`
  width: 100%;
  overflow: hidden;
`;

const DesktopSlider = styled.div`
  display: flex;
  transition: transform 0.5s ease;
  width: 100%;
`;

const ImageGroup = styled.div`
  flex: 0 0 100%; /* 한 그룹이 슬라이더 너비 100% */
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  width: 100%;

  @media (max-width: 1550px) {
    gap: 12px;
  }
`;

const ImageItem = styled.div`
  img {
    width: 100%;
    height: auto;
  }
`;

/* 화살표: DesktopContainer 기준 중앙, 양쪽 100px */
const ArrowLeft = styled.button`
  position: absolute;
  top: 50%;
  left: -180px; /* grid에서 180px 밖으로 */
  transform: translateY(-50%);
  width: 96px;
  height: 120px;
  background: url('/images/leftArrow.png') no-repeat center/contain;
  border: none;
  cursor: pointer;
  z-index: 10;

  @media (max-width: 1550px) {
    left: -100px;
    width: 72px;
    height: 90px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const ArrowRight = styled.button`
  position: absolute;
  top: 50%;
  right: -180px; /* grid에서 180px 밖으로 */
  transform: translateY(-50%);
  width: 96px;
  height: 120px;
  background: url('/images/rightArrow.png') no-repeat center/contain;
  border: none;
  cursor: pointer;
  z-index: 10;

  @media (max-width: 1550px) {
    right: -100px;
    width: 72px;
    height: 90px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

/* ----------------- MOBILE ----------------- */

const MobileContainer = styled.div<{ $inView?: boolean }>`
  display: none;

  @media (max-width: 768px) {
    display: block;
    width: 100%;
    overflow: hidden;
    ${fadeUpMixin};
  }
`;

const MobileSlider = styled.div`
  display: flex;
  transition: transform 0.35s ease-out;
  width: 100%;
`;

const MobileImage = styled.img`
  width: 100%;
  height: auto;
  flex: 0 0 100%;
`;

const MobileDots = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    gap: 8px;
    justify-content: center;
    margin-top: 14px;
  }
`;

const Dot = styled.div<{ active: boolean }>`
  margin-top: 10px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${(p) => (p.active ? '#0f4d18' : '#c8d9c8')};
  transition: background 0.3s;
`;

const MobileBr = styled.br`
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;
