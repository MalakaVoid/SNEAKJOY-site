const express = require('express');
const { getAllProducts } = require('../database/product_operations');

const router = express.Router();

let products = [
    {
        id: 1,
        title: 'NIKE AIR JORDAN',
        price: 10000,
        descriptionSmall: 'Оригинальные Nike Jordan 1 в красно белом окрасе',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi',
        mainImage: '/images/sneakers_product/orange_white/pngwing.com (11).png',
        supImage: '/images/sneakers_product/orange_white/orange_sneakers_jordan.png.png',
        sizes: [37, 38, 39, 40, 41],
    },
    {
        id: 2,
        title: 'NIKE JORDAN 1',
        price: 10000,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi',
        descriptionSmall: 'Оригинальные Nike Jordan 1 в красно белом окрасе',
        mainImage: '/images/sneakers_product/red_black/pngwing.com (6).png',
        supImage: '/images/sneakers_product/red_black/pngwing.com (3).png',
        sizes: [37, 38, 39, 40, 41],
    },
    {
        id: 3,
        title: 'NIKE JORDAN 1',
        price: 10000,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi',
        descriptionSmall: 'Оригинальные Nike Jordan 1 в красно белом окрасе',
        mainImage: '/images/sneakers_product/blue_black/pngwing.com (4).png',
        supImage: '/images/sneakers_product/blue_black/pngwing.com (8).png',
        sizes: [37, 38, 39, 40, 41],
    },
    {
        id: 4,
        title: 'NIKE JORDAN 1',
        price: 10000,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi',
        descriptionSmall: 'Оригинальные Nike Jordan 1 в красно белом окрасе',
        mainImage: '/images/sneakers_product/red_black_white/red_white_jordan_anfas.png',
        supImage: '/images/sneakers_product/red_black_white/red_sneakers_jordan.png',
        sizes: [37, 38, 39, 40, 41],
    },
    {
        id: 5,
        title: 'NIKE AIR JORDAN',
        price: 10000,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi',
        descriptionSmall: 'Оригинальные Nike Jordan 1 в красно белом окрасе',
        mainImage: '/images/sneakers_product/orange_white/pngwing.com (11).png',
        supImage: '/images/sneakers_product/orange_white/orange_sneakers_jordan.png.png',
        sizes: [37, 38, 39, 40, 41],
    },
    {
        id: 6,
        title: 'NIKE JORDAN 1',
        price: 10000,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi',
        descriptionSmall: 'Оригинальные Nike Jordan 1 в красно белом окрасе',
        mainImage: '/images/sneakers_product/red_black/pngwing.com (6).png',
        supImage: '/images/sneakers_product/red_black/pngwing.com (3).png',
        sizes: [37, 38, 39, 40, 41],
    },
    {
        id: 7,
        title: 'NIKE JORDAN 1',
        price: 10000,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi',
        descriptionSmall: 'Оригинальные Nike Jordan 1 в красно белом окрасе',
        mainImage: '/images/sneakers_product/blue_black/pngwing.com (4).png',
        supImage: '/images/sneakers_product/blue_black/pngwing.com (8).png',
        sizes: [37, 38, 39, 40, 41],
    },
    {
        id: 8,
        title: 'NIKE JORDAN 1',
        price: 10000,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi',
        descriptionSmall: 'Оригинальные Nike Jordan 1 в красно белом окрасе',
        mainImage: '/images/sneakers_product/red_black_white/red_white_jordan_anfas.png',
        supImage: '/images/sneakers_product/red_black_white/red_sneakers_jordan.png',
        sizes: [37, 38, 39, 40, 41],
    },

]

router.get('/', async function(req, res){
    let data = await getAllProducts();

    res.status(200).render('pages/catalogue', {
        settings:{
            title: 'Catalogue',
            isHeaderWhite: false
        },
        products: data

    });
});

module.exports = router;