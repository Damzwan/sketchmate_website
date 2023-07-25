import rss from '@astrojs/rss';
import settings from '../config/settings';

export function get(context) {
    const postImportResult = import.meta.glob('./blog/posts/*.{md,mdx}', {eager: true});
    const posts = Object.values(postImportResult);
    const site = context.site.toString();
    const siteUrl = site.endsWith('/') ? site.slice(0, -1) : site;
    return rss({
        title: settings.title,
        description: settings.description,
        site: context.site,
        items: posts.map((post) => ({
            ...post.frontmatter,
            link: post.url,
            categories: post.frontmatter.tags,
            customData: `<media:content type="image/webp" url="${siteUrl}${post.frontmatter.featuredImage}" width="500" height="300"/>`,
        })),
        xmlns: {
            media: 'http://search.yahoo.com/mrss/'
        },
    });
}

