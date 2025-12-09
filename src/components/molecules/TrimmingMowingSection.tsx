// src/components/TrimmingMowingSection.tsx
import React, { useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import { useInViewOnce } from '../../hooks/useInViewOnce';

type BeforeAfterKey = 'before' | 'ongoing' | 'after';

export default function TrimmingMowingSection() {
  /* ---------------------------- 공통 이미지 ---------------------------- */
  const TOP_IMAGES = [
    '/images/trimming_mowing/1.jpg',
    '/images/trimming_mowing/2.jpg',
    '/images/trimming_mowing/3.jpg',
    '/images/trimming_mowing/4.jpg',
    '/images/trimming_mowing/5.jpg',
    '/images/trimming_mowing/6.jpg',
    '/images/trimming_mowing/7.jpg',
    '/images/trimming_mowing/8.jpg',
  ];

  /* ---------------------------- 웹용 Before/After ---------------------------- */
  const WEB_BEFORE = [
    '/images/trimming_mowing/web_before_1.jpg',
    '/images/trimming_mowing/web_before_2.jpg',
    '/images/trimming_mowing/web_before_3.jpg',
    '/images/trimming_mowing/web_before_4.jpg',
  ];

  const WEB_AFTER = [
    '/images/trimming_mowing/web_after_1.jpg',
    '/images/trimming_mowing/web_after_2.jpg',
    '/images/trimming_mowing/web_after_3.jpg',
    '/images/trimming_mowing/web_after_4.jpg',
  ];

  /* ---------------------------- 모바일용 Before/After ---------------------------- */
  const MOBILE_IMAGES: Record<BeforeAfterKey, string> = {
    before: '/images/trimming_mowing/mobile_before.jpg',
    ongoing: '/images/trimming_mowing/mobile_ongoing.jpg',
    after: '/images/trimming_mowing/mobile_after.jpg',
  };

  const BEFORE_AFTER_ITEMS = [
    { key: 'before', label: '작업전' },
    { key: 'ongoing', label: '작업모습' },
    { key: 'after', label: '작업후' },
  ];

  /* ---------------------------- PC 슬라이드 (4장씩) ---------------------------- */
  const [pcIndex, setPcIndex] = useState(0);
  const maxPcIndex = Math.ceil(TOP_IMAGES.length / 4);

  const [mobileIndex, setMobileIndex] = useState(0);
  const maxMobileIndex = Math.ceil(TOP_IMAGES.length / 4);
  const touchStartX = useRef<number | null>(null);

  const prevPc = () =>
    setPcIndex((prev) => {
      if (prev === 0) return prev; // 맨 왼쪽 → 멈춤
      return prev - 1;
    });

  const nextPc = () =>
    setPcIndex((prev) => {
      if (prev === maxPcIndex - 1) return prev; // 맨 오른쪽 → 멈춤
      return prev + 1;
    });

  /* ---------------------------- 모바일 슬라이드 (4장씩, 2x2) ---------------------------- */

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;

    const diff = e.changedTouches[0].clientX - touchStartX.current;

    if (diff > 50) {
      // 이전 그룹
      setMobileIndex((prev) => {
        if (prev === 0) return prev; // 첫 그룹이면 멈춤
        return prev - 1;
      });
    } else if (diff < -50) {
      // 다음 그룹
      setMobileIndex((prev) => {
        if (prev === maxMobileIndex - 1) return prev; // 마지막 그룹이면 멈춤
        return prev + 1;
      });
    }
  };

  /* ---------------------------- 모바일 BA 탭 ---------------------------- */
  const [baMobileTab, setBaMobileTab] = useState<BeforeAfterKey>('before');

  /* ---------------------------- inView 훅 ---------------------------- */
  const { ref: textRef, inView: textInView } = useInViewOnce();
  const { ref: pcRef, inView: pcInView } = useInViewOnce();
  const { ref: mobileRef, inView: mobileInView } = useInViewOnce();
  const { ref: baHeaderRef, inView: baHeaderInView } = useInViewOnce();
  const { ref: baMobileRef, inView: baMobileInView } = useInViewOnce();
  const { ref: baDesktopRef, inView: baDesktopInView } = useInViewOnce();

  return (
    <Section>
      <Inner>
        {/* ------------------- TEXT ------------------- */}
        <TextBlock ref={textRef} $inView={textInView}>
          <Title>전지 및 예초공사</Title>
          <SubTitle>수목 전지, 잔디예초, 제초 작업</SubTitle>

          <Description>
            아파트, 학교, 기업을 대상으로 수목 전지,
            <MobileBr /> 교육 전정, 잔디예초, 잡초 제거를
            <MobileBr /> 통해 <WebBr /> 안전하고 깨끗한 정원관리.
            <br />
            <MobileBr />
            수목 상태 진단과 적절한 약제 처방으로 <MobileBr />
            건강한 나무성장 관리(수목 병충해 방제)
          </Description>
        </TextBlock>

        {/* ------------------- PC 슬라이드 ------------------- */}
        <PcSliderWrapper ref={pcRef} $inView={pcInView}>
          <ArrowLeft onClick={prevPc} />
          <ArrowRight onClick={nextPc} />

          <PcViewport>
            <PcSlider style={{ transform: `translateX(-${pcIndex * 100}%)` }}>
              {Array.from({ length: maxPcIndex }).map((_, groupIndex) => (
                <PcGroup key={groupIndex}>
                  {TOP_IMAGES.slice(groupIndex * 4, groupIndex * 4 + 4).map(
                    (src, i) => (
                      <PcImgItem key={i}>
                        <img src={src} alt={`작업 이미지 ${i + 1}`} />
                      </PcImgItem>
                    ),
                  )}
                </PcGroup>
              ))}
            </PcSlider>
          </PcViewport>
        </PcSliderWrapper>

        {/* ------------------- MOBILE 슬라이드 (2x2) ------------------- */}
        <MobileSliderWrapper
          ref={mobileRef}
          $inView={mobileInView}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <MobileSlider
            style={{ transform: `translateX(-${mobileIndex * 100}%)` }}
          >
            {Array.from({ length: maxMobileIndex }).map((_, groupIndex) => (
              <MobileGrid key={groupIndex}>
                {TOP_IMAGES.slice(groupIndex * 4, groupIndex * 4 + 4).map(
                  (src, i) => (
                    <MobileImage
                      key={i}
                      src={src}
                      alt={`작업 이미지 ${groupIndex * 4 + i + 1}`}
                    />
                  ),
                )}
              </MobileGrid>
            ))}
          </MobileSlider>
        </MobileSliderWrapper>

        <MobileDots>
          {Array.from({ length: maxMobileIndex }).map((_, i) => (
            <Dot key={i} active={i === mobileIndex} />
          ))}
        </MobileDots>

        {/* ------------------- Before & After 제목 ------------------- */}
        <BAHeader ref={baHeaderRef} $inView={baHeaderInView}>
          <BATitle>Before& After</BATitle>
          <Underline />
        </BAHeader>

        {/* ------------------- MOBILE BA (탭 + 1장) ------------------- */}
        <MobileBA ref={baMobileRef} $inView={baMobileInView}>
          <Tabs>
            {BEFORE_AFTER_ITEMS.map((item) => (
              <Tab
                key={item.key}
                $active={baMobileTab === item.key}
                onClick={() => setBaMobileTab(item.key as BeforeAfterKey)}
              >
                {item.label}
              </Tab>
            ))}
          </Tabs>

          <BAImageWrapper>
            <BAImage src={MOBILE_IMAGES[baMobileTab]} />
          </BAImageWrapper>
        </MobileBA>

        {/* ------------------- PC BA (Before 2x2 → 화살표 → After 2x2) ------------------- */}
        <DesktopBA ref={baDesktopRef} $inView={baDesktopInView}>
          <BAWebRow>
            {/* BEFORE 2x2 + 캡션 */}
            <BAWebCol>
              <BAWebGrid>
                {WEB_BEFORE.map((src, i) => (
                  <BAWebImg key={i} src={src} alt={`작업전 이미지 ${i + 1}`} />
                ))}
              </BAWebGrid>
              <Caption>{'<작업전>'}</Caption>
            </BAWebCol>

            {/* 가운데 화살표 */}
            <BAArrowMiddle />

            {/* AFTER 2x2 + 캡션 */}
            <BAWebCol>
              <BAWebGrid>
                {WEB_AFTER.map((src, i) => (
                  <BAWebImg key={i} src={src} alt={`작업후 이미지 ${i + 1}`} />
                ))}
              </BAWebGrid>
              <Caption>{'<작업후>'}</Caption>
            </BAWebCol>
          </BAWebRow>
        </DesktopBA>
      </Inner>
    </Section>
  );
}

