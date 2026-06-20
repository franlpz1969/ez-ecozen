import React from 'react';
import { NavLink } from 'react-router-dom';
import { blogPosts } from '../data/blogData';

const BlogPage: React.FC = () => {
  return (
    <div className="bg-background">
      {/* Encabezado */}
      <section className="bg-light py-10 md:py-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-dark tracking-tight">Nuestro Blog</h1>
          <p className="mt-2 text-base md:text-lg text-gray-700">
            Inspiración para un estilo de vida más consciente y armonioso.
          </p>
        </div>
      </section>

      {/* Grid de artículos */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {blogPosts.map((post) => (
              <div
                key={post.slug}
                className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col group"
              >
                <div className="overflow-hidden">
                  <NavLink to={`/blog/${post.slug}`}>
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </NavLink>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-sm text-gray-500 mb-2">
                    {post.date} por {post.author}
                  </p>
                  <h2 className="text-xl font-bold mb-3 text-dark flex-grow">
                    <NavLink to={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                      {post.title}
                    </NavLink>
                  </h2>
                  <p className="text-base text-gray-600 mb-4">{post.excerpt}</p>
                  <NavLink
                    to={`/blog/${post.slug}`}
                    className="font-bold text-primary hover:text-green-700 transition-colors mt-auto self-start"
                  >
                    Leer más &rarr;
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;