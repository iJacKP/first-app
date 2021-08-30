let cadastro;

//SEMPRE LEMBRAR requisição -> middleware -> resposta

function update(index,link){ //link aqui é /cadastro/update/
    //seleciona todas as tags que sejam td 
    let tds = document.querySelectorAll(`td[data-index-row='${index}']`); //as td's contêm os itens desejados, será útil selecioná-las
    let spans = document.querySelectorAll(`td[data-index-row='${index}'] > span`); //dentro da td especificada, selecionamos os span dentro dela (>span)
    let inputs = document.querySelectorAll(`td[data-index-row='${index}'] > input`); //dentro da td especificada, selecionamos os input dentro dela (>input)

    let lenTds = tds.length-1; //numero de tds em uma linha da tabela (especificamente, da linha que chamou a função)
    let linkUpdate = tds[lenTds-1]; //se refere à td que contém o icone de update(lápis)
    let linkRemove = tds[lenTds]; // se refere à td que contém o ícone de delete(trash)

    let lenInputs = inputs.length; //conta quantos inputs existem na tabela(visíveis ou não, estão lá)

    let button = inputs[lenInputs-1]; //o ultimo input da lista(sinalizado pelo tamanho -1 no vetor)possui o botão de 'atualizar', que deve ser selecinado e mostrado depois



    linkUpdate.className='hidden'; //com o icone de update selecionado, temos que fazê-lo sumir (e depois fazer os inputs com atributo 'hidden' aparecer)
    linkRemove.className='hidden'; //mesma coisa, selecionamos o icone ali em cima e setamos a classe 'hidden' pra ele
    tds[lenTds-2].className='show'; //mostra a td que contém o botão de 'atualizar'

     //esconde todos os campos de exibição de dados do cadastro
    for(let cont=0;cont<spans.length;cont++){ //busca pela seguinte coisa: se um span está visível, torne-o invisível
        if(spans[cont].className=="show"){    //senão, deixe-o visível
            spans[cont].className="hidden";
        } else{
            spans[cont].className="show";
        }
    }
    //mostra os campos de preenchimento para o cadastro
    for(let cont=0;cont<inputs.length;cont++){ //mesma coisa do de cima, só que para os inputs que colocaremos a informação
        if(inputs[cont].className=="hidden"){
            inputs[cont].className="show";
        }
    }

    //escuta se o botao foi clicado
    button.addEventListener('click',()=>{
        const http = new XMLHttpRequest(); //XML - cria um objeto para requisição ao servidor
        const url=link; // "/cadastro/update";
        let data = {id:"",name:"",email:"",address:"",age:"",heigth:"",vote:""};
        let dataToSend;



        http.open("POST",link,true); //abre uma comunicação com o servidor através de uma requisição POST
        //Se no servidor nao houver um elemento esperando por uma mensagem POST (ex. router.post()) para a rota /cadastro/update ocorrerar um erro: 404 - File Not Found

        //Dados HTML teria no cabecalho HEADER (da mensagem HTTP) - Content-Type= text/html
        //Dados estruturados como querystring (ex: http//www.meu.com.br:3030/?campo=meu&campo2=10) -  Content-Type=x-www-form-urlencoded
        //Dados no formato de Objeto Javascript para troca de informacoes (JSON) Content-Type=application/json : Ex.: {key1:value1,key2:value2}
        http.setRequestHeader('Content-Type','application/json'); //constroi um cabecalho http para envio dos dados
         
        for(let cont=0;cont<inputs.length;cont++){ //desabilita todos os inputs para escrita ou acesso (no caso do button)
            if(inputs[cont].disabled==true){
                inputs[cont].disabled=false;
            } else inputs[cont].disabled=true;
        }
    //    // essa suncao esta sendo colocada aqui só para dar uma parada e você poder ver os inputs desabilitados
    //    //funcao que espera um tempo N, dado em milissegundos, e então chama uma função (callback). No caso, vamos usar 2000 ms = 2s
    //    //essa funcao foi construida somente para que voce possa ver os inputs ficando desabilitados. Nao precisa usar.
    //    function sleep(milliseconds) {
    //         const date = Date.now();
    //         let currentDate = null;
    //         do {
    //             currentDate = Date.now();
    //         } while (currentDate - date < milliseconds);
    //     }
    //     console.log("Mostra essa mensagem no console, primeiro!");
    //     sleep(2000)
    //     console.log("Pronto, você consegue ver seus inputs desabilitados!");
    //    //fim do codigo usado para ver os inputs desabiulitados

        //preenche um objeto com o indice da linha da tabela e os valores dos campos input do tipo text
        data.id = index; //esse dado nao existe no vetor Users do lado do servidor (backend), mas preciso dele para apontar o indice do vetor que quero modificar
        data.name = inputs[0].value;
        data.email = inputs[1].value;
        data.address = inputs[2].value;
        data.age = inputs[3].value;
        data.heigth = inputs[4].value;
        data.vote = inputs[5].value;

        dataToSend = JSON.stringify(data); //transforma o objeto literal em uma string JSON que é a representação em string de um objeto JSON. Se quisesse o objeto no formato binario, usaria: JSON.parse(data)

        http.send(dataToSend);//envia dados para o servidor na forma de JSO

        /* este codigo abaixo foi colocado para que a interface de cadastro so seja modificada quando se receber um aviso do servidor que a modificacao foi feita com sucesso. No caso o aviso vem na forma do codigo 200 de HTTP: OK */
        http.onload = ()=>{ 

            /*
            readyState:
            0: request not initialized
            1: server connection established
            2: request received
            3: processing request
            4: request finished and response is ready
            status:
            200: "OK"
            403: "Forbidden"
            404: "Page not found"
            */
            // baseado nos valores acima apresentados, o codigo abaixo mostra o que foi enviado pelo servidor como resposta ao envio de dados. No caso, se o request foi finalizado e o response foi recebido, a mensagem recebida do servidor eh mostrada no console do navegador. esse codigo foi feito apenas para verificar se tudo ocorreu bem no envio

            if (http.readyState === 4 && http.status === 200) { //testa se o envio foi bem sucedido
                for(let cont=0;cont<spans.length;cont++){
                    if(spans[cont].className=="hidden"){
                        spans[cont].innerHTML = inputs[cont].value;
                        spans[cont].className="show";
                    } else{
                        spans[cont].className="hidden";
                    }
                }

                //esconde os campos de preenchimento para o cadastro
                for(let cont=0;cont<inputs.length;cont++){
                    if(inputs[cont].className=="show"){
                        inputs[cont].className="hidden";
                        if(inputs[cont].disabled==false){//habilita novamente os inputs para escrita
                            inputs[cont].disabled=true;
                        }
                    }
                }

                linkUpdate.className='show';
                linkRemove.className='show';
                tds[lenTds-2].className='hidden';
            } else {

                console.log("Ocorreu erro no processamento dos dados no servidor: ",http.responseText);
            }     
        }


    });  

}

