import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import 'swiper/css';
import 'swiper/css/pagination';

const Testimonials = () => {
  const { t } = useTranslation();
  const testimonials = [
    {
      name: t('testimonials.customer1.name'),
      role: t('testimonials.customer1.role'),
      image: 'https://randomuser.me/api/portraits/women/1.jpg',
      rating: 5,
      text: t('testimonials.customer1.text'),
    },
    {
      name: t('testimonials.customer2.name'),
      role: t('testimonials.customer2.role'),
      image: 'https://randomuser.me/api/portraits/men/2.jpg',
      rating: 5,
      text: t('testimonials.customer2.text'),
    },
    {
      name: t('testimonials.customer3.name'),
      role: t('testimonials.customer3.role'),
      image: 'https://randomuser.me/api/portraits/women/3.jpg',
      rating: 5,
      text: t('testimonials.customer3.text'),
    },
    {
      name: t('testimonials.customer4.name'),
      role: t('testimonials.customer4.role'),
      image: 'https://randomuser.me/api/portraits/men/4.jpg',
      rating: 5,
      text: t('testimonials.customer4.text'),
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-dark-900 mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-lg text-dark-600 max-w-2xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </motion.div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 h-full"
              >
                <FaQuoteLeft className="text-primary-200 text-4xl mb-6" />
                
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-lg" />
                  ))}
                </div>

                <p className="text-dark-700 leading-relaxed mb-6 italic">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center mt-auto">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-dark-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-dark-500 text-sm">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
