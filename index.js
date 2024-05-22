const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const port = 3000

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// use body parser middleware
app.use(bodyParser.urlencoded( { extended: true}));
app.use(bodyParser.json())

// contact
app.get('/', async (req, res) => {
    // const contact = await prisma.contact.create({
    //     data: {
    //         name: "Iqbal",
    //         number: 23311,
    //         notes: "lorem ipsum",
    //         profile_pict: "haha",
    //         label: {
    //             create: {
    //                 label_name: "default"
    //             }
    //         }
    //     }
    // })
    try {
        const contact = await prisma.contact.findMany()
        res.send(contact)
    } catch (err) {
        res.send(err)        
    }
})

app.post('/add-contact', async (req, res) => {
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
