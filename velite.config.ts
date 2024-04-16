import { defineCollection, defineConfig, s } from "velite";

// `s` is extended from Zod with some custom schemas,
// you can also import re-exported `z` from `velite` if you don't need these extension schemas.

const computedFields = <T extends { slug: string }>(data: T) => ({
  ...data,
  slugAsParams: data.slug.split("/").slice(1).join("/"),
});
const posts = defineCollection({
  name: "Post", // collection type name
  pattern: "content/**/*.mdx", // content files glob pattern
  schema: s
    .object({
      slug: s.path(), // slug: s.path(), // auto generate slug from file path
      title: s.string().max(99), // Zod primitive type
      description: s.string().max(999).optional(),
      date: s.isodate(), // input Date-like string, output ISO Date string.
      published: s.boolean().default(true), // input boolean, output boolean.
      body: s.mdx(),
    })
    .transform(computedFields), // computed fields
});

export default defineConfig({
  root: "src", // project root,
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { posts },
  mdx: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});
