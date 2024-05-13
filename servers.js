const express = require('express')
const app = express()

const port = 3000

// 1. Be Polite, Greet the User
app.get('/greetings/:username', (req, res) => {
    const name = req.params.username
    res.send(`Hello there, ${name}!`);
});

// 2. Rolling the Dice

app.get('/roll/:number', (req, res) => {
    const number = parseInt(req.params.number)
    if (isNaN(number)) {
        return res.send("You need to give a number")
    } else {
        const randomNumber = Math.floor(Math.random() * (number + 1))
        return res.send(`Your Random Number is: ${randomNumber}`)
    }

})

// 3. I Want THAT One! 
const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

app.get('/collectibles/:index', (req, res) => {
    const index = parseInt(req.params.index)
    if (isNaN(index)) {
        return res.send("You need to give a number")
    } else if (index > (collectibles.length - 1)) {
        return res.send("I dont have that much stock, please try a lower number")
    } else {
        return res.send(`Soooo.. you want a ${collectibles[index].name}? for ${collectibles[index].price}$ it can be yours!`)
    }

})

// 4. Filter Shoes by Query Parameters
const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes', (req, res) => {

    let filteredShoes = shoes
    const minPrice = req.query['min-price']
    const maxPrice = req.query['max-price']
    const type = req.query['type']
    if (minPrice) {
        console.log(`min`);
        filteredShoes = filteredShoes.filter((shoe) => {
            return shoe.price >= minPrice
        })
    }
    if (maxPrice) {
        filteredShoes = filteredShoes.filter((shoe) => {
            return shoe.price <= maxPrice
        })
    }
    if (type) {
        
        filteredShoes = filteredShoes.filter((shoe) => {
            return shoe.type === type
        })
    }

    return res.send(filteredShoes)

})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})