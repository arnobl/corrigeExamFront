module.exports = {
  I18N_HASH: 'generated_hash',
  FRONT_URLDEV: 'http://localhost:9000/',
  FRONT_URLPRODLOCAL: '/',
  FRONT_URLPROD: 'https://correctexam.github.io/corrigeExamFront/',
  SERVER_API_URLPROD: 'https://api.gradescope.barais.fr/',
  SERVER_API_URLPRODLOCAL: '/',
  SERVER_API_URLDEV: 'http://localhost:9000/',
  __VERSION__: process.env.hasOwnProperty('APP_VERSION') ? process.env.APP_VERSION : '0.9.0',
  __DEBUG_INFO_ENABLED__: false,
};
