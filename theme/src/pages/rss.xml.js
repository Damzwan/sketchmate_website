import rss from '@astrojs/rss';
import settings from '../config/settings';

export function get(context) {
    const postImportResult = import.meta.glob('./blog/posts/*.{md,mdx}', {eager: true});
    const posts = Object.values(postImportResult);
    const site = context.site.toString()
    const siteUrl = site.endsWith('/') ? site.slice(0, -1) : site;
    return rss({
        title: settings.title,
        description: settings.description,
        site: context.site,
        items: posts.map((post) => ({
            link: post.url,
            content: `<img src="${siteUrl}${post.frontmatter.featuredImage}" alt="Image found" style="max-width:540px; height:auto;"/>`,
            ...post.frontmatter,
        })),
    });
}
