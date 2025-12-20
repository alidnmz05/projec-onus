import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaUsers, FaLightbulb, FaHeart } from 'react-icons/fa';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const About = () => {
  const [contents, setContents] = useState<any>({
    title: 'Hakkımızda',
    mainText: 'ONUS Mutfak & Banyo olarak, modern tasarım ve fonksiyonelliğin buluştuğu, yaşam alanlarınıza şıklık ve konfor getiren özel çözümler sunuyoruz.',
    slogan: 'Doğanın Çırağı, Ahşabın Ustası',
    description: 'Yılların deneyimi ve sektördeki uzmanlığımızla, hayalinizdeki yaşam alanlarını gerçeğe dönüştürüyoruz. Kaliteli malzeme, profesyonel ekip ve mükemmel işçilik garantisi sunuyoruz.',
    experienceYears: '15+'
  });

  useEffect(() => {
    fetchContents();
  }, []);

  const fetchContents = async () => {
    try {
      const response = await axios.get(`${API_URL}/pagecontents?page=about`);
      if (response.data && response.data.length > 0) {
        const data = response.data;
        const newContents: any = {};
        
        data.forEach((item: any) => {
          if (item.order === 1) newContents.mainText = item.content;
          if (item.order === 2) newContents.slogan = item.content;
          if (item.order === 3) newContents.description = item.content;
          if (item.order === 4) newContents.experienceYears = item.content;
        });
        
        setContents({ ...contents, ...newContents });
      }
    } catch (error) {
      console.error('Error fetching about contents:', error);
    }
  };
  const values = [
    {
      icon: FaCheckCircle,
      title: 'Kalite',
      description: 'En yüksek kalite standartlarında çalışıyoruz',
    },
    {
      icon: FaUsers,
      title: 'Müşteri Odaklı',
      description: 'Müşterilerimizin memnuniyeti önceliğimiz',
    },
    {
      icon: FaLightbulb,
      title: 'İnovasyon',
      description: 'Yenilikçi tasarım ve çözümler sunuyoruz',
    },
    {
      icon: FaHeart,
      title: 'Tutku',
      description: 'İşimizi tutkuyla yapıyor, detaylara önem veriyoruz',
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20">
      {/* Hero Section */}
      <section className="section-padding mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold text-dark-900 mb-6">
              Hakkımızda
            </h1>
            <p className="text-xl text-dark-600 leading-relaxed mb-6">
              {contents.mainText}
            </p>
            <p className="text-lg text-dark-600 leading-relaxed mb-6">
              "{contents.slogan}" sloganımızla doğal malzemeleri en iyi şekilde 
              işleyerek, size özel tasarımlar oluşturuyoruz. Her proje bizim için bir sanat eseridir.
            </p>
            <p className="text-lg text-dark-600 leading-relaxed">
              {contents.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80"
              alt="About ONUS"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-primary-600 text-white p-8 rounded-xl shadow-xl">
              <div className="text-4xl font-bold mb-2">{contents.experienceYears}</div>
              <div className="text-lg">Yıllık Deneyim</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding py-20 bg-gradient-to-b from-gray-50 to-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-dark-900 mb-4">
            Değerlerimiz
          </h2>
          <p className="text-lg text-dark-600 max-w-2xl mx-auto">
            Çalışmalarımızı şekillendiren temel değerlerimiz
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-8 shadow-lg text-center hover:shadow-2xl transition-shadow"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <value.icon className="text-primary-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-dark-900 mb-3">
                {value.title}
              </h3>
              <p className="text-dark-600">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team or Process Section */}
      <section className="section-padding py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-dark-900 mb-4">
            Çalışma Sürecimiz
          </h2>
          <p className="text-lg text-dark-600 max-w-2xl mx-auto">
            Profesyonel yaklaşımımız ile projelerinizi hayata geçiriyoruz
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              step: '01',
              title: 'Keşif ve Danışmanlık',
              description: 'İhtiyaçlarınızı dinliyor, ücretsiz keşif yapıyoruz.',
            },
            {
              step: '02',
              title: 'Tasarım ve 3D Görsel',
              description: 'Size özel tasarım ve 3D görselleştirme sunuyoruz.',
            },
            {
              step: '03',
              title: 'Üretim ve Montaj',
              description: 'Profesyonel üretim ve kusursuz montaj ile teslim.',
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <div className="text-6xl font-bold text-primary-100 mb-4">
                {item.step}
              </div>
              <h3 className="text-2xl font-bold text-dark-900 mb-3">
                {item.title}
              </h3>
              <p className="text-dark-600 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
