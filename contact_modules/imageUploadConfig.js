const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) { 
        const randomName = `${Date.now() + Math.round(Math.random() + 1e9)}.jpg`
        cb(null, randomName);
    },
    
})
const upload = multer({ storage: storage })

module.exports = upload