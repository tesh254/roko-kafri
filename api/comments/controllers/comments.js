"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async by_article(ctx) {
    const comments = await strapi.query("comments").find({
      article: ctx.params.article_id,
    });

    ctx.send(comments);
  },
};
