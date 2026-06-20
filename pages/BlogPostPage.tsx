import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogPosts } from '../data/blogData';

const ContentRenderer: React.FC<{ content: string }> = ({ content }) => {
  const parseInlineFormatting = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  const paragraphs = content.split('\n').filter(p => p.trim() !== '');
  
  const elements: React.ReactNode[] = [];
  let currentList: string[] = [];

  const renderList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ol key={`list-${elements.length}`} className="list-decimal list-inside space-y-2 my-6 pl-4">
          {currentList.map((item, index) => (
            <li key={index}>{parseInlineFormatting(item)}</li>
          ))}
        </ol>
      );
      currentList = [];
    }
  };

  paragraphs.forEach((p, index) => {
    if (/^\d+\.\s/.test(p)) {
      currentList.push(p.replace(/^\d+\.\s/, ''));
    } else {
      renderList();
      elements.push(
        <p key={`p-${index}`} className="mb-6">{parseInlineFormatting(p)}</p>
      );
    }
  });

  renderList();

  return <>{elements}</>;
};


const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <section className="max-w-3xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-semibold text-dark mb-6">Artículo no encontrado</h1>
        <Link to="/blog" className="inline-flex items-center text-primary font-semibold hover:underline">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Volver al blog
        </Link>
      </section>
    );
  }

  const BackToBlogLink = () => (
     <Link to="/blog" className="inline-flex items-center text-primary font-semibold hover:underline">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Volver a todos los artículos
    </Link>
  );

  return (
    <section className="max-w-3xl mx-auto px-4 py-10 md:py-12">
      <div className="mb-10">
        <BackToBlogLink />
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold text-dark leading-tight tracking-tight">{post.title}</h1>
      <p className="text-sm text-gray-500 mt-2">
        Publicado el {post.date} por {post.author}
      </p>

      <img
        src={post.imageUrl}
        alt={post.title}
        className="w-full aspect-video object-cover rounded-xl mt-8 mb-8 shadow-lg"
      />

      <article className="text-base md:text-lg text-gray-700 leading-relaxed">
        <ContentRenderer content={post.content} />
      </article>

      <div className="mt-12 pt-8 border-t border-gray-200">
        <BackToBlogLink />
      </div>
    </section>
  );
};

export default BlogPostPage;