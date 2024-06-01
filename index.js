const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')

const port = 3000

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const app = express()

// image upload config
const imageUploadConfig = require('./contact_modules/imageUploadConfig')

// use body parser middleware
app.use(bodyParser.urlencoded( { extended: true}));
app.use(bodyParser.json())
app.use(cors())
app.use(express.static('public'))


app.set('view engine', 'ejs')

/** 
 * Contact Endpoint
 * Create, Read, Update, Destroy(CRUD)
 */
app.get('/', async (req, res) => {
    try {
        const contact = await prisma.contact.findMany({ 
            where: {
                deletedAt: null
            },
            include: {
                group: true,
                label: true
            },
        })
        const trash = await prisma.contact.findMany({
            where: {
                deletedAt: {
                    not: null
                }
            },
    
            include: {
                group: true,
                label: true
            }
        })
        // res.send(contact)
        res.render('index', { data: contact , trash})
    } catch (err) {
        res.send(err)        
    }
})

// temporary
app.get('/home', async (req, res) => {
    try {
        const contact = await prisma.contact.findMany({  
            include: {
                group: true,
                label: true
            },
        })
        // res.send(contact)
        res.render('temporaryhome', { data: contact })
    } catch (err) {
        res.send(err)        
    }
})


// mengambil detail kontak dengan memasukkan id contact
app.get('/contact/detail/:id', async (req, res) => {
    try {
        const contact = await prisma.contact.findFirst({
            where: {
                id: parseInt(req.params.id)
            },

             // melakukan join dengan tabel group dan label
             include: {
                label: true,
                group: true
            }   
        })

        res.send(contact)
    } catch (err) {
        res.send(err)
    }
})

// melakukan pencarian kontak
app.get('/contact/result', async(req, res) => {
    try {
        // untuk menampilkan data contact dari database
        const contact = await prisma.contact.findMany({
            // untuk memfilter nama kontak apakah dimulai dengan karakter tertentu atau apakah berisi karakter tertentu 
            where: {
                OR: [
                    {
                    name: {
                        startsWith: `\\_${req.query.name}`,
                    }
                },
                {
                    name: {
                        contains: req.query.name
                    }
                },
            ],
            AND: [
                { 
                    deletedAt: null
                }
            ]
            },
            
            // melakukan join dengan tabel group dan label
            include: {
                label: true,
                group: true
            }            
        })

        const trash = await prisma.contact.findMany({
            where: {
                deletedAt: {
                    not: null
                }
            },
    
            include: {
                group: true,
                label: true
            }
        })
        // res.send(contact)
        res.render('index', { data: contact, trash })
    } catch (err) {
        res.send()        
    }
})

// menampilkan form kontak
app.get('/contact/new', (req, res) => {
    res.render('addContact')

})

// menghandle data form contact yang dikirim user
app.post('/contact/new', imageUploadConfig.single('image'), async (req, res) => {
    try {
        // melakukan insert ke tabel contact beserta valuenya
        const contact = await prisma.contact.create({
            data: {
                name: req.body.name,
                number: parseInt(req.body.number), // konversi dari string ke integer
                notes: req.body.notes,
                profile_pict: `Uploads/${req.file.filename}`,

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

        res.send("Sukses menambahkan kontak")
    } catch (err) {
        res.send(err)
        // console.log(typeof(req.body.number))
    }

})

// melakukan penghapusan sementara dengsn menggunakan teknik soft delete
app.get('/contact/temp-delete/:id', async(req, res) => {
    const remove = await prisma.contact.update({
          where: { id: parseInt(req.params.id) },
          data: { deletedAt: new Date()}
        });
    
    if(remove) res.redirect('/')
})

// melakukan penghapusan permanen
app.get('/contact/permanently-delete/:id', async(req, res) => {
    const deleteContact = await prisma.contact.delete({
        where: { 
            id: parseInt(req.params.id)
        }
    })

    if(deleteContact) res.redirect('/')
})


/** 
 * Contact Endpoint
 * Recycle Bin Operator
 */
// tempah sampah
app.get('/contact/trash', async(req, res) => {
    const trash = await prisma.contact.findMany({
        where: {
            deletedAt: {
                not: null
            }
        },

        include: {
            group: true,
            label: true
        }
    })

    res.send(trash)
})

// restore specific contact
app.get('/contact/restore/:id', async (req, res) => {
    const restoreSpecific = await prisma.contact.update({
        where: { 
            id: parseInt(req.params.id)
        },
        data: {
            deletedAt: null 
        }
    })
})

// restore all contact
app.get('contact/restore', async (req, res) => {
    const restore = await prisma.contact.updateMany({
        where: {
            deletedAt: {
                not: null
            }
        },
        data: {
            deletedAt: null
        }
    })

    if(restore) res.redirect('/')
})


/** 
 * Contact Endpoint
 * Contact Group
 */
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
