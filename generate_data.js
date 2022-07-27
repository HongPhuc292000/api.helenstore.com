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
                const product = {
                    id: faker.datatype.uuid(),
                    name: faker.commerce.product(),
                    color: faker.color.human(),
                    price: parseFloat(faker.commerce.price()),
                    categoryId: item.id,
                    description: faker.commerce.productDescription(),
                    createAt: Date.now(),
                    updateAt: Date.now(),
                    imageUrl: faker.image.imageUrl(600, 600),
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
    const productLists = randomProducts(categoryLists, 4);

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