function remove(index,_name,link){
   

    const http = new XMLHttpRequest(); 
    const url=link;

    http.open("POST",link,true); 

   

    http.setRequestHeader('Content-Type','application/json'); 


    dataToSend = JSON.stringify({name:_name}); 
    

    http.send(dataToSend);//envia dados para o servidor na forma de JSON
   

    http.onload = ()=>{ 
        

        let tr = document.querySelector(`table#list > tbody > tr[data-index-row='${index}']`);
       
        if (http.readyState === 4 && http.status === 200) {
            tr.remove(); 
            console.log(`Item ${index} removido com sucesso!`);

        } else {
            console.log(`Erro durante a tentativa de remoção do usuário: ${_name}! Código do Erro: ${http.status}`); 
        }
        

    }
}
   
function add(nome, email, endereço, altura, idade, vota, rota){
    let name = document.getElementById(nome).value
    let internetaddress = document.getElementById(email).value
    let address = document.getElementById(endereço).value
    let heightUser = document.getElementById(altura).value
    let age = document.getElementById(idade).value
    let vote = document.getElementById(vota).value

    if(
        validarString(name) &&
        validarEmail(internetaddress) &&
        validarAltura(heightUser) &&
        validarIdade(age) &&
        validarVote(vote)
    ){

   const http = new XMLHttpRequest()
   http.open('POST', rota, true)
   http.setRequestHeader('Content-Type','application/json')

   dataToSend = JSON.stringify({name: name,email: internetaddress,address: address,heigth: heightUser,age: age,vote: vote })

   http.send(dataToSend)



   http.onload = ()=>{


       if (http.readyState === 4 && http.status === 200) {
        console.log(`usuário ${name} adicionado`)
        window.location.href = '/cadastro'
    } else {
        console.log(`Erro durante a tentativa de adição do usuário: ${name}! Código do Erro: ${http.status}`); 
    }
   }
}
}


function validarString(string){
    if(typeof string == 'string' && string !== ''){

        for(let i = 0; i<string.length; i++){
            if(string.charAt(i)!==' '){
            if(string.charAt(i)/1 || string.charAt(i) == 0){
                alert(`'${string}' é uma entrada inválida. (Contém números)`)
                return null
            }
            }
        }
        return string

    }

    alert(`Digite um nome válido.`)
    return null
}
function validarEmail(email){
    if(typeof email == 'string' && email !== ''){
        for(let i = 0; i<email.length; i++){
            if(email.charAt(i) == '@'){
                return email
            }
        }
    }

    alert(`Digite um email válido.`)
    return null
}
function validarIdade(num){
    if(typeof Number(num) == 'number' && Number.isInteger(Number(num))){
        return num
    }

    alert(`Digite um número válido.`)
    return null
}
function validarAltura(height){
    if(typeof Number(height == 'number' && (height<=3 && height>0))){
        heightUser = String(Number(height).toFixed(2))
        return height
    }

    alert(`Digite uma altura válida.`)
    return null
}

function validarVote(vote){
    if(vote == 'true' || vote == 'false'){
        return vote
    }
    alert(`Campo 'vote' inválido. (Apenas valores 'true' ou 'false' são aceitos.)`)
    return null
}

function list(){
    
    const http = new XMLHttpRequest()
    http.open('GET', '/listagem/update', true)
    http.setRequestHeader('Content-Type','application/json')

    http.send()

    http.onload = ()=>{
        if (http.readyState === 4 && http.status === 200) {
     
        let lista = JSON.parse(http.response)


        for(let i = 0; i<lista.users.length; i++){
            let containerLista = document.getElementById('container-lista')
            let div = document.createElement('div')
            let paragrafo = document.createElement('p')
            let unorderedList = document.createElement('ul')
            let carac1 = document.createElement('li')
            let carac2 = document.createElement('li')

            containerLista.appendChild(div)
            div.appendChild(paragrafo)
            div.appendChild(unorderedList)
            unorderedList.appendChild(carac2)
            unorderedList.appendChild(carac1)
            paragrafo.innerText = `${lista.users[i].name}`
            
            carac1.innerText = `Email: ${lista.users[i].email}`
            carac2.innerText = `Idade: ${lista.users[i].age}`
        }

    }
   
    }
}
