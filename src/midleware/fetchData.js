const cheerio = require('cheerio');
const axios = require('axios');


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
  }catch(err){
  }    
  });
return(resultJson)
}
async function getCnpj(url){
let domain  = await axios.get(`https://rdap.registro.br/domain/${url}`).then((response)=>{
return response.data;
});
   let dados =  await axios.get(`https://cnpjs.rocks/cnpj/${domain.entities[0].handle}`)
    .then(function (response) {
        return response.data
        })
    .catch(function (error) {
     return error
    });
   let result  = await getPage(dados);
   return(result);
}

module.exports = getCnpj;