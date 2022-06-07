const {
    productAvailable,
    addProduct,
    updatePrice,
    removeProduct,
    sellProduct,
    listProducts,
    filterProducts,
} = require('./store.js')
const authorize = require('./authorize.js')

const rl = require('readline-sync')

let accessGranted = false

console.log(`Please sign in.`)
let quit = false
while (!quit) {
    while (!accessGranted) {
        let username = rl.question(`\nUsername: `)
        let password = rl.question(`Password: `)
        accessGranted = authorize({ username, password })
        if (!accessGranted) {
            console.log(`Incorrect username or password. Please try again.`)
        }
    }
    console.log(`Welcome!`)

    let accessTime = Date.now()

    while (accessGranted) {
        console.log(
            `\nSelect the option and enter the number corresponding to the action:`
        )
        console.log(`-- 1. Check if a product is available.`)
        console.log(`-- 2. Add product to the store.`)
        console.log(`-- 3. Update the price of the product from the store.`)
        console.log(`-- 4. Remove the product from the store.`)
        console.log(`-- 5. Sell some product from the store.`)
        console.log(`-- 6. List all the products in the store.`)
        console.log(`-- 7. Filter products by price and/or quantity.`)
        console.log(`-- 8. Quit.`)
        let num = Number(rl.question(`Enter the number: `))
        let name, amount, price, args
        switch (num) {
            case 1:
                name = rl.question(`Product name (required): `)
                amount = Number(rl.question(`Amount of ${name} (optional): `))
                let available =
                    typeof amount === 'number' && amount > 0
                        ? productAvailable(name, amount)
                        : productAvailable(name, 0)
                console.log(
                    `Requested product is ${
                        available ? 'AVAILABLE.' : 'NOT AVAILABLE.'
                    }\n\n`
                )
                break
            case 2:
                name = rl.question(`Product name (required): `)
                args = {}
                price = Number(
                    rl.question(`Price of ${name} (optional: leave blank): `)
                )
                if (typeof price === 'number' && price > 0) {
                    args['price'] = price
                }
                amount = Number(
                    rl.question(`Amount of ${name} (optional: leave blank): `)
                )
                if (typeof amount === 'number' && amount > 0) {
                    args['amount'] = amount
                }
                addProduct(name, args)
                break
            case 3:
                name = rl.question(`Product name (required): `)
                price = Number(rl.question(`Price of ${name} (required): `))
                updatePrice(name, price)
                break
            case 4:
                name = rl.question(`Product name (required): `)
                removeProduct(name)
                break
            case 5:
                name = rl.question(`Product name (required): `)
                amount = Number(
                    rl.question(
                        `Quantity of ${name} you want to sell (required): `
                    )
                )
                sellProduct(name, amount)
                break
            case 6:
                console.log(listProducts())
                break
            case 7:
                args = {}
                let minAmount = Number(
                    rl.question(`Minimum quantity (optional: leave blank): `)
                )
                if (typeof minAmount === 'number' && minAmount > 0) {
                    args['minAmount'] = minAmount
                }
                let maxAmount = Number(
                    rl.question(`Maximum quantity (optional: leave blank): `)
                )
                if (typeof maxAmount === 'number' && maxAmount > 0) {
                    args['maxAmount'] = maxAmount
                }
                let minPrice = Number(
                    rl.question(`Minimum price (optional: leave blank): `)
                )
                if (typeof minPrice === 'number' && minPrice > 0) {
                    args['minPrice'] = minPrice
                }
                let maxPrice = Number(
                    rl.question(`Maximum price (optional: leave blank): `)
                )
                if (typeof maxPrice === 'number' && maxPrice > 0) {
                    args['maxPrice'] = maxPrice
                }
                console.log(filterProducts(args))
                break
            case 8:
                console.log('Goodbye!')
                accessGranted = false
                quit = true
                break
            default:
                console.log('Please select valid option.\n\n')
                break
        }
        if (Date.now() - accessTime > 60000) {
            accessGranted = false
        }
    }

    if (!quit) {
        console.log(`\nYour session is expired.\nPlease sign in again. \n`)
    }
}
