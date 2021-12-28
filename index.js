import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import connectDB from './config/db/db.js'

import ProductRouter from './routers/ProductRouter.js'
import UserRouter from './routers/UserRouter.js'
import OrderRouter from './routers/OrderRouter.js'
import ChatRouter from './routers/ChatRouter.js'
import nodemailer from 'nodemailer'
import {createServer} from 'http'
// import {Server} from 'socket.io'

import {ConnectSocket} from './config/socket/socket.js'

import cloudinary from './config/cloudinary/cloudinary.js'
import PaymentRouter from './routers/PaymentRouter.js'
import SelectListrouter from './routers/SelectListRouter.js'
import ListTypeProductRouter from './routers/ListTypeProductRouter.js'

dotenv.config();
process.env.TOKEN_SECRET;

const app = express()
const PORT = process.env.PORT || 5000
const server = createServer(app)

ConnectSocket(server)
connectDB()

app.use(cors())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/products', ProductRouter)
app.use('/user', UserRouter)
app.use('/order', OrderRouter)
app.use('/chat', ChatRouter)
app.use('/payment', PaymentRouter)
app.use('/selectList', SelectListrouter)
app.use('/typeList', ListTypeProductRouter)

app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
})

app.post('/api/upload', async (req, res) => {
    try {
        const fileStr = req.body.data;
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'dev_setups',
        });
        console.log(uploadResponse);
        res.json({ msg: 'yaya' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
});

app.post("/send_mail", cors(), async (req, res) => {
	let { gmail } = req.body
	const transport = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
          user: "691ff66923d7cd",
          pass: "1cea8294d47aac"
        }
      });

	await transport.sendMail({
		from: process.env.MAIL_FROM,
		to: `${gmail}`,
		subject: "Thư cảm ơn",
		html: `<div className="email" style="
        border: 1px solid black;
        padding: 20px;
        font-family: sans-serif;
        line-height: 2;
        font-size: 20px; 
        ">
        <h2>Anh chị thân mến!</h2>
        <p>Nhân dịp năm mới sắp đến, chúng tôi muốn gửi sự biết ơn chân thành nhất dành cho bạn.
         Chúng tôi không thể có được ngày hôm nay nếu như không có bạn.
          Chúc bạn và gia đình năm mới an khang,thịnh vượng, một năm thành công.</p>
    
        <p>All the best, Happy New Year 🧧🎁🎉</p>
         </div>
    `
	})
})

server.listen(PORT, () => console.log(`server running on port ${PORT}`))