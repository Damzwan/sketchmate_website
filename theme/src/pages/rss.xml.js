import rss from '@astrojs/rss';
import settings from '../config/settings';

export function get(context) {
    const postImportResult = import.meta.glob('./blog/posts/*.{md,mdx}', {eager: true});
    const posts = Object.values(postImportResult);
    return rss({
        title: settings.title,
        description: settings.description,
        site: context.site,
        items: posts.map((post) => ({
            link: post.url,
            content: `<img src="${context.site}${post.frontmatter.heroImage}" alt="${post.frontmatter.title}"/>`,
            ...post.frontmatter,
        })),
    });
}