/* ------------------ 공통 fade-up 믹스인 ------------------ */

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

/* ------------------ STYLES ------------------ */

const Section = styled.section`
  width: 100%;
  padding: 235px 50px;
  display: flex;
  justify-content: center;
  background-color: #f5f5f5;

  @media (max-width: 768px) {
    padding: 180px 20px 144px;
  }
`;

const Inner = styled.div`
  width: 100%;
  max-width: 1200px;
`;

const TextBlock = styled.div<{ $inView?: boolean }>`
  margin-bottom: 64px;
  ${fadeUpMixin};

  @media (max-width: 768px) {
    text-align: center;
    padding: 0 20px;
  }
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
  margin-bottom: 20px;
  color: #282828;

  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 26px;
  }
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #8e8e8e;
`;

const WebBr = styled.br`
  display: block;
  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileBr = styled.br`
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`;

/* ------------------- PC SLIDER ------------------- */

const PcSliderWrapper = styled.div<{ $inView?: boolean }>`
  position: relative;
  max-width: 1200px;
  margin: 0 auto 80px;
  ${fadeUpMixin};

  @media (max-width: 768px) {
    display: none;
  }
`;

const PcViewport = styled.div`
  overflow: hidden;
  width: 100%;
`;

const PcSlider = styled.div`
  display: flex;
  transition: transform 0.5s ease;
