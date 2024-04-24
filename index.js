// configuracao inicial
const express = require('express')
const mongoose = require('mongoose')


// importando dados da string de conexao
const db = require("./app.env.json")

// montando string de conexao
const dbString = `mongodb+srv://${db.user}:${encodeURIComponent(db.pass)}@${db.cluster}.${db.URL}/${db.database}?retryWrites=true&w=majority`

// inicializando express
const app = express()

// forma de ler json / middlewares
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

// rota inicial (default: http://URL_API/)
app.get('/', (req,res) =>{

    //mostrar req

    // res 
    console.log('Requisição em ./')
    res.json({message: 'Verifique os serviços disponiveis em /doc'})
})

// rotas da API
const fornecedor = require ('./routes/fornecedorRoutes')
app.use('/', fornecedor)

const produto = require ('./routes/produtoRoutes')
app.use('/', produto)

// documentacao Swagger Autogen
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

    // Habilitar para contexto /doc
    app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

    // Habilitar para contexto /
    //app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerFile))

// entregar uma porta
mongoose.connect(dbString)
    .then(() =>{
        console.log('Conectando ao MongoDB ...')
        app.listen(3300)
    })
    .catch((err) => console.log(err))
