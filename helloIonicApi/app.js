var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: true } ));
app.use(cors());

app.post('/api/login', function(req, res) {
	var email = req.body.email;
	var senha = req.body.senha;
	if (email != 'teste@email.com' || senha != '123'){
		setTimeout(function(){
			res.send(401, {
				'erro': {
					'http_code': 401,
					'code': 'anauthorized',
					'mensagem': 'Login e/ou senha inválidos'
				}
			})
		}, 4000);
	} else {
		setTimeout(function(){
			res
				.header('Acess-Control-Allow-Origin', '*')
				.send(200, {
					'data': {
						'nome': 'Teste',
						'email': 'teste@email.com',
						'token': 'este_e_o_token'
					}
				});
		}, 4000);
	}
});

app.listen(3000);
console.log('A API está no ar')