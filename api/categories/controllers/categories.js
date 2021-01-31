"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    let entities;

    entities = await strapi.services.categories.find(ctx.query);

    const categories = await entities.map((item) => {
      const _items = item.articles.filter(
        (article) => article.is_draft === false
      );

      return {
        ...item,
        articles: _items,
      };
    });

    return categories;
  },
};
