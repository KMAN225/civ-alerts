import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBlogPost, getBlogPosts } from '../data/blogData';

const siteUrl = 'https://civ-alerts.onrender.com';

function AuthorBio() {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl border border-gray-200 p-6 sm:p-8 mt-8">
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 bg-ciGreen rounded-2xl flex items-center justify-center text-xl font-black text-white flex-shrink-0">
          CA
        </div>
        <div>
          <h4 className="text-sm font-black text-ciDark mb-1">CIV-Alerts</h4>
          <p className="text-xs text-gray-400 font-semibold mb-2">Équipe éditoriale</p>
          <p className="text-sm text-gray-500 leading-relaxed">
            La rédaction de CIV-Alerts est composée de citoyens engagés et de spécialistes
            des politiques publiques ivoiriennes. Nos articles sont basés sur des faits vérifiés
            et des sources officielles, dans le but d'informer et de mobiliser les citoyens
            pour l'amélioration de leur cadre de vie en Côte d'Ivoire.
          </p>
        </div>
      </div>
    </div>
  );
}

function ShareButtons({ title, url }) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex items-center gap-3 mt-8 pt-8 border-t border-gray-200">
      <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Partager</span>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xs font-bold hover:bg-blue-700 transition-all"
        title="Partager sur Facebook"
      >
        f
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 h-9 bg-black rounded-xl flex items-center justify-center text-white text-xs font-bold hover:bg-gray-800 transition-all"
        title="Partager sur X (Twitter)"
      >
        X
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 h-9 bg-blue-700 rounded-xl flex items-center justify-center text-white text-xs font-bold hover:bg-blue-800 transition-all"
        title="Partager sur LinkedIn"
      >
        in
      </a>
      <a
        href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 h-9 bg-green-600 rounded-xl flex items-center justify-center text-white text-xs font-bold hover:bg-green-700 transition-all"
        title="Partager sur WhatsApp"
      >
        W
      </a>
    </div>
  );
}

function NewsletterCTA() {
  return (
    <div className="bg-gradient-to-br from-ciGreen to-green-700 rounded-3xl p-6 sm:p-8 text-white mt-8 text-center">
      <h3 className="text-lg font-black mb-2">Restez informé</h3>
      <p className="text-sm text-white/80 mb-4 max-w-md mx-auto">
        Recevez nos derniers articles et analyses directement par email.
      </p>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
      >
        <input
          type="email"
          placeholder="votre@email.com"
          className="flex-1 px-4 py-3 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
          required
        />
        <button
          type="submit"
          className="px-6 py-3 bg-ciOrange text-white rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-amber-600 transition-all whitespace-nowrap"
        >
          S'abonner
        </button>
      </form>
      <p className="text-[10px] text-white/50 mt-3">Pas de spam. Désabonnement à tout moment.</p>
    </div>
  );
}

export default function BlogPost() {
  const { id } = useParams();
  const post = getBlogPost(id);
  const allPosts = getBlogPosts();

  useEffect(() => {
    if (!post) return;
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.excerpt,
      author: {
        '@type': 'Organization',
        name: 'CIV-Alerts',
        url: siteUrl,
      },
      publisher: {
        '@type': 'Organization',
        name: 'CIV-Alerts',
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/favicon.svg`,
        },
      },
      datePublished: post.datePublished || post.date,
      dateModified: post.datePublished || post.date,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${siteUrl}/blog/${post.id}`,
      },
      articleSection: post.category,
      inLanguage: 'fr-CI',
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    script.id = 'article-schema';
    const old = document.getElementById('article-schema');
    if (old) old.remove();
    document.head.appendChild(script);
    return () => { const s = document.getElementById('article-schema'); if (s) s.remove(); };
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen pt-28 pb-16 flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-4">📄</p>
          <h1 className="text-2xl font-black text-ciDark mb-2">Article non trouvé</h1>
          <p className="text-gray-500 mb-6">Cet article n'existe pas ou a été retiré.</p>
          <Link to="/blog" className="inline-flex items-center gap-2 bg-ciGreen text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-ciDark transition-all">
            Retour au blog
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = allPosts
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 2);

  const articleUrl = `${siteUrl}/blog/${post.id}`;

  return (
    <div className="min-h-screen pt-28 pb-16">
      <article className="max-w-3xl mx-auto px-6">
        <nav className="flex items-center gap-2 text-[11px] text-gray-400 font-semibold mb-6 flex-wrap">
          <Link to="/" className="hover:text-ciGreen transition-colors">Accueil</Link>
          <span>/</span>
          <Link to="/blog" className="hover:text-ciGreen transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-gray-600 truncate max-w-[200px]">{post.title}</span>
        </nav>

        <div className="bg-gray-50 rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-ciGreen to-ciOrange"></div>
          <div className="p-8 sm:p-12">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <Link
                to="/blog"
                className="text-[10px] font-black uppercase tracking-wider text-ciGreen bg-ciGreen/10 px-2.5 py-1 rounded-lg hover:bg-ciGreen/20 transition-colors"
              >
                {post.category}
              </Link>
              <span className="text-[11px] text-gray-400 font-semibold">{post.readTime}</span>
              <span className="text-[11px] text-gray-300">•</span>
              <span className="text-[11px] text-gray-400 font-semibold">Publié le {post.date}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-ciDark mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center gap-3 pb-8 mb-8 border-b border-gray-200">
              <div className="w-10 h-10 bg-ciGreen rounded-2xl flex items-center justify-center text-sm font-black text-white">
                CA
              </div>
              <div>
                <p className="text-sm font-bold text-ciDark">{post.author}</p>
                <p className="text-[11px] text-gray-400">Équipe éditoriale · {post.date}</p>
              </div>
            </div>

            <div
              className="prose-civ"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <AuthorBio />
            <ShareButtons title={post.title} url={articleUrl} />
          </div>
        </div>
      </article>

      <NewsletterCTA />

      {relatedPosts.length > 0 && (
        <div className="max-w-6xl mx-auto px-6 mt-12">
          <h2 className="text-2xl font-black text-ciDark mb-6 text-center">
            Articles <span className="text-ciOrange">recommandés</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {relatedPosts.map(rp => (
              <Link
                key={rp.id}
                to={`/blog/${rp.id}`}
                className="group bg-gray-50 rounded-3xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="h-1 bg-gradient-to-r from-ciGreen to-ciOrange"></div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-ciGreen bg-ciGreen/10 px-2 py-0.5 rounded-lg">
                      {rp.category}
                    </span>
                  </div>
                  <h3 className="text-base font-black text-ciDark group-hover:text-ciGreen transition-colors leading-tight mb-2">
                    {rp.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2">{rp.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
