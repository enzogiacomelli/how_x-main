const fornecedorRouter = require('express').Router()
const Fornecedor = require('../models/Fornecedor')


// 1. POST
fornecedorRouter.post('/fornecedor', async(req, res)=>{
    	// #swagger.tags = ['Fornecedor']
        // #swagger.description = 'Endpoint para cadastro de Fornecedor.'

    // req.body
    const {cnpj,nome,nomeFantasia,descricao} = req.body
    

    //valida informacoes
    if(!cnpj || !nome || !nomeFantasia || !descricao){
        res.status(422).json({error: 'Os campos cnpj, nome, nomeFantasia e descricao são obrigatorios!'})
        return
    }
    
    // cria objeto
    const fornecedor = {
    cnpj,
    nome,
    nomeFantasia,
    descricao
    }

    // cria registro
    try {
        await Fornecedor.create(fornecedor)
        res.status(201).json({message: 'Registro inserido com sucesso!'})
        console.log('Criando registro: ' + fornecedor.cnpj + ', ' + fornecedor.nome + ', ' + fornecedor.nomeFantasia + ', ' + fornecedor.descricao)
    } catch (error) {
        res.status(500).json({error: error})
        console.log('Erro ao criar registro: ' + error)
    }

})

// 2. GET
fornecedorRouter.get('/fornecedor', async (req, res)=> {
        // #swagger.tags = ['Fornecedor']
        // #swagger.description = 'Endpoint para consulta de Fornecedor.'

    try {
        
        const fornecedores = await Fornecedor.find()
        res.status(200).json(fornecedores)
        console.log('Consultando Fornecedores')
        

    } catch (error) {
        res.status(500).json({error: error})
        console.log('Erro ao consultar registros: ' + error)
    }
})

//2.1 Get via CNPJ
fornecedorRouter.get('/fornecedor/cnpj/:cnpj', async (req, res)=> {
        // #swagger.tags = ['Fornecedor']
        // #swagger.description = 'Endpoint para consulta de Fornecedor por CNPJ.'
    const cnpj = req.params.cnpj
    console.log("CNPJ consultado: " + cnpj)

    function mascaraCnpj(valor) {
        return valor.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,"\$1.\$2.\$3\/\$4\-\$5");
    }
    
    const cnpjFormatado = mascaraCnpj(cnpj)
    console.log('CNPJ formatado: ' + cnpjFormatado)

    try {
        
        const fornecedor = await Fornecedor.findOne({cnpj: cnpjFormatado})
        if(!fornecedor){
            res.status(422).json({message: 'Fornecedor não encontrado!'})
            return
        }
        res.status(200).json(fornecedor)
        console.log('Consultando Fornecedor')
        

    } catch (error) {
        res.status(500).json({error: error})
        console.log('Erro ao consultar registros: ' + error)
    }
})

//2. Get via ID
fornecedorRouter.get('/fornecedor/id/:id', async (req, res)=> {
        // #swagger.tags = ['Fornecedor']
        // #swagger.description = 'Endpoint para consulta de Fornecedor por ID.'
    const id = req.params.id
    console.log("ID consultado: " + id)

    try {
        const fornecedor = await Fornecedor.findOne({_id: id})
        if(!fornecedor){
            res.status(422).json({message: 'Fornecedor não encontrado!'})
            return
        }
        res.status(200).json(fornecedor)
        console.log('Consultando Fornecedor')
        

    } catch (error) {
        res.status(500).json({error: error})
        console.log('Erro ao consultar registros: ' + error)
    }
})




// 3. Update(patch)
fornecedorRouter.patch('/fornecedor/:id', async(req, res)=>{
        // #swagger.tags = ['Fornecedor']
        // #swagger.description = 'Endpoint para atualização de Fornecedor por ID.'
    const id = req.params.id
    const {cnpj,nome,nomeFantasia,descricao} = req.body

    if(!cnpj || !nome || !nomeFantasia || !descricao){
        res.status(422).json({error: 'Os campos cnpj, nome, nomeFantasia e descricao são obrigatorios!'})
        return
    }
    
    const fornecedor = {
    cnpj,
    nome,
    nomeFantasia,
    descricao
    }

    try {
        await Fornecedor.updateOne({_id: id}, fornecedor)
        res.status(201).json({message: 'Registro do fornecedor '+ id +' atualizado com sucesso!'})
        console.log('Atualizando registro: ' + id + fornecedor.cnpj + ', ' + fornecedor.nome + ', ' + fornecedor.nomeFantasia + ', ' + fornecedor.descricao)
    } catch (error) {
        res.status(500).json({error: error})
        console.log('Erro ao atualizar o registro: ' + error)
    }
})


// 4. delete
fornecedorRouter.delete('/fornecedor/:id', async(req, res)=>{
        // #swagger.tags = ['Fornecedor']
        // #swagger.description = 'Endpoint para exclusão de Fornecedor por ID.'
    const id = req.params.id

    //procura o registro
    const fornecedor = await Fornecedor.findOne({_id: id})

    //verifica se existe o registro
    if(!fornecedor){
        res.status(422).json({message: 'Registro não encontrado!'})
        return
    }


    //deleta o registro
    try {
        await Fornecedor.deleteOne({_id: id}, fornecedor)
        res.status(201).json({message: 'Registro do fornecedor deletado com sucesso!'})
    } catch (error) {
        res.status(500).json({error: error})
        console.log('Ocorreu um erro ou o registro informado não existe: ' + error)
    }
})


module.exports = fornecedorRouter