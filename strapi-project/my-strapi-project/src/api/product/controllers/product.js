'use strict';

/**
 * product controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::product.product');

module.exports = {
    async afterUpdate(event) {
      const io = strapi.plugin('io').io;
      io.emit('product_update', event.result);
    },
  };
  