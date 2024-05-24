const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

const main = async () => {
    try {
        const contact = await prisma.contact.create({
            data: {
                name: "asep",
                number: 62852,
                notes: "lorem ipsum",
                profile_pict: "haha.jpg",
                label: {
                  create: {
                    label_name: "default"
                  }
                },
                group: {
                  create: {
                    group_name: "bebas"
                  }
                } 
              },
          });
    }  catch(err) {
        console.log(err)
    }
}