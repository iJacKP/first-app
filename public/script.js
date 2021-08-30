let cadastro;

function update(index,link){ 

    let tds = document.querySelectorAll(`td[data-index-row='${index}']`); 
    let spans = document.querySelectorAll(`td[data-index-row='${index}'] > span`);
    let inputs = document.querySelectorAll(`td[data-index-row='${index}'] > input`); 

    let lenTds = tds.length-1; 
    let linkUpdate = tds[lenTds-1]; 
    let linkRemove = tds[lenTds];

    let lenInputs = inputs.length;

    let button = inputs[lenInputs-1];



    linkUpdate.className='hidden'; 
    linkRemove.className='hidden'; 
    tds[lenTds-2].className='show'; 
    
    for(let cont=0;cont<spans.length;cont++){ 
        if(spans[cont].className=="show"){   
            spans[cont].className="hidden";
        } else{
            spans[cont].className="show";
        }
    }

    for(let cont=0;cont<inputs.length;cont++){ 
        if(inputs[cont].className=="hidden"){
            inputs[cont].className="show";
        }
    }

   
    button.addEventListener('click',()=>{
        const http = new XMLHttpRequest(); 
        const url=link; 
        let data = {id:"",name:"",email:"",address:"",age:"",heigth:"",vote:""};
        let dataToSend;



        http.open("POST",link,true); 
        

        
        http.setRequestHeader('Content-Type','application/json'); 
         
        for(let cont=0;cont<inputs.length;cont++){ 
            if(inputs[cont].disabled==true){
                inputs[cont].disabled=false;
            } else inputs[cont].disabled=true;
        }
  
        data.id = index;
        data.name = inputs[0].value;
        data.email = inputs[1].value;
        data.address = inputs[2].value;
        data.age = inputs[3].value;
        data.heigth = inputs[4].value;
        data.vote = inputs[5].value;

        dataToSend = JSON.stringify(data); 

        http.send(dataToSend);

        
        http.onload = ()=>{ 

          

            if (http.readyState === 4 && http.status === 200) { 
                for(let cont=0;cont<spans.length;cont++){
                    if(spans[cont].className=="hidden"){
                        spans[cont].innerHTML = inputs[cont].value;
                        spans[cont].className="show";
                    } else{
                        spans[cont].className="hidden";
                    }
                }

               
                for(let cont=0;cont<inputs.length;cont++){
                    if(inputs[cont].className=="show"){
                        inputs[cont].className="hidden";
                        if(inputs[cont].disabled==false){
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
    

    http.send(dataToSend);
   

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
