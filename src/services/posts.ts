import { urlJoin } from '../utils';
import type { Post } from '../types';

export const getPosts = () => {
  const modules = import.meta.globEager('../posts/*.md');

  const posts: Post[] = Object.entries(modules)
    .map(([filepath, module]): Post => {
      const slug = urlJoin('/', filepath).replace(/\/\.\.(.*)(\.[^.]+$)/, '$1');
      const id = slug.split('/')[2];
      const { date } = module;
      const { metadata } = module;
      const { username } = module;
      const { html } = (module.default.render && module.default.render()) || '';

      return {
        id,
        date,
        slug,
        html,
        username,
        ...metadata
      };
    })
    .sort((a, b) => (a.publishedOn < b.publishedOn ? 1 : -1));

  return posts;
};

export const getPostbyId = (id: string) => {
  const posts = getPosts();
  const post = posts.find((p) => p.id === id);
  return post;
};
