"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

const INDEX = "dev_kafri";

module.exports = {
  lifecycles: {
    afterCreate(result, data) {
      strapi.services.algolia.saveObject(result, INDEX);
    },
    afterUpdate(result, params, data) {
      strapi.services.algolia.saveObject(result.INDEX);
    },
    afterDelete(result, params, data) {
      strapi.services.algolia.deleteObject(result.id, INDEX);
    },
  },
};
