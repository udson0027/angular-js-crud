## Iniciando

Foi utilizado CDNs nas dependências para evitar o download adicional de arquivos.
Para o funcionamento da aplicação, precisa apenas copiar os arquivos em um servidor web.
Caso use o http-server basta executa-lo na pasta app

### Instalando o http-server

npm install http-server -g

## Implementação

Decidi usar a estrutura de pastas encontrada no angular-seed(https://github.com/angular/angular-seed), sendo
este sendo um repositório do próprio angular.

### Controllers contact e contact_edit

Como usei 2 views, uma para listar e adicionar novos contatos e outra para exibir as informações contidas no contato,
podendo excluir ou alterar as mesmas. Assim optei separar essas funcões em 2 controllers parar maior clareza
do que cada controller deve fazer.

### Services restAPI

Foi criado um service onde se encotra todas as funcões necessarias para a o funcionamento da aplicação.
Na função rest.all('contact').getList(), servidor respondia um JSON e não uma lista, para contornar eu decidi
retirar a função ".getList()" e substitui por ".customGET()", onde o servidor devolve o data completo e se pode ter
a lista de contatos no "data.objects".

### Stylesheet app.cc

Classes criadas por mim. Obtendo cores que eu não conseguir encontrar no Angular Material

