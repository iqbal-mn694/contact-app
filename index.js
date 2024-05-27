const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

const port = 3000

const { PrismaClient } = require('@prisma/client')
const { name } = require('ejs')
const prisma = new PrismaClient()

// use body parser middleware
app.use(bodyParser.urlencoded( { extended: true}));
app.use(bodyParser.json())
app.use(cors())


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

// melakukan pencarian kontak
app.get('/contact', async(req, res) => {
    try {
        // untuk menampilkan data contact dari database
        const contact = await prisma.contact.findMany({
            // untuk memfilter nama kontak apakah dimulai dengan karakter tertentu atau apakah berisi karakter tertentu 
            where: {
                OR: [
                    {
                    name: {
                        startsWith: `\\_${req.query.nama}`,
                    }
                },
                {
                    name: {
                        contains: req.query.nama
                    }
                }
            ]
            },
            
            // melakukan join dengan tabel group dan contact
            include: {
                label: true,
                group: true
            }            
        })
        res.send(contact)
        // res.render('index', { data: contact })
    } catch (err) {
        res.send()        
    }
})

// untuk menampikan group yang telah dibuat user
app.get("contact/group", async(req, res) => {
    try {
        const contact = await prisma.group.findMany({
            // menampilkan hanya satu jenis grup jika terdapat grup yang duplikat  
            distinct: ['group_name'] 
        })
        res.send(contact)
        // res.render('index', { data: contact })
    } catch (err) {
        res.send(err)        
    }
})

// menampilkan form kontak
app.get('/contact/add-contact', (req, res) => {
    res.render('addContact')

})


// menghandle data form contact yang dikirim user
app.post('/contact/add-contact', async (req, res) => {
    try {
        // melakukan insert ke tabel contact beserta valuenya
        const contact = await prisma.contact.create({
            data: {
                name: req.body.name,
                number: parseInt(req.body.number), // konversi dari string ke integer
                notes: req.body.notes,
                profile_pict: "haha.jpg",

                // melakukan relasi ke tabel label dengan id label yang diselect
                label: {
                    connect: {
                        id: 3
                    }
                },

                // melakukan join tabel grup dengan tabel contact kemudian melakukan tambah grup berdasar inputan user
                group: {
                    create: {
                        group_name: req.body.group
                    }
                }
            }
        })

        res.send('Sukses Menambahkan Kontak')
    } catch (err) {
        res.send(err)
        // console.log(typeof(req.body.number))
    }

})

// menampilkan form label
app.get('/contact/add-label', async (req, res) => {
    res.render('addLabel')
})

// menghandle data form label yang dikirim user
app.post('/contact/add-label', async (req, res) => {
    try {
        const label = await prisma.label.create({
            data: {
                label_name: req.body.label
            }
        })
        res.send("Sukses Menambahkan Label")
    } catch (err) {
        // res.send(req.body)  
        console.log(req.body)      
    }
})

app.listen(port, () => {
    console.log(`Running on port ${port}`)
})
