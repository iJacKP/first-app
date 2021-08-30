const { json } = require('express');
const express = require('express');
const router = express.Router();



router.use(express.static('public'));
//especifica a pasta contendo arquivos estáticos.
//o nome 'public' não precisará ser colocado no inicio da rota que se refira a eles
// por padrão, se não houver conteúdo na rota para ser usado, vai ser o da pasta com conteudo estático padrão: public

//Exemplo de rotas:
/*
http://localhost:3000/css
http://localhost:3000/images
http://localhost:3000/index.html
*/

//método get: quando o usuário solicita conteúdo daquela rota ('/' nesse caso) a funcionalidade é executada
//os parametros na callback(req,res) são passados pelo método get: a requisição de info feita ao navegador e a resposta para ele. os nomes das var. não importam.
router.get('/', (req, res)=>{ 
    res.render('pages/home') //posso omitir a extensão (era pra ser home.ejs)
})

router.get('/about', (req,res)=>{
    res.render('pages/about')
});

router.get('/cadastro',(req,res)=>{
    //a funcao render pode receber um pametro na forma de objeto literal
    //no caso, ela irá receber um objeto com campo chamado users e com valor igual ao vetor users
    res.render('pages/cadastro', {users: users})
});

router.post('/cadastro/remove', (req,res)=>{
    let name = req.body.name; //exportamos, lá em script, a informação em forma de JSON para essa rota. dessa forma podemos acessar aqui a informação enviada de lá (estava na forma {name: nomeVariável})
    console.log(req.body)
    if(users.length==0){ //aqui testamos para o caso do vetor users não possuir usuários no momento:
        console.log("Erro: Não há elemento a ser removido!")
        return res.status(500).json({
            status:'error',
            error:`Removed element: ${name}`
        });

    } else { //caso ele tenha usuários vamos manipulá-lo
        for(let cont=0;cont<users.length;cont++){
            if(users[cont].name==name){ //procuramos (com o for) no vetor de usuários da lista se algum deles bate com o usuário que queremos excluir
                users.splice(cont,1); //achamos o usuário desejado-> vamos remover todos os itens relacionados a esse usuário (o objeto literal que corresponde a ele em users)
                console.log("Elemento Removido: ",name) //loga no console que deu certo e diz qual usuário foi deletado
                return res.status(200).json({ //outro ponto importante: aqui dizemos para o servidor que a operação foi concluída, mandando o status e um outro arquivo JSON(linguagem do servidor)
                    status:'sucess',            //indicando sucesso e contendo o novo array de usuários, agora atualizado(sem o usuário deletado)
                    data:users
                });
                //res.send(JSON.stringify({sucess:`Elemento removido com sucesso: ${name}`}));
            } else if(cont==users.length-1){ //se o for percorrer toda a lista e não achar, relatamos um erro(a mesma lógica acima)
                console.log("Erro ao remover elemento: ",name);
                return res.status(400).json({
                    status:'error',
                    error:`Didn't Remove element: ${name}`
                });
            }
        }
    }
});

router.post('/cadastro/update', (req,res)=>{
    //essa função substitui os valores armazenados no indice 'id' do vetor users por valores recebidos do navegador (armazenados em req.body)
    //recebe dados do cliente/navegador na forma de um objeto JSON (possui diversas propriedades (.name, .email, por exemplo) que podem ser acessadas diretamente)

    users[req.body.id].name=req.body.name; //req.body: objeto contendo toda a informação enviada | .name: uma das propriedades do 'objetão'
    users[req.body.id].email=req.body.email;
    users[req.body.id].address=req.body.address;
    users[req.body.id].age=req.body.age;
    users[req.body.id].heigth=req.body.heigth;
    users[req.body.id].vote=req.body.vote;


    res.sendStatus(200); //envia mensagem 200 significando que as modificacoes deram certo
    console.log("Dados recebidos: ",req.body);//mostra no console do servidor os dados recebidos
})

router.get('/listagem',(req,res)=>{
    // console.log("Olha a lista ae: ",users)
    console.log('listagem funcionando(RENDERIZANDO /LISTAGEM)')
    res.status(200).render('pages/listagem')
    // res.status(200).json({users: users})
    
});
router.get('/listagem/update',(req,res)=>{
    res.status(200).send(JSON.stringify({users: users}))
});

router.get('/api/listagem',(req,res)=>{
    res.status(200).json({
        status: 'success',
        data: users
    });
});

router.post('/cadastro/add',(req,res)=>{
    let user={name:"",email:"",address:"",heigth:"",age:"",vote:""};

    console.log(req.body)

    user.name = req.body.name
    user.email = req.body.email
    user.address = req.body.address
    user.heigth = req.body.heigth
    user.age = req.body.age
    user.vote = req.body.vote

    // user.name = req.body._name;
    // user.email = req.body._email;
    // user.address = req.body._address;
    // user.heigth = req.body._heigth;
    // user.age = req.body._age;
    // user.vote = req.body._vote;

    users.push(user);
    console.log("Usuário cadastrado(ROTA POST): ",user);
    // // console.log("Lista dos usuários: ",users); //nao use esta linha se tiver muitos elementos em users pois causara lentidao no servidor
    // res.sendStatus(200);
    res.status(200).json({
        status:'sucess',
        data: users
    });

});

module.exports = router;