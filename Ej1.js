let products = [
    {
        id_product: 1,
        product_name: "Impresora",
        product_price: 250000,
        product_quantity: 25 
    },
    {
        id_product: 2,
        product_name: "Escaner",
        product_price: 120000,
        product_quantity: 15
    },
    {
        id_product: 3,
        product_name: "Computador",
        product_price: 1300000,
        product_quantity: 55 
    },
    {
        id_product: 4,
        product_name: "Modem",
        product_price: 100000,
        product_quantity: 35 
    }
];


function total(products) {

    const prices = products.reduce((total, product) => total + product.product_price, 0);

    const stock = products.reduce((total, product) => total + (product.product_price * product.product_quantity), 0);

    return {
        prices,
        stock
    };
}

const { prices, stock } = total(products);

console.log(`La suma de precios es: $ ${prices}`);  
console.log(`El valor del Stock: $ ${stock}`);