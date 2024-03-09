# filmes-classificador
 Projeto full-stack de um classificador de filmes
## Backend:

### executar os seguintes comandos:	
```
bundle install
rails db:migrate
rails db:seed
```
### Configurações:
* Configurar ip e a porta no arquivo config/initializers/cors.rb do backend para permitir a passagem do cookie de autenticação com o frontend.
    > [!IMPORTANT]
    > Obs.: A url de acesso ao frontend deve ser a mesma do backend. Exemplo: caso tenha configurado o .env do frontend para acessar a api pelo endereço ip: [http://127.0.0.1:\[Port do rails\]](), então deve acessar o aplicativo React pelo endereço ip: [http://127.0.0.1:\[Port do react\]]()

* Configurar o endereço do servidor redis nas variáveis de ambiente na pasta environments.
* Executar um servidor do redis.
* Executar o comando `bundle exec sidekiq` para rodar o servidor do sidekiq.
* Executar o comando `rails server` para rodar a api.
	
## Frontend:
### Configurações:
* Executar o comando `npm install` para instalar as dependências.
	
* Fazer uma cópia do arquivo `.env-sample` na raiz do frontend com o nome de `.env`.
* Preencher o campo de chave `REACT_APP_IMG_API_KEY` com uma chave do [TMDB](https://developer.themoviedb.org/docs/authentication-application), basta criar uma conta.
* A porta do servidor React pode ser configurada na chave PORT.
* O endereço da api e porta do backend deve ser configurado na chave `REACT_APP_DATA_API`.
* Executar o comando `npm start`

    > [!WARNING]
    > Obs.: Devem rodar no mesmo endereço, caso contrário, haverão problemas de autenticação
    
## Funcionalidades
* A tela de feed deve estar vazia por não haver filmes cadastrados
* Na aplicação podemos buscar pelos títulos de filmes através da barra de pesquisa
* Podemos visitar a página de um filme clicando em cima de seu minicard e depois clicando em visitar
* Na página do filme, o usuário logado poderá avaliar o filme
* Quando logado, o usuário poderá acessar sua página de perfil clicando em seu nome de usuário
* Na página de perfil, o usuário terá acesso a uma grid na qual poderá filtrar pelos filmes avaliados por ele
* Como admin, o usuário terá acesso a mais três telas de cadastro:
	- Importar Csv de filmes 
	    > **Campos:** title, director, poster_path, release_date, overview, runtime
Header é obrigatório e o separador pode ser vírgula ou ponto e vírgula.

	- Importar Csv de avaliações (Campos: user_id, movie_id, score)
	    > **Campos:** user_id, movie_id, score

	- Cadastrar um filme individual