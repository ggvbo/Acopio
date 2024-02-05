import { config } from "dotenv";
import express from "express";
import { PrismaClient } from "@prisma/client";

config();

const app = express();
const prisma = new PrismaClient();

const testAdmin = await prisma.user.create();

const testCenter = await prisma.center.create({ data: {
    name: "centro de prueba",
    lat: -41.26916,
    long: -72.997716,
    admin: testAdmin
}})

console.log(testCenter)

app.get('/centers', async (req, res) => {
    const centers = await prisma.center.findMany();
    res.contentType('application/json');
    res.send({
        status: "success",
        data: {
            centers: centers
        }
    });
})

app.listen(process.env.SERVER_PORT, () => {
    console.log("Listening to port %d", process.env.SERVER_PORT)
})