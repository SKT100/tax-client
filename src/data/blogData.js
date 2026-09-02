// src/data/blogData.js

const postModules = import.meta.glob("./posts/*.json", { eager: true });

export const BLOG_POSTS = Object.entries(postModules)
  .filter(([path]) => !path.includes(".gitkeep"))
  .map(([path, module]) => {
    const slug = path.replace("./posts/", "").replace(".json", "");
    return {
      slug,
      ...(module.default || module),
    };
  })
  .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));