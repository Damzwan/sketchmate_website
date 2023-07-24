import rss, {pagesGlobToRssItems} from '@astrojs/rss';
import settings from '../config/settings';


export async function get(context) {
    return rss({
        title: settings.title,
        description: settings.description,
        site: context.site,
        items: await pagesGlobToRssItems(
            import.meta.glob('./blog/posts/*.{md,mdx}'),
        ),
    });
}