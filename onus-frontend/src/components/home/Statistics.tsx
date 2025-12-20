import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { FaProjectDiagram, FaUsers, FaAward, FaSmile } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const Statistics = () => {
  const { t } = useTranslation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const stats = [
    {
      icon: FaProjectDiagram,
      value: 500,
      suffix: '+',
      label: t('statistics.completedProjects'),
      color: 'from-red-500 to-red-600',
    },
    {
      icon: FaUsers,
      value: 350,
      suffix: '+',
      label: t('statistics.happyClients'),
      color: 'from-red-400 to-red-500',
    },
    {
      icon: FaAward,
      value: 15,
      suffix: '+',
      label: t('statistics.awards'),
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: FaSmile,
      value: 98,
      suffix: '%',
      label: t('statistics.satisfaction'),
      color: 'from-red-600 to-red-700',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-red-950 via-red-900 to-red-950 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="section-padding relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            {t('statistics.title')}
          </h2>
          <p className="text-lg text-red-100 max-w-2xl mx-auto">
            {t('statistics.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className={`w-20 h-20 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mb-6 mx-auto transform hover:scale-110 hover:rotate-6 transition-all duration-300 shadow-lg`}>
                <stat.icon className="text-white text-3xl" />
              </div>
              <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                {inView && (
                  <CountUp
                    start={0}
                    end={stat.value}
                    duration={2.5}
                    suffix={stat.suffix}
                  />
                )}
              </div>
              <p className="text-red-100 text-lg font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
