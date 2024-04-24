const swaggerAutogen = require('swagger-autogen')()

const doc = {
    info: {
        version: "1.0.0",
        title: "API HOW X",
        description: "Documentação gerada automaticamente pelo módulo <b>swagger-autogen</b>."        
    },
    host: "localhost:3300",
    basePath: "/",
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    definitions: {
        Fornecedor: {
            cnpj: "04.403.408/0001-65",
            nome: "Panasonic do Brasil Limitada",
            nomeFantasia: "PANASONIC",
            descricao: "A Panasonic do Brasil atua com uma ampla gama de produtos desde Eletrodomésticos, Pilhas e Bateriais, Áudio e Vídeo, Telecomunicações, Broadcasting, Industrial e Acessórios."
        },
        Produto:{
            codigoBarras: "7896067203712",
            nomeProduto: "Pilha Alcalina Premium Panasonic AA LR6EGR/2B",
            descricao: "As Pilhas Alcalinas Premium Panasonic foram criadas para os momentos durarem mais.",
            especificacao: [{
                              modelo:"LR6EGR/2B",
                              paisOrigem: "Tailandia",
                              categoria: "Alcalina",
                              voltagem: "1,5V",
                              validade: "10 anos",
                              pilhasPorCartela: "2",
                              codEAN: "789 60672 0371-2",
                              classificacaoFiscal: "85061010"
            }],
            cnpjFornecedor: "6353524228d7a71a19419793",
        }
    }
    

}


const outputFile = './swagger_output.json'
const endpointsFiles = ['./routes/fornecedorRoutes.js','./routes/produtoRoutes.js']

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./index.js'); 
  });