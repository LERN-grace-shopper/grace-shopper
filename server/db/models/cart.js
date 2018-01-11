const Sequelize = require('sequelize');
const db = require('../db');

const productOrder = db.define('prouct_order', {
    purchasePrice: {
        type: Sequelize.INTEGER
    }
});
// I havent yet added it, but we can add a getter method or a hook or something to get the product price AT THE TIME OF placing the order (or whatever), and store that as the purchase price in the cart (later)

module.exports = productOrder
