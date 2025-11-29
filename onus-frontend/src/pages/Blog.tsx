import { motion } from 'framer-motion';

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: 'Modern Mutfak Tasarım Trendleri 2024',
      excerpt: 'Mutfak tasarımında 2024 yılının en öne çıkan trendlerini ve modern yaklaşımları keşfedin.',
      image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=800&q=80',
      date: '15 Kasım 2024',
      category: 'Mutfak',
    },
    {
      id: 2,
      title: 'Küçük Banyolarda Alan Kullanımı',
      excerpt: 'Küçük banyolarda maksimum verimlilik için pratik çözümler ve tasarım önerileri.',
      image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80',
      date: '10 Kasım 2024',
      category: 'Banyo',
    },
    {
      id: 3,
      title: 'Doğal Ahşap Kullanımının Avantajları',
      excerpt: 'İç mekan tasarımında doğal ahşap malzeme kullanımının estetik ve fonksiyonel faydaları.',
      image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=800&q=80',
      date: '5 Kasım 2024',
      category: 'Mobilya',
    },
    {
      id: 4,
      title: 'Minimalist Tasarım İlkeleri',
      excerpt: 'Minimalist yaklaşımla şık ve fonksiyonel yaşam alanları oluşturmanın püf noktaları.',
      image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=800&q=80',
      date: '1 Kasım 2024',
      category: 'Tasarım',
    },
    {
      id: 5,
      title: 'Akıllı Ev Sistemleri ve Entegrasyonu',
      excerpt: 'Modern mutfak ve banyolarda akıllı teknoloji kullanımı ve entegrasyon rehberi.',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
      date: '28 Ekim 2024',
      category: 'Teknoloji',
    },
    {
      id: 6,
      title: 'Renk Seçimi ve Psikolojisi',
      excerpt: 'İç mekan tasarımında renk seçiminin önemi ve psikolojik etkileri üzerine.',
      image: 'https://images.unsplash.com/photo-1615875221248-e7696655a741?auto=format&fit=crop&w=800&q=80',
      date: '25 Ekim 2024',
      category: 'Tasarım',
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-display font-bold text-dark-900 mb-4">
            Blog
          </h1>
          <p className="text-xl text-dark-600 max-w-2xl mx-auto">
            Tasarım, trendler ve ipuçları hakkında yazılarımız
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-primary-100 text-primary-600 text-xs px-3 py-1 rounded-full font-semibold">
                    {post.category}
                  </span>
                  <span className="text-dark-400 text-sm">{post.date}</span>
                </div>
                <h2 className="text-xl font-bold text-dark-900 mb-3 group-hover:text-primary-600 transition-colors">
                  {post.title}
                </h2>
                <p className="text-dark-600 leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                <button className="text-primary-600 font-semibold hover:text-primary-700 transition-colors">
                  Devamını Oku →
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
