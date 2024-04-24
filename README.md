# HOW X

Projeto de API RESTful com Node.js e MongoDB
- Node 16
- Utiliza as bibliotecas Nodemon, Express e Mongoose



## Configurações

#### 1. Criar manualmente arquivo _app.env.json_ na pasta raiz informando os dados de conexão com o banco 
```json
{
"user": "",
"pass": "",
"database": "",
"cluster": "",
"URL":""
}
```

#### 2. Criar imagem:
  ```sh
  docker build -t api-ws-node-howx .
  ```
  
#### 3. Executar imagem:
  ```sh
  docker run --rm --name container-howx -d -p 3300:3300 api-ws-node-howx
  ```

#### 4. Acessar aplicação:

    http://localhost:3300

__Importante:__ *A cada alteração no código-fonte deve-se recriar a imagem e executá-la!*


#### 5. Parar container:
  ```sh
  docker stop container-howx
  ```

#### 5. Acessar container via bash:
  ```sh
docker exec -it container-howx bash
  ```

#### 7. Serviços disponíveis

    http://localhost:3300/doc