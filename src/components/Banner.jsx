"use client"

import Image from "next/image";
import banner from "@/assets/banner.jpg";
import { useBuscarBanners } from "@/hooks/bannerHooks";
import { Carousel, ConfigProvider } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const PrevArrow = (props) => {
  const { currentSlide, slideCount, className, style, onClick, ...rest } = props;
  return (
    <div className={className} style={style} onClick={onClick} {...rest}></div>
  );
};

const NextArrow = (props) => {
  const { currentSlide, slideCount, className, style, onClick, ...rest } = props;
  return (
    <div className={className} style={style} onClick={onClick} {...rest}></div>
  );
};

const Banner = () => {
  const { data: banners } = useBuscarBanners();
  return (
    <ConfigProvider
      theme={{
        components: {
          Carousel: {
            arrowSize: 40,
            arrowOffset: 20,
          },
        },
      }}
    >
      <Carousel autoplay={{ dotDuration: true }} autoplaySpeed={4000} arrows prevArrow={<PrevArrow />} nextArrow={<NextArrow />} >
        {(banners || []).map((banner) => (
          <img
            key={banner.id}  
            className="h-screen object-cover"
            src={banner.imagem}
            alt="banner1"
          />
        ))}
      </Carousel>
    </ConfigProvider>
  );
};

export default Banner;
