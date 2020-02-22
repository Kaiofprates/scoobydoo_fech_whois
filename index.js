const cheerio = require('cheerio');
const fs  = require('fs');
const axios = require('axios');
<<<<<<< HEAD
let url = "fasa.edu.br";
=======
let url = "bb.com.br";
>>>>>>> 35c8763e44e60d68ede989b21c5ac2e370dc9077



async function getPage(content){
  const $  = await cheerio.load(content,{
      normalizeWhitespace: true,
      xmlMode: true 
  });
  let dados_cnpj  = $('li').map((e,ele)=>ele);
  let resultJson  = {};

  await dados_cnpj.map((e)=>{
  try{
    let chave = dados_cnpj[e].children[0].data.replace(':','')
    let valor = dados_cnpj[e].children[0].next.children[0].data;
    if(resultJson[chave]){
     if(typeof(resultJson[chave]) == 'string'){
       resultJson[chave] = resultJson[chave].split();
     }
     resultJson[chave].push(valor)
    }else{
      resultJson[chave] = valor
    }
    //console.log(` ${chave} ${valor} `)
  }catch(err){

  }    
  });
let data  = JSON.stringify(resultJson);
//fs.writeFileSync(`${url}.json`,data);
//return(resultJson);
console.log(data)

}


async function getCnpj(){
let domain  = await axios.get(`https://rdap.registro.br/domain/${url}`).then((response)=>{
return response.data;
});
console.log(domain);
let data  = JSON.stringify(domain);
console.log(domain.entities[0].handle);
fs.writeFileSync(`${url}.json`,data);

   let dados =  await axios.get(`https://cnpjs.rocks/cnpj/${domain.entities[0].handle}`)
    .then(function (response) {
        return response.data
        })
    .catch(function (error) {
     return error
    });
   // fs.writeFileSync('request.txt',dados);
    const $  = await cheerio.load(dados);
    let dados_cnpj  = $('.dados').text()
    //console.log(dados_cnpj);
   getPage(dados);
 

}

getCnpj();



