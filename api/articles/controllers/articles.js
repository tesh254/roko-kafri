"use strict";

const { sanitizeEntity } = require("strapi-utils");
const algoliasearch = require("algoliasearch");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const CLIENT = algoliasearch("D1DYFB8N3H", "629c1e1a20f56d07f16e409e7006bf4d");
const INDEX = CLIENT.initIndex("dev_kafri");

module.exports = {
  async by_category(ctx) {
    const category = await strapi
      .query("categories")
      .findOne({ id: ctx.params.collection_id });

    const sanitized = sanitizeEntity(category, {
      model: strapi.models.categories,
    });

    const newView = parseInt(sanitized.views, 10) + 1;

    const updatedCategory = await strapi.query("categories").update(
      { id: sanitized.id },
      {
        views: newView,
      }
    );

    const articles = await strapi
      .query("articles")
      .find({ category: ctx.params.collection_id, is_draft: false });

    ctx.send({
      articles,
      category: updatedCategory,
    });
  },

  async by_slug(ctx) {
    const article = await strapi.query("articles").findOne({
      slug: ctx.params.slug,
    });

    ctx.send(article);
  },
  async by_author(ctx) {
    const articles = await strapi.query("articles").find({
      author: ctx.params.author_id,
      _sort: "created_at:desc",
      is_draft: false,
    });

    ctx.send({
      articles,
    });
  },

  async own_articles(ctx) {
    const articles = await strapi.query("articles").find({
      author: ctx.params.author_id,
      _sort: "created_at:desc",
    });

    ctx.send({
      articles,
    });
  },

  async search_articles(ctx) {
    const results = await strapi.query("articles").search({
      _q: ctx.request.body.query,
      _limit: ctx.query.limit || 50,
      is_draft: false,
    });

    ctx.send({
      hits: results.hits,
    });
  },

  async add_view(ctx) {
    const article = await strapi
      .query("articles")
      .findOne({ slug: ctx.params.slug });

    const sanitized = sanitizeEntity(article, {
      model: strapi.models.articles,
    });

    const newView = parseInt(sanitized.views, 10) + 1;

    const updatedArticle = await strapi.query("articles").update(
      { slug: sanitized.slug },
      {
        views: newView,
      }
    );

    ctx.send(updatedArticle);
  },

  async fetch_authors(ctx) {
    const authors = await strapi
      .query("user", "users-permissions")
      .find({ role: 5, _limit: ctx.query.$limit || 16 });

    return {
      authors,
    };
  },

  async find(ctx) {
    let entities;

    ctx.query = {
      ...ctx.query,
      is_draft: false,
    };

    if (ctx.query._q) {
      entities = await strapi.services.articles.search(ctx.query);
    } else {
      entities = await strapi.services.articles.find(ctx.query);
    }

    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.articles })
    );
  },
};
