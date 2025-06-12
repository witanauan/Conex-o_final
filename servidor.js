const db = require('./conexao');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cors = require('cors');
const { error } = require('console');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'Publica', 'login.html'));
});

app.get('/desconectado', (req, res) => {
    res.sendFile(path.join(__dirname, 'Publica', 'desconectado.html'));
});

app.use(session({
  secret: '46feb3e2fec47e6d6cd7bc44bfe1aef9',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 15 * 60 * 1000 }
}));

function verificarAutenticado(req, res, next){
    if(req.session.usuarioLogado){
      next();
    }else{
      res.redirect('/login');
    }
}//funcao verificar se ta logado

app.post('/fazer_login', (req, res) => {
    const {username,password} = req.body;
    db.query('SELECT *FROM usuarios WHERE username = ? AND password = ?', [username,password], (error,resultado) => {
        if (error) { return res.json({ msg: "falha ao consultar" + error.message }) }
        if (resultado.length === 0){
            return res.json({ msg: false });
        }else{
            req.session.usuarioLogado = "sim";
            return res.json({ msg: true });
        }
    });
});// fim do fazer login

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

app.get('/',(res,req)=>{
    res.sendFile(path.join(__dirname, 'Privada', 'login.html'));
});

app.get('/Administrativo',verificarAutenticado(),(req,res)=>{
    db.query(`SELECT *FROM funcionarios_com_filiais WHERE setor = 'Administrativo'`,(error,resultados)=>{
        if(error){return res.json({msg:"Falha ao consultar setor Administrativo! "+error})}
        return res.json(resultados);
    });
});

app.get('/Suporte',verificarAutenticado(),(req,res)=>{
    db.query(`SELECT *FROM funcionarios_com_filiais WHERE setor = 'Suporte'`,(error,resultados)=>{
        if(error){return res.json({msg:"Falha ao consultar setor Administrativo! "+error})}
        return res.json(resultados);
    });
});

app.get('/Financeiro',verificarAutenticado(),(req,res)=>{
    db.query(`SELECT *FROM funcionarios_com_filiais WHERE setor = 'Financeiro'`,(error,resultados)=>{
        if(error){return res.json({msg:"Falha ao consultar setor Administrativo! "+error})}
        return res.json(resultados);
    });
});

app.post('/filial',verificarAutenticado(),(req,res)=>{
    const {nome_filial,endereco} = req.body;
    db.query(`INSERT INTO filiais(nome_filial,endereco) VALUES (?,?)`,[nome_filial,endereco],(error,resultado)=>{
        if(error){return res.json({msg:"Falha ao cadastrar filial! "+error})}
        return res.json({msg:"Cadastrado com sucesso!!!"});
    });
});

app.post('/funcionario',(req,res)=>{
    const {nome,salario,setor,status,filial} = req.body;
    db.query('INSERT INTO funcionarios(nome,salario,setor,status,filial) VALUES (?,?,?,?,?)',
    [nome,salario,setor,status,filial],(error,resultado)=>{
        if(error){return res.json({msg:"Falha ao cadastrar funcionario! "+error})}
        return res.json({msg:"Cadastrado com sucesso!!!"});
    });
});


app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});