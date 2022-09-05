const { faker } = require('@faker-js/faker/locale/vi');
const fs = require('fs');

const randomCategories = (n) => {
    let categoryList = [];
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
            categoryList.push(category);
        });
    }
    return categoryList;
};

const randomProducts = (categoryLists, n) => {
    let productList = [];
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
                    code: faker.random.alpha({ count: 6, casing: 'upper' }),
                    name: faker.commerce.product(),
                    defaultPrice,
                    salePrice: Math.floor((defaultPrice * (100 - salePercent)) / 100),
                    salePercent,
                    categoryId: item.id,
                    description: faker.commerce.productDescription(),
                    imageUrl: faker.image.nature(600, 600, true),
                    rating: faker.mersenne.rand(6, 4),
                    totalRating: faker.mersenne.rand(100, 4),
                    status: randomStatus[Math.floor(Math.random() * 2)],
                };
                productList.push(product);
            });
        });
    }

    return productList;
};

const randomDepartments = (n) => {
    let departmentList = [];
    if (n <= 0) {
        return [];
    } else {
        Array.from(new Array(n)).forEach(() => {
            const city = faker.address.city();
            const randomStatus = ['OPENED', 'READY', 'ACTIVE'];
            const department = {
                id: faker.datatype.uuid(),
                name: `SPORTSTORE - ${city}`,
                address: `${faker.address.buildingNumber()}, ${city}`,
                mapAddress: 'https://g.page/HUMG1?share',
                tel: faker.phone.number('+84 #########'),
                email: `sport${faker.random.numeric(3)}@gmail.com`,
                status: randomStatus[Math.floor(Math.random() * 3)],
                open: {
                    hours: faker.random.numeric(1, {
                        bannedDigits: ['0', '1', '2', '3', '4', '5', '6', '9'],
                    }),
                    minutes:
                        faker.random.numeric(1, {
                            bannedDigits: ['6', '7', '8', '9'],
                        }) + faker.random.numeric(),
                },
                closed: {
                    hours: faker.random.numeric(1, {
                        bannedDigits: ['0', '1', '2', '3', '4', '5', '6', '9'],
                    }),
                    minutes:
                        faker.random.numeric(1, {
                            bannedDigits: ['6', '7', '8', '9'],
                        }) + faker.random.numeric(),
                },
            };
            departmentList.push(department);
        });
    }
    return departmentList;
};

// IFFE
const generateData = () => {
    const categoryList = randomCategories(4);
    const productList = randomProducts(categoryList, 5);
    const departmentList = randomDepartments(6);
    const db = {
        categories: categoryList,
        products: productList,
        departments: departmentList,
        profile: {
            name: 'Helen',
        },
    };

    fs.writeFile('db.json', JSON.stringify(db), () => {
        console.log('🚀 ~ Generate data successfully!');
    });
};

generateData();
