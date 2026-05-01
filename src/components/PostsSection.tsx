import { usePosts } from '../context/PostContext';
import { Calendar, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function PostsSection() {
  const { posts } = usePosts();

  return (
    <section className="py-8 md:py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Hospital Updates & Digest</h2>
            <p className="text-slate-500 mt-2 text-sm font-medium leading-relaxed max-w-xl">
              Latest news, daily digests, and health alerts from our medical team. Stay informed on public health and hospital events.
            </p>
          </div>
          <Link to="/admin" className="hidden sm:flex text-[10px] font-bold text-blue-600 uppercase tracking-widest hover:text-blue-800 transition items-center gap-1">
            Admin Panel <ChevronRight className="w-4 h-4"/>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <article key={post.id} className="bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md hover:border-blue-300 transition-all group flex flex-col">
              <div className="h-48 overflow-hidden bg-slate-200 shrink-0">
                <img 
                  src={post.imageUrl || 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800'} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-center mb-4">
                  <span className="bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md">{post.category}</span>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5"/> {post.date}</span>
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">{post.title}</h3>
                <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed mb-4 flex-1">{post.content}</p>
                <div className="mt-auto">
                  <button className="text-xs font-bold text-slate-900 hover:text-blue-600 flex items-center gap-1 outline-none transition-colors">
                    Read More <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
