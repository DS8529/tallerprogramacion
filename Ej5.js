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

function operations(arr) {
    return arr
        .filter(product => product.product_price > 70000 && product.product_quantity < 100)
        .map(product => {
            
            const iva = product.product_price * 0.19;
            const ivaTotal = product.product_price + iva;
            return {
                ...product,  
                product_iva_value: iva,  
                product_total_value: ivaTotal,  
            };
        });
}

const result = operations(products);

console.log({result})