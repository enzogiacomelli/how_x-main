const produtoRouter = require('express').Router()
const Produto = require('../models/Produto')
const Fornecedor = require( '../models/Fornecedor')


//1. POST
produtoRouter.post('/produto', async(req, res)=>{
        // #swagger.tags = ['Produto']
        // #swagger.description = 'Endpoint para cadastro de Produto.'

    // req.body
    const {codigoBarras, nomeProduto, descricao, especificacao, cnpjFornecedor} = req.body
    console.log('Especificação: ' + especificacao.toString())

    //valida informacoes
    if(!codigoBarras || !nomeProduto || !descricao || !especificacao || !cnpjFornecedor){
        console.log('Envio de produto com campo nulo. Cancelando operação')
        res.status(422).json({error: 'Os campos codigoBarras, nome, descricao, especificação e fornecedor são obrigatorios!'})
    } else {
    
        fornecedor = await Fornecedor.findOne({cnpj: cnpjFornecedor})
    
        if(!fornecedor){
            res.status(422).json({error: 'Empresa não cadastrada! Informe um Fornecedor válido.'})
            console.log('Fornecedor não encontrado')
        } else {
            console.log('Id do fornecedor:' + fornecedor.id)
            fornecedor = fornecedor.id

            // cria objeto
            const produto = {
                codigoBarras, 
                nomeProduto, 
                descricao,                 
                especificacao,
                fornecedor
            }

            // cria registro
            try {
                //await produto.create(produto)
                await Produto.create(produto)
                res.status(201).json({message: 'Registro inserido com sucesso!'})
                console.log('Criando registro: ' + produto.codigoBarras + ', ' + produto.nomeProduto + ', ' + produto.descricao + ', ' + produto.especificacao + ', ' + produto.fornecedor)
            } catch (error) {
                res.status(500).json({error: error})
                console.log('Erro ao criar registro: ' + error)
            }
                

        }
        
    }

})

// 2. GET
produtoRouter.get('/produto', async (req, res)=> {
        // #swagger.tags = ['Produto']
        // #swagger.description = 'Endpoint para consulta de Produtos.'

    try {
        
        const produtos = await Produto.find({inativo: "false"},{_id: 0, inativo: 0, __v: 0}).
        populate('fornecedor',{_id: 0, inativo: 0, __v: 0}).exec(function(err,fornecedor){
            if (err) return handleError(err)
                console.log('Fabricante: ' + fornecedor)
                res.status(200).json(fornecedor)
        })
        //res.status(200).json(produtos)
        

    } catch (error) {
        res.status(500).json({error: error})
        console.log('Erro ao consultar registros: ' + error)
    }
})

// 3. GET POR código de barras
produtoRouter.get('/produto/:codigoBarras', async (req, res)=> {
    // #swagger.tags = ['Produto']
    // #swagger.description = 'Endpoint para consulta de Produto por código de barras.'

    try {
        const pid = req.params.codigoBarras
        console.log('Consultando produto: ' + pid)

        Produto.findOne({codigoBarras: pid, inativo: "false"},{_id: 0, inativo: 0, __v: 0}).
        populate('fornecedor',{_id: 0, inativo: 0, __v: 0}).exec(function(err,fornecedor){
            if (err) return handleError(err)
                console.log('Fabricante: ' + fornecedor)
                res.status(200).json(fornecedor)
        })
        
    } catch (error) {
        res.status(500).json({error: error})
        console.log('Erro ao consultar produto por código de barras: ' + error)
    }
})

