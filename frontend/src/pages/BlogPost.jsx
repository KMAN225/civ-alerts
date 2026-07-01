import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBlogPost, getBlogPosts } from '../data/blogData';

export default function BlogPost() {
  const { id } = useParams();
  const post = getBlogPost(id);
  const allPosts = getBlogPosts();

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

  return (
    <div className="min-h-screen pt-28 pb-16">
      <article className="max-w-3xl mx-auto px-6">
        <Link to="/blog" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ciGreen hover:text-ciDark transition-colors mb-8 group">
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Retour au blog
        </Link>

        <div className="bg-gray-50 rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-ciGreen to-ciOrange"></div>
          <div className="p-8 sm:p-12">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className="text-[10px] font-black uppercase tracking-wider text-ciGreen bg-ciGreen/10 px-2.5 py-1 rounded-lg">
                {post.category}
              </span>
              <span className="text-[11px] text-gray-400 font-semibold">{post.readTime}</span>
              <span className="text-[11px] text-gray-300">•</span>
              <span className="text-[11px] text-gray-400">{post.date}</span>
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
                <p className="text-[11px] text-gray-400">Équipe éditoriale</p>
              </div>
            </div>

            <div
              className="prose-civ"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <div className="max-w-6xl mx-auto px-6 mt-16">
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
