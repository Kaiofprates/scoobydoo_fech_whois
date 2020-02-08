const cheerio = require('cheerio');
const fs  = require('fs');
const axios = require('axios');
let url = "bb.com.br";



async function getPage(content){
  const $  = await cheerio.load(content,{
      normalizeWhitespace: true,
      xmlMode: true 
  });
  let dados_cnpj  = $('li').map((e,ele)=>ele);
  dados_cnpj.map((e)=>{
  try{
    let chave = dados_cnpj[e].children[0].data;
    let valor = dados_cnpj[e].children[0].next.children[0].data;
    console.log(` ${chave} ${valor} `)
  }catch(err){

  }    
  });
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



