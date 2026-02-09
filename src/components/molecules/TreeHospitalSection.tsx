import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { useInViewOnce } from '../../hooks/useInViewOnce';

// ✅ 20장 (경로/확장자 프로젝트에 맞게 유지)
const IMAGES = Array.from({ length: 12 }).map(
  (_, i) => `/images/tree_hospital/${i + 1}.jpg`,
);

export default function TreeHospitalSection() {
  // ✅ PC: 2장/페이지(=1x2), 모바일: 4장/페이지(=2x2)
  const DESKTOP_PER_PAGE = 2;
  const MOBILE_PER_PAGE = 4;

  const [index, setIndex] = useState(0); // 페이지 인덱스
  const touchStartX = useRef<number | null>(null);

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

  const maxDesktopIndex = useMemo(
    () => Math.ceil(IMAGES.length / DESKTOP_PER_PAGE),
    [],
  );
  const maxMobileIndex = useMemo(
    () => Math.ceil(IMAGES.length / MOBILE_PER_PAGE),
    [],
  );

  // ✅ 텍스트 / 슬라이더 인뷰 상태 (기존 구조 유지)
  const { ref: textRef, inView: textInView } = useInViewOnce();
  const { ref: desktopRef, inView: desktopInView } = useInViewOnce();
  const { ref: mobileRef, inView: mobileInView } = useInViewOnce();

  // ------------------------ DESKTOP ARROWS (2장씩) ------------------------
  const onPrev = () => setIndex((prev) => (prev === 0 ? prev : prev - 1));
  const onNext = () =>
    setIndex((prev) => (prev === maxDesktopIndex - 1 ? prev : prev + 1));

  // ------------------------ MOBILE SWIPE (4장씩 페이지 이동) ------------------------
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;

    if (diff > 50) {
      setIndex((prev) => (prev === 0 ? prev : prev - 1));
    } else if (diff < -50) {
      setIndex((prev) => (prev === maxMobileIndex - 1 ? prev : prev + 1));
    }
  };

  return (
    <Section>
      <MobileOverlay />
      <Inner>
        <TextBlock ref={textRef} $inView={textInView}>
          <Title>나무병원</Title>
          <SubTitle>
            수목피해 진단 처방, 병충해 방제,
            <MobileBr /> 생육환경 개선
          </SubTitle>
          <Description>
            풍부한 경험의 나무의사와 수목치료사의 <MobileBr />
            진단과 처방으로
            <PCBr /> 벌레로 부터의 <MobileBr />
            해방과 생육환경을 개선해 드립니다.
          </Description>
        </TextBlock>

        {/* -------------------------- DESKTOP (2장씩) -------------------------- */}
        <DesktopContainer ref={desktopRef} $inView={desktopInView}>
          <ArrowLeft
            onClick={onPrev}
            aria-label="이전"
            disabled={index === 0}
          />
          <ArrowRight
            onClick={onNext}
            aria-label="다음"
            disabled={index === maxDesktopIndex - 1}
          />

          <DesktopViewport>
            <DesktopSlider
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {Array.from({ length: maxDesktopIndex }).map((_, pageIndex) => (
                <DesktopPage key={pageIndex}>
                  {IMAGES.slice(
                    pageIndex * DESKTOP_PER_PAGE,
                    pageIndex * DESKTOP_PER_PAGE + DESKTOP_PER_PAGE,
                  ).map((src, i) => (
                    <ImageItem key={`${pageIndex}-${i}`}>
                      <WorkImage
                        src={src}
                        alt={`나무병원 이미지 ${pageIndex * DESKTOP_PER_PAGE + i + 1}`}
                        loading="lazy"
                      />
                    </ImageItem>
                  ))}
                </DesktopPage>
              ))}
            </DesktopSlider>
          </DesktopViewport>
        </DesktopContainer>

        {/* -------------------------- MOBILE (4장씩 = 2x2) -------------------------- */}
        <MobileContainer
          ref={mobileRef}
          $inView={mobileInView}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <MobileViewport>
            <MobileSlider style={{ transform: `translateX(-${index * 100}%)` }}>
              {Array.from({ length: maxMobileIndex }).map((_, pageIndex) => (
                <MobilePage key={pageIndex}>
                  {IMAGES.slice(
                    pageIndex * MOBILE_PER_PAGE,
                    pageIndex * MOBILE_PER_PAGE + MOBILE_PER_PAGE,
                  ).map((src, i) => (
                    <MobileImageItem key={`${pageIndex}-${i}`}>
                      <WorkImage
                        src={src}
                        alt={`나무병원 이미지 ${pageIndex * MOBILE_PER_PAGE + i + 1}`}
                        loading="lazy"
                      />
                    </MobileImageItem>
                  ))}
                </MobilePage>
              ))}
            </MobileSlider>
          </MobileViewport>

          {/* ✅ 페이지 기준 dots */}
          <MobileDots>
            {Array.from({ length: maxMobileIndex }).map((_, i) => (
              <Dot key={i} $active={i === index} />
            ))}
          </MobileDots>
        </MobileContainer>
      </Inner>
    </Section>
  );
}

/* ========== 공통 애니메이션 믹스인 ========== */

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

/* ========== styled-components (기존 TreeHospital 구조 유지) ========== */

const Section = styled.section`
  position: relative;
  width: 100%;
  background-color: #f8fff8;
  padding: 128px 50px 150px;

  @media (max-width: 768px) {
    padding: 180px 20px;
    background-color: transparent;
    background-image: url('/images/tree_hospital/5.png');
    background-size: cover;
    background-position: center;
  }
`;

const MobileOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 80, 19, 0.8);
  pointer-events: none;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Inner = styled.div`
  position: relative;
  z-index: 1;

  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 1024px) {
    padding: 0 40px;
  }

  @media (max-width: 768px) {
    padding: 0;
    max-width: 360px;
    align-items: center;
    text-align: center;
  }
`;

/* 텍스트 영역 */

const TextBlock = styled.div<{ $inView?: boolean }>`
  max-width: 420px;
  margin-bottom: 36px;
  ${fadeUpMixin};

  @media (max-width: 768px) {
    max-width: 100%;
    margin-bottom: 38px;
  }
`;

const Title = styled.h2`
  font-size: 40px;
  font-weight: 700;
  color: #005013;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    font-size: 28px;
    color: #ffffff;
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
    font-weight: 500;
    line-height: 1.5;
    color: #ffffff;
    margin-bottom: 26px;
  }
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.7;
  color: #8e8e8e;

  @media (max-width: 768px) {
    font-size: 16px;
    line-height: 1.8;
    color: #ffffff;
  }
`;

/* ----------------- DESKTOP (2장씩 슬라이드) ----------------- */

const DesktopContainer = styled.div<{ $inView?: boolean }>`
  position: relative;
  width: 100%;
  max-width: 1200px;
  ${fadeUpMixin};

  @media (max-width: 768px) {
    display: none;
  }
`;

const DesktopViewport = styled.div`
  width: 100%;
  overflow: hidden;
`;

const DesktopSlider = styled.div`
  display: flex;
  transition: transform 0.5s ease;
  width: 100%;
`;

/** 한 페이지(=한 화면): 2열 */
const DesktopPage = styled.div`
  flex: 0 0 100%;
  width: 100%;

  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 20px;

  @media (max-width: 1024px) {
    column-gap: 10px;
  }
`;

/** ✅ 이미지 높이/overflow 건드리지 않음 */
const ImageItem = styled.div`
  width: 100%;
`;

const WorkImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

/* 화살표: 기존 GardenWork 스타일 그대로 */
const ArrowLeft = styled.button<{ disabled?: boolean }>`
  position: absolute;
  top: 50%;
  left: -180px;
  transform: translateY(-50%);
  width: 96px;
  height: 120px;
  background: url('/images/leftArrow.png') no-repeat center/contain;
  border: none;
  cursor: pointer;
  z-index: 10;
  opacity: ${({ disabled }) => (disabled ? 0.35 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};

  @media (max-width: 1550px) {
    left: -100px;
    width: 72px;
    height: 90px;
  }
`;

const ArrowRight = styled.button<{ disabled?: boolean }>`
  position: absolute;
  top: 50%;
  right: -180px;
  transform: translateY(-50%);
  width: 96px;
  height: 120px;
  background: url('/images/rightArrow.png') no-repeat center/contain;
  border: none;
  cursor: pointer;
  z-index: 10;
  opacity: ${({ disabled }) => (disabled ? 0.35 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};

  @media (max-width: 1550px) {
    right: -100px;
    width: 72px;
    height: 90px;
  }
`;

/* ----------------- MOBILE (4장씩: 2x2) ----------------- */

const MobileContainer = styled.div<{ $inView?: boolean }>`
  display: none;

  @media (max-width: 768px) {
    display: block;
    width: 100%;
    ${fadeUpMixin};
  }
`;

const MobileViewport = styled.div`
  width: 100%;
  overflow: hidden;
`;

const MobileSlider = styled.div`
  display: flex;
  transition: transform 0.35s ease-out;
  width: 100%;
`;

/** 한 페이지(=한 화면): 2x2 */
const MobilePage = styled.div`
  flex: 0 0 100%;
  width: 100%;

  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 10px;
  row-gap: 10px;
`;

const MobileImageItem = styled.div`
  width: 100%;
`;

const MobileDots = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 14px;
`;

const Dot = styled.div<{ $active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: ${(p) => (p.$active ? '#0f4d18' : '#c8d9c8')};
  transition: background 0.3s;
`;

const MobileBr = styled.br`
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const PCBr = styled.br`
  display: block;

  @media (max-width: 768px) {
    display: none;
  }
`;