// 4. UPDATE - ID
produtoRouter.patch('/produto/id/:id', async (req, res)=>{
    // #swagger.tags = ['Produto']
    // #swagger.description = 'Endpoint para atualização de Produto por ID.'
    const id = req.params.id
    const {codigoBarras, nomeProduto, descricao, especificacao, cnpjFornecedor} = req.body

    if(!codigoBarras || !nomeProduto || !descricao || !especificacao || !cnpjFornecedor){
        console.log('Envio de produto com campo nulo. Cancelando operação')
        res.status(422).json({error: 'Os campos codigo_barras, nome, descricao, especificação e fornecedor são obrigatorios!'})
    } else {
    
        fornecedor = await Fornecedor.findOne({cnpj: cnpjFornecedor})
    
        if(!fornecedor){
            res.status(422).json({error: 'Empresa não cadastrada! Informe um Fornecedor válido.'})
            console.log('Fornecedor não encontrado')
        } else {
            console.log('Id do fornecedor:' + fornecedor.id)
            fornecedor = fornecedor.id

            // cria objeto
            const produto = {
                codigoBarras, 
                nomeProduto, 
                descricao, 
                especificacao, 
                fornecedor
            }

            // atualiza o registro
            try {
                await Produto.updateOne({_id: id}, produto)
                res.status(201).json({message: 'Registro '+ id +' atualizado com sucesso!'})
                console.log('Atualizando registro: '+ id + produto.codigoBarras + ', ' + produto.nomeProduto + ', ' + produto.descricao + ', ' + produto.especificacao + ', ' + produto.fornecedor)
            } catch (error) {
                res.status(500).json({error: error})
                console.log('Erro ao atualizar o registro: ' + error)
            }
        }  
    }
})

// 5. UPDATE - Código de Barras
produtoRouter.patch('/produto/codigoBarras/:codigoBarras', async (req, res)=>{
    // #swagger.tags = ['Produto']
    // #swagger.description = 'Endpoint para atualização de Produto por Código de Barras.'
    const cod = req.params.cod
    const {codigoBarras, nomeProduto, descricao, especificacao, cnpjFornecedor} = req.body

    if(!codigoBarras || !nomeProduto || !descricao || !especificacao || !cnpjFornecedor){
        console.log('Envio de produto com campo nulo. Cancelando operação')
        res.status(422).json({error: 'Os campos codigo_barras, nome, descricao, especificação e fornecedor são obrigatorios!'})
    } else {
    
        fornecedor = await Fornecedor.findOne({cnpj: cnpjFornecedor})
    
        if(!fornecedor){
            res.status(422).json({error: 'Empresa não cadastrada! Informe um Fornecedor válido.'})
            console.log('Fornecedor não encontrado')
        } else {
            console.log('Id do fornecedor:' + fornecedor.id)
            fornecedor = fornecedor.id

            // cria objeto
            const produto = {
                codigoBarras, 
                nomeProduto, 
                descricao, 
                especificacao, 
                fornecedor
            }

            // atualiza o registro
            try {
                await Produto.updateOne({codigoBarras: cod}, produto)
                res.status(201).json({message: 'Registro '+ cod +' atualizado com sucesso!'})
                console.log('Atualizando registro: '+ id + produto.codigoBarras + ', ' + produto.nomeProduto + ', ' + produto.descricao + ', ' + produto.especificacao + ', ' + produto.fornecedor)
            } catch (error) {
                res.status(500).json({error: error})
                console.log('Erro ao atualizar o registro: ' + error)
            }
        }  
    }
})

// 6. DELETE por código de barras
produtoRouter.delete('/produto/codigoBarras/:codigoBarras', async(req, res)=>{
    // #swagger.tags = ['Produto']
    // #swagger.description = 'Endpoint para exclusão de Produto por código de barras.'
    const cod = req.params.codigoBarras

    //procura o registro
    const produto = await Produto.findOne({codigoBarras: cod})

    //verifica se existe o registro
    if(!produto){
        res.status(422).json({message: 'Registro não encontrado!'})
        return
    }


    //deleta o registro
    try {
        await Produto.deleteOne({codigoBarras: cod}, produto)
        res.status(201).json({message: 'Produto ' + cod + ' removido com sucesso!'})
    } catch (error) {
        res.status(500).json({error: error})
        console.log('Ocorreu um erro ou o registro informado não existe: ' + error)
    }
})


// 7. DELETE por id
produtoRouter.delete('/produto/id/:id', async(req, res)=>{
    // #swagger.tags = ['Produto']
    // #swagger.description = 'Endpoint para exclusão de Produto por ID.'
    const id = req.params.id

    //procura o registro
    const produto = await Produto.findOne({_id: id})

    //verifica se existe o registro
    if(!produto){
        res.status(422).json({message: 'Registro não encontrado!'})
        return
    }


    //deleta o registro
    try {
        await Produto.deleteOne({_id: id}, produto)
        res.status(201).json({message: 'Produto ' + id + ' removido com sucesso!'})
    } catch (error) {
        res.status(500).json({error: error})
        console.log('Ocorreu um erro ou o registro informado não existe: ' + error)
    }
})



module.exports = produtoRouter