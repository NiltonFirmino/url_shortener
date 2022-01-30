var express = require('express');
var router = express.Router();
const Link = require('../models/link');

/**
 * 
 * @returns {resultado.url}
 */
router.get('/:code', async (req, res, next) => {
  const code = req.params.code;
  
  const resultadonew = await Link.findOne({ where: { code } });
  if (!resultadonew) return res.sendStatus(404);
 
  await resultadonew.save();
 
  res.redirect(resultadonew.url);
})


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Encurtador de URL' });
});


/**
 * Função que cria um novo um code de 5 caracteres usando caracteres aleatórios como possibilidade
 * @returns {text<String>}
 */
function generateCode() {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}


router.post('/urlresults', async (req, res, next) => {
  const url = req.body.url;
  const code = generateCode();

  /**
   * Guarda a url inserida e o codigo gerado pela função generateCode() no banco de dados
   * @type {Object}
   * @returns {urlresults}
   */
  const resultado = await Link.create({
    url,
    code
  })
  res.render('stats',resultado.dataValues);
})


module.exports = router;
