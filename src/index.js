import express from "express"; 
import ProductRouter from "./router/product.routes.js";
import CartRouter from "./router/cart.routes.js";

const app = express()
const PORT = 4000

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api/products", ProductRouter)
app.use("/api/cart", CartRouter)


app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`)
})