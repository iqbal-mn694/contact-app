const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const port = 3000

const { PrismaClient } = require('@prisma/client')
const { name } = require('ejs')
const prisma = new PrismaClient()

// use body parser middleware
app.use(bodyParser.urlencoded( { extended: true}));
app.use(bodyParser.json())


app.set('view engine', 'ejs')

// contact
app.get('/', async (req, res) => {
    try {
        const contact = await prisma.contact.findMany({  
            include: {
                group: true,
                label: true
            },
        })
        // res.send(contact)
        res.render('index', { data: contact })
    } catch (err) {
        res.send(err)        
    }
})

app.post('/contact/add-contact', async (req, res) => {
    try {
        const contact = await prisma.contact.create({
            data: {
                name: req.body.name,
                number: req.body.number,
                notes: req.body.notes,
                profile_pict: "haha.jpg",
                label: {
                    create: {
                        label_name: "default"
                    }
                },
                group: {
                    create: {
                        group_name: req.body.group
                    }
                }
            }
        })

        res.send('Sukses Menambahkan Kontak')
    } catch (err) {
        res.send(req.body)
    }

})
// end contact

// label
app.post('/contact/add-label', async (req, res) => {
    try {
        const label = await prisma.label.create({
            data: {
                label_name: req.body.label
            }
        })
        res.send("Sukses Menambahkan Label")
    } catch (err) {
        res.send(err)        
    }
})

app.listen(port, () => {
    console.log(`Running on port ${port}`)
})
