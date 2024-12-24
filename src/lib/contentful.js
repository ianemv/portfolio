import { createClient } from 'contentful';

const client = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
});

export const getProjects = async () => {
  try {
    const response = await client.getEntries({
      content_type: 'category',
      order: '-sys.createdAt',
    });

    return response.items.map((item) => ({
      id: item.sys.id,
      title: item.fields.title,
      intro: item.fields.intro,
      description: item.fields.description,
      screenshot: item.fields.screenshot?.fields?.file?.url,
      url: item.fields.url,
      stack: item.fields.stack,
      slug: item.fields.slug,
    }));
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};

export const getAboutContent = async () => {
  try {
    const response = await client.getEntries({
      content_type: 'about',
      limit: 1,
    });

    if (response.items.length > 0) {
      const about = response.items[0].fields;
      return {
        title: about.title,
        description: about.description,
        skills: about.skills,
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching about content:', error);
    return null;
  }
};

export const getPage = async (slug) => {
  try {
    const response = await client.getEntries({
      content_type: 'pages',
      'fields.slug': slug,
      limit: 1,
    });

    if (response.items.length > 0) {
      const page = response.items[0];
      return {
        title: page.fields.title,
        content: page.fields.content,
        slug: page.fields.slug,
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching page:', error);
    return null;
  }
};
