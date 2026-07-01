import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBlogPosts, getBlogCategories } from '../data/blogData';

export default function Blog() {
  const posts = getBlogPosts();
  const categories = getBlogCategories();

  useEffect(() => {
    const isBrowser = () => typeof window !== 'undefined';
    if (!isBrowser()) return;
    const existing = document.getElementById('blog-schema');
    if (existing) existing.remove();

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Blog CIV-Alerts',
      description: 'Analyses, enquêtes et articles sur les enjeux civiques en Côte d\'Ivoire.',
      url: 'https://civ-alerts.onrender.com/blog',
      publisher: {
        '@type': 'Organization',
        name: 'CIV-Alerts',
      },
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'blog-schema';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      const s = document.getElementById('blog-schema');
      if (s) s.remove();
    };
  }, []);

  return (
    <div className="min-h-screen pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        <nav className="flex items-center gap-2 text-[11px] text-gray-400 font-semibold mb-8">
          <Link to="/" className="hover:text-ciGreen transition-colors">Accueil</Link>
          <span>/</span>
          <span className="text-gray-600">Blog</span>
        </nav>

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-ciGreen/10 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-ciGreen border border-ciGreen/20 mb-4">
            Actualités & Analyses
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-ciDark mb-4">
            Blog <span className="text-ciOrange">CIV-Alerts</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Analyses, enquêtes et informations sur les défis urbains et sectoriels en Côte d'Ivoire.
            Informez-vous pour mieux signaler.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map(cat => (
            <span key={cat} className="px-4 py-2 bg-gray-100 rounded-xl text-xs font-bold uppercase tracking-wider text-gray-600">
              {cat}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <Link
              key={post.id}
              to={`/blog/${post.id}`}
              className="group bg-gray-50 rounded-3xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-xl hover:border-gray-300 transition-all duration-300 flex flex-col"
            >
              <div className="h-1.5 bg-gradient-to-r from-ciGreen to-ciOrange"></div>
              <div className="p-6 sm:p-8 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] font-black uppercase tracking-wider text-ciGreen bg-ciGreen/10 px-2.5 py-1 rounded-lg">
                    {post.category}
                  </span>
                  <span className="text-[10px] text-gray-400 font-semibold">{post.readTime}</span>
                </div>

                <h2 className="text-lg font-black text-ciDark mb-3 group-hover:text-ciGreen transition-colors leading-tight">
                  {post.title}
                </h2>

                <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-ciGreen rounded-full flex items-center justify-center text-[8px] font-black text-white">
                      CA
                    </div>
                    <span className="text-[11px] text-gray-400 font-semibold">{post.date}</span>
                  </div>
                  <span className="text-[11px] text-gray-400">{post.author}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-16 bg-gradient-to-br from-ciGreen to-green-700 rounded-3xl p-8 sm:p-12 text-white">
          <h2 className="text-2xl font-black mb-3">Vous avez un problème à signaler ?</h2>
          <p className="text-white/80 max-w-lg mx-auto mb-6">
            Utilisez CIV-Alerts pour signaler les dysfonctionnements dans votre localité
            et contribuer à l'amélioration de notre cadre de vie.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-white text-ciGreen px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-gray-100 transition-all shadow-lg"
          >
            Faire un signalement
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
