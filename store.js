const products_db = [
    {
        name: 'banana',
        price: 800,
        amount: 12,
    },
    {
        name: 'apple',
        price: 500,
        amount: 20,
    },
    {
        name: 'tomato',
        price: 900,
        amount: 10,
    },
]

const productAvailable = (name, amount) => {
    let product = products_db.find((obj) => {
        return obj.name === name
    })
    return product && product.amount >= amount
}

function addProduct(name, { amount, price }) {
    let product = products_db.find((obj) => {
        return obj.name === name
    })
    if (product) {
        let added = amount ?? 1
        product.amount += added
        console.log(
            `Operation Successful: Added ${added} amount of ${name} to the store`
        )
        if (price) {
            product.price = price
            console.log(
                `Operation Successful: Updated the price of ${name} to ${price}`
            )
        }
    } else {
        if (price) {
            products_db.push({
                name: name,
                price: price,
                amount: amount ?? 1,
            })
        } else {
            console.log(
                `Operation 'Adding ${name}' denied: Provide valid arguments`
            )
        }
    }
}

const updatePrice = (name, price) => {
    let product = products_db.find((obj) => {
        return obj.name === name
    })
    if (product) {
        product.price = price
        console.log(
            `Operation Successful: Updated the price of ${name} to ${price}`
        )
    } else {
        console.log(
            `Operation 'Updating price of ${name}' denied: There is no such product in the store.`
        )
    }
}

function removeProduct(name) {
    let index = products_db.findIndex((obj) => {
        return obj.name === name
    })
    if (index !== -1) {
        products_db.splice(index)
        console.log(`Operation Successful: Removed ${name} from the store`)
    }
}

function sellProduct(name, amount) {
    if (productAvailable(name, amount)) {
        let product = products_db.find((obj) => {
            return obj.name === name
        })
        product.amount -= amount
        let totalPrice = product.price * amount
        console.log(
            `Operation Successful: Sold ${amount} ${name}${
                amount > 1 ? 's' : ''
            } for the total of ${totalPrice} tenge`
        )
        return totalPrice
    }
    console.log(
        `Operation 'Selling ${amount} of ${name}' denied: Product is not available`
    )
    return 0
}

function listProducts() {
    let list = products_db.map((obj) => {
        return obj.name
    })
    return list
}

const filterProducts = (args) => {
    let list = products_db
    if (args.minAmount) {
        list = list.filter((product) => {
            return product.amount >= args.minAmount
        })
    }
    if (args.maxAmount) {
        list = list.filter((product) => {
            return product.amount <= args.maxAmount
        })
    }
    if (args.minPrice) {
        list = list.filter((product) => {
            return product.price >= args.minPrice
        })
    }
    if (args.maxPrice) {
        list = list.filter((product) => {
            return product.price <= args.maxPrice
        })
    }
    return list
}

module.exports = {
    productAvailable,
    addProduct,
    updatePrice,
    removeProduct,
    sellProduct,
    listProducts,
    filterProducts,
}
