# Projeto Suporte Técnico

O projeto tem como objetivo um sistema web para o controle e gerenciamento dos atendimentos de suporte técnico, substituindo o processo manual realizado por meio de planilhas. A solução permite o cadastro, acompanhamento e encaminhamento de chamados conforme o nível de suporte dos técnicos, além do registro de interações e finalização dos atendimentos. O sistema automatiza o fluxo de encaminhamento entre técnicos, evita designações incorretas e facilita o acompanhamento das pendências, proporcionando mais agilidade, rastreabilidade e organização no processo de suporte.

## Problemas evidentes com a utilização da planilha:

1. Falha na designação dos técnicos de nível correto: como o processo atualmente é realizado em uma planilha, às vezes um técnico realiza a designação para um técnico de mesmo nível que o dele, fazendo com que o processo seja moroso;
2. O estagiário precisa ficar verificando a planilha diariamente a fim de identificar itens que foram respondidos e precisa respondê-los um a um;
3. As respostas demoram para serem enviadas ao cliente, já que o estagiário precisa fazer o envio das respostas de forma individual;
4. Às vezes, algumas respostas deixam de ser enviadas, pois o estagiário perde o controle do que já foi e do que não foi respondido;
5. Os técnicos precisam ficar acessando a planilha para verificar se há algo que eles devam fazer.

## Além do problema

Além dos problemas listados, foi observada a necessidade de um histórico para os chamados, denominado de **interações**. Através dele, é possível visualizar a troca de técnicos do suporte, as mensagens deixadas por eles em relação ao problema e quando essas alterações foram realizadas. Além disso, é possível também saber quando o chamado foi finalizado e realizar outros tipos de interações ou rastreamento caso necessário.

## Futuras melhorias

Para ir além da solução atual, aqui vão algumas funcionalidades que podem ser interessantes e serão desenvolvidas posteriormente:

- Designação automática para técnicos que não estão atendendo e se encontram disponíveis;
- Notificação para os técnicos assim que um novo chamado for designado para eles (mensagem interna ou e-mail);
- Cards para monitoramento dos chamados;
- Controle de permissão por usuário (técnicos visualizam apenas chamados do seu nível ou inferiores; administradores com funções mais permissivas);
- Chat interno;
- Melhoria dos filtros.

### Qualidade do Software e Escalabilidade

Para melhor garantir a qualidade do software e preparar o sistema para opções futuras de escalabilidade, algumas práticas recomendadas são:

- Desenvolvimento de testes de software tanto no backend quanto no frontend da aplicação;
- Desenvolvimento e manutenção da documentação;
- Utilização de serviços em nuvem;
- Estudo de caso para aplicação de Inteligência Artificial (IA).

## Execução do Projeto

Crie um arquivo `.env` com a URL do banco de dados no seguinte diretório: 

```bash
cd .\API\
```
Exemplo de string de conexão que deve constar no arquivo `.env`:
```Exemplo de .env:
DATABASE_URL="postgres://YourUserName:YourPassword@YourHostname:5432/urDatabaseName";
```
Instale as dependências com:
```bash
npm install
```
Para executar o backend da aplicação, acesse a pasta API e execute:

```bash
cd .\API\
node server.js
```

Para executar o frontend da aplicação, acesse a pasta frontendPrime e execute:
```bash
cd .\frontendPrime\
ng serve
```
----
O código SQL para a criação do banco de dados se encontra em:
```bash
cd .\database\
```
Algumas imagens para fim de documentação se encontram em:
```bash
cd .\docs\assets\
```
