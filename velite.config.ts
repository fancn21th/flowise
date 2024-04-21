import { defineCollection, defineConfig, s } from "velite";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

// `s` is extended from Zod with some custom schemas,
// you can also import re-exported `z` from `velite` if you don't need these extension schemas.

const computedFields = <T extends { slug: string }>(data: T) => ({
  ...data,
  slugAsParams: data.slug.split("/").slice(1).join("/"),
});

const posts = defineCollection({
  name: "Post", // collection type name
  pattern: "blog/**/*.mdx", // content files glob pattern
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

/** @type {import('rehype-pretty-code').Options} */
const options = {
  // See Options section below.
  theme: "github-dark",
};

export default defineConfig({
  root: "src/content", // project root,
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { posts },
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [rehypePrettyCode, { theme: "github-dark" }],
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Link to section",
          },
        },
      ],
    ],
    remarkPlugins: [],
  },
});
