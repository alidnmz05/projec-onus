import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaPlay } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { useTranslation } from 'react-i18next';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

const Hero = () => {
  const { t } = useTranslation();
  
  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=2000&q=80',
      title: t('hero.title1'),
      subtitle: t('hero.subtitle1'),
      description: t('hero.description1'),
    },
    {
      image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=2000&q=80',
      title: t('hero.title2'),
      subtitle: t('hero.subtitle2'),
      description: t('hero.description2'),
    },
    {
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=80',
      title: t('hero.title3'),
      subtitle: t('hero.subtitle3'),
      description: t('hero.description3'),
    },
  ];

  return (
    <div className="relative h-screen">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-white/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative h-full section-padding flex items-center">
                <div className="max-w-4xl">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <motion.h1
                      className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold text-dark-900 mb-3 md:mb-4 drop-shadow-lg leading-tight"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {slide.title}
                    </motion.h1>
                    <motion.h2
                      className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-light text-primary-600 mb-4 md:mb-6 lg:mb-8 italic drop-shadow-md leading-tight"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      {slide.subtitle}
                    </motion.h2>
                    <motion.p
                      className="text-sm xs:text-base md:text-lg lg:text-xl text-dark-800 mb-6 md:mb-10 lg:mb-12 max-w-2xl leading-relaxed font-medium drop-shadow"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      {slide.description}
                    </motion.p>
                    <motion.div
                      className="flex flex-col xs:flex-row flex-wrap gap-3 md:gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <Link
                        to="/projeler"
                        className="group bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 hover:shadow-2xl hover:scale-105 text-sm md:text-base"
                      >
                        <span>{t('hero.exploreProjects')}</span>
                        <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                      <Link
                        to="/iletisim"
                        className="group bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border-2 border-white/30 px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2"
                      >
                        <span>{t('hero.contactUs')}</span>
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
              </div>

              {/* Animated Elements */}
              <motion.div
                className="absolute bottom-32 right-16 hidden lg:block"
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="w-32 h-32 border-4 border-primary-400/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <FaPlay className="text-white text-3xl ml-2" />
                </div>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-white/70 rounded-full" />
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
