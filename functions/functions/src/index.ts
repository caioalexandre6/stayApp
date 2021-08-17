//importes de bibliotecas
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from "body-parser";
import * as cors from 'cors';

//Iniciar o firebase para acesssar seus serviços
admin.initializeApp(functions.config().firebase);


//initialize express server
const app = express();
const main = express();

// Adicionando o caminho para receber a requisição como Json 
main.use('/api/v1', app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));



// initialize the database and the collection 
const db = admin.firestore();
const produtoCollection = 'produtos';

// Definir o nome da função do Google Cloud Functions
export const webApi = functions.https.onRequest(main);

interface Produtos {
    produtoCategoria: String,
    produtoNome: String,
    produtoPreco: number,
    produtoId: String,
}



const allowedOrigins = ['https://stayapp-4ad22.firebaseapp.com'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

app.use(cors(options));

// Criar um novo produto
app.post('/produtos', async (req, res) => {
    try {
        const produto: Produtos = {
            produtoCategoria: req.body['produtoCategoria'],
            produtoNome: req.body['produtoNome'],
            produtoPreco: req.body['produtoPreco'],
            produtoId: req.body['produtoId']
        }

        await db.collection(produtoCollection).doc(req.body['produtoId']).set(produto);
        res.status(201).send(`Novo produto criado! ${produto.produtoId}`);
    } catch (error) {
        res.status(400).send(`Produto should cointain firstName, lastName, email, areaNumber, department, id and contactNumber!!!`)
    }
});

// Obter todos os produtos
app.get('/produtos', async (req, res) => {
    try {
        const produtoQuerySnapshot = await db.collection(produtoCollection).get();
        const produtos: any[] = [];
        produtoQuerySnapshot.forEach(
            (doc)=>{
                produtos.push({
                    id: doc.id,
                    data:doc.data()
            });
            }
        );
        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).send(error);
    }
});

//Obter produto único
app.get('/produtos/:produtoId', (req,res) => {

    const produtoId = req.params.produtoId; 
    db.collection(produtoCollection).doc(produtoId).get()
    .then(produto => {
        if(!produto.exists) throw new Error('Produto not found');
        res.status(200).json({id:produto.id, data:produto.data()})})
    .catch(error => res.status(500).send(error));
        
});


// Delete um produto
app.delete('/produtos/:produtoId', (req, res) => {
    db.collection(produtoCollection).doc(req.params.produtoId).delete()
    .then(()=>res.status(204).send("Document successfully deleted!"))
    .catch(function (error) {
            res.status(500).send(error);
    });
})

// Atualizar um produto
app.put('/produtos/:produtoId', async (req, res) => {
    await db.collection(produtoCollection).doc(req.params.produtoId).set(req.body,{merge:true})
    .then(()=> res.json({id:req.params.produtoId}))
    .catch((error)=> res.status(500).send(error))

});