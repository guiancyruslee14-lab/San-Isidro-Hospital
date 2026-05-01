import { createContext, useState, useEffect, ReactNode, useContext } from 'react';

export interface Post {
  id: string;
  title: string;
  category: string;
  date: string;
  content: string;
  imageUrl: string;
}

const INITIAL_POSTS: Post[] = [
  {
    id: '1',
    title: "Celebrating Women's Month",
    category: "Events & Campaigns",
    date: "2026-03-01",
    content: "Join us this month as we offer free consultation and discounted OB-GYN packages to celebrate Women's Month. Visit our Maternity and Women's Health wing to avail of these special promos.",
    imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: '2',
    title: "Daily Digest: Recognizing Early Signs of Flu",
    category: "Daily Digest",
    date: "2026-05-01",
    content: "Flu season is approaching. Learn the early symptoms and when you should visit the emergency room vs staying hydrated at home. If symptoms persist for more than 3 days, consult a physician immediately.",
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5e4719c8f?auto=format&fit=crop&q=80&w=800"
  }
];

interface PostContextType {
  posts: Post[];
  addPost: (post: Omit<Post, 'id' | 'date'>) => void;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export function PostProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>(() => {
    try {
      const saved = localStorage.getItem('siha_posts');
      return saved ? JSON.parse(saved) : INITIAL_POSTS;
    } catch {
      return INITIAL_POSTS;
    }
  });

  useEffect(() => {
    localStorage.setItem('siha_posts', JSON.stringify(posts));
  }, [posts]);

  const addPost = (newPost: Omit<Post, 'id' | 'date'>) => {
    const post: Post = {
      ...newPost,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0]
    };
    setPosts([post, ...posts]);
  };

  return (
    <PostContext.Provider value={{ posts, addPost }}>
      {children}
    </PostContext.Provider>
  );
}

export const usePosts = () => {
  const context = useContext(PostContext);
  if (!context) throw new Error("usePosts must be used within PostProvider");
  return context;
};
