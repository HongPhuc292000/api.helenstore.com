const { faker } = require('@faker-js/faker/locale/vi');
const fs = require('fs');

const randomCategories = (n) => {
    let categoryLists = [];
    if (n <= 0) {
        return [];
    } else {
        Array.from(new Array(n)).forEach(() => {
            const category = {
                id: faker.datatype.uuid(),
                name: faker.commerce.product(),
                createAt: Date.now(),
                updateAt: Date.now(),
            };
            categoryLists.push(category);
        });
    }
    return categoryLists;
};

const randomProducts = (categoryLists, n) => {
    let productLists = [];
    if (n <= 0) {
        return [];
    } else {
        Array.from(new Array(n)).forEach(() => {
            categoryLists.forEach((item) => {
                const defaultPrice = parseFloat(faker.commerce.price());
                const salePercent = faker.mersenne.rand(21, 8);
                const randomStatus = ['OUTSTOCK', 'INSTOCK'];
                const product = {
                    id: faker.datatype.uuid(),
                    name: faker.commerce.product(),
                    defaultPrice,
                    salePrice: Math.floor((defaultPrice * (100 - salePercent)) / 100),
                    salePercent,
                    categoryId: item.id,
                    description: faker.commerce.productDescription(),
                    imageUrl: faker.image.fashion(600, 600),
                    rating: faker.mersenne.rand(6, 4),
                    totalRating: faker.mersenne.rand(100, 4),
                    status: randomStatus[Math.floor(Math.random() * 2)],
                };
                productLists.push(product);
            });
        });
    }

    return productLists;
};

// IFFE
const generateData = () => {
    const categoryLists = randomCategories(4);
    const productLists = randomProducts(categoryLists, 5);

    const db = {
        categories: categoryLists,
        products: productLists,
        profile: {
            name: 'Helen',
        },
    };

    fs.writeFile('db.json', JSON.stringify(db), () => {
        console.log('🚀 ~ Generate data successfully!');
    });
};

generateData();