`;

const PcGroup = styled.div`
  flex: 0 0 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4개 일렬 */
  gap: 24px;
`;

const PcImgItem = styled.div`
  img {
    width: 100%;
    height: auto;
  }
`;

const ArrowLeft = styled.button`
  position: absolute;
  top: 50%;
  left: -180px;
  transform: translateY(-50%);
  width: 96px;
  height: 120px;
  background: url('/images/leftArrow.png') center/contain no-repeat;
  border: none;
  cursor: pointer;
`;

const ArrowRight = styled(ArrowLeft)`
  left: auto;
  right: -180px;
  background: url('/images/rightArrow.png') center/contain no-repeat;
`;

/* ------------------- MOBILE SLIDER ------------------- */

const MobileSliderWrapper = styled.div<{ $inView?: boolean }>`
  display: none;

  @media (max-width: 768px) {
    display: block;
    overflow: hidden;
    width: 100%;
    ${fadeUpMixin};
  }
`;

const MobileSlider = styled.div`
  display: flex;
  width: 100%;
  transition: transform 0.35s ease-out;
`;

const MobileGrid = styled.div`
  flex: 0 0 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

const MobileImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const MobileDots = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 16px;
  }
`;

const Dot = styled.div<{ active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${(p) => (p.active ? '#0f4d18' : '#c8d9c8')};
`;

/* ------------------- BA COMMON ------------------- */

const BAHeader = styled.div<{ $inView?: boolean }>`
  text-align: center;
  margin: 120px 0 40px;
  ${fadeUpMixin};

  @media (max-width: 768px) {
    margin: 68px 0 54px;
  }
`;

const BATitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #005013;
  margin-bottom: 20px;
`;

const Underline = styled.div`
  width: 27px;
  height: 3px;
  background: #005013;
  margin: 0 auto;
`;

/* ------------------- MOBILE BA ------------------- */

const MobileBA = styled.div<{ $inView?: boolean }>`
  @media (min-width: 769px) {
    display: none;
  }

  @media (max-width: 768px) {
    ${fadeUpMixin};
  }
`;

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-bottom: 24px;
`;

const Tab = styled.button<{ $active?: boolean }>`
  border: none;
  background: none;
  font-size: 16px;
  font-weight: ${(p) => (p.$active ? 700 : 400)};
  color: ${(p) => (p.$active ? '#005013' : '#c0c0c0')};
`;

const BAImageWrapper = styled.div`
  width: 100%;
`;

const BAImage = styled.img`
  width: 100%;
  height: auto;
`;

/* ------------------- PC BA ------------------- */

const DesktopBA = styled.div<{ $inView?: boolean }>`
  display: none;

  @media (min-width: 769px) {
    display: block;
    margin-top: 40px;
    ${fadeUpMixin};
  }
`;

const BAWebRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 80px 1fr;
  gap: 40px;
  align-items: center;
`;

const BAWebCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BAWebGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

const BAWebImg = styled.img`
  width: 100%;
  height: auto;
`;

const BAArrowMiddle = styled.div`
  width: 27px;
  height: 60px;
  margin: 0 auto;
  background: url('/images/trimming_mowing/green_right_arrow.png')
    center/contain no-repeat;
`;

const Caption = styled.div`
  margin-top: 28px;
  font-size: 14px;
  font-weight: 700;
  color: #5b5b5b;
`;
