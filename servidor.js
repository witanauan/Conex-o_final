const db = require('./conexao');
const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
const cors = require('cors');
const { error } = require('console');
app.use(cors());
app.use(express.json());

app.use(session({
  secret: '46feb3e2fec47e6d6cd7bc44bfe1aef9',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 15 * 60 * 1000 }
}));

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'publico', 'login.html'));
});

app.get('/login_estilo', (req, res) => {
    res.sendFile(path.join(__dirname, 'publico', 'estilo.css'));
});

app.get('/desconectado', (req, res) => {
    res.sendFile(path.join(__dirname, 'publico', 'desconectado.html'));
});

app.get('/desconectado_estilo', (req, res) => {
    res.sendFile(path.join(__dirname, 'publico', 'estilo2.css'));
});

app.get('/funcoes', (req, res) => {
    res.sendFile(path.join(__dirname, 'privado', 'funcoes.js'));
});

app.get('/img', (req, res) => {
    res.sendFile(path.join(__dirname, 'privado', 'logomarca.png'));
});

app.post('/fazer_login', (req, res) => {
    const {username,password} = req.body;
    db.query('SELECT *FROM usuarios WHERE username = ? AND password = ?', [username,password], (error,resultado) => {
        if (error) { return res.json({ msg: "falha ao consultar" + error.message }) }
        if (resultado.length === 0){
            return res.json({ msg: false });
        }else{
            req.session.usuarioLogado = resultado[0];
            return res.json({msg:"logado com sucesso!!!"});
        }
    });
});// fim do fazer login

function verificarAutenticado(req,res,next){
    if(req.session.usuarioLogado){
      next();
    }else{
      res.redirect('/login');
    }
}//funcao verificar se ta logado

app.get('/logout', (req, res) => {
    req.session.destroy((erro) => {
        if (erro) {
            console.error('Erro ao destruir sessão:', erro);
            return res.send('Erro ao fazer logout.');
        }
        res.redirect('/desconectado');
    });
});

app.get('/',(req, res) => {
    res.sendFile(path.join(__dirname, 'privado', 'index.html'));
});

app.get('/estilo_index', (req, res) => {
    res.sendFile(path.join(__dirname, 'privado', 'style.css'));
});

app.get('/Administrativo',(req,res)=>{ 
    db.query(`SELECT *FROM funcionarios_com_filiais WHERE setor = 'Administrativo'`,(error,resultados)=>{
        if(error){return res.json({msg:"Falha ao consultar setor Administrativo! "+error})}
        return res.json(resultados);
    });
});// fim do GET funcionarios do setor Administrativo

app.get('/Suporte',(req,res)=>{
    db.query(`SELECT *FROM funcionarios_com_filiais WHERE setor = 'Suporte'`,(error,resultados)=>{
        if(error){return res.json({msg:"Falha ao consultar setor Administrativo! "+error})}
        return res.json(resultados);
    });
});// fim do GET funcionarios do setor Suporte

app.get('/Financeiro',(req,res)=>{
    db.query(`SELECT *FROM funcionarios_com_filiais WHERE setor = 'Financeiro'`,(error,resultados)=>{
        if(error){return res.json({msg:"Falha ao consultar setor Administrativo! "+error})}
        return res.json(resultados);
    });
});// fim do GET funcionarios do setor financeiro

app.post('/filial',(req,res)=>{
    const {nome_filial,endereco} = req.body;
    db.query(`INSERT INTO filiais(nome_filial,endereco) VALUES (?,?)`,[nome_filial,endereco],(error,resultado)=>{
        if(error){return res.json({msg:"Falha ao cadastrar filial! "+error})}
        return res.json({msg:"Cadastrado com sucesso!!!"});
    });
});// fim do cadastro filial

app.post('/funcionario',(req,res)=>{
    const {nome,salario,setor,status,filial} = req.body;
    db.query('INSERT INTO funcionarios(nome,salario,setor,status,filial) VALUES (?,?,?,?,?)',
    [nome,salario,setor,status,filial],(error,resultado)=>{
        if(error){return res.json({msg:"Falha ao cadastrar funcionario! "+error})}
        return res.json({msg:"Cadastrado com sucesso!!!"});
    });
});//fim do cadastro funcionario

app.put('/funcionario',(req,res)=>{
    const {matricula,nome,salario,setor,status,filial} = req.body;
    db.query('UPDATE funcionarios SET nome = ?,salario = ?,setor = ?,status = ?,filial = ? WHERE matricula = ?',
    [nome,salario,setor,status,filial,matricula],(error,resultado)=>{
        if(error){return res.json({msg:"Falha ao atualizar funcionario! "+error})}
        return res.json({msg:"Atualizada com sucesso!!!"});
    });
});// fim do atulização funcionario

app.delete('/funcionario',(req,res)=>{
    const {matricula} = req.body;
    db.query('DELETE FROM funcionarios WHERE matricula = ?',[matricula],(error,resultado)=>{
        if(error){return res.json({msg:"Falha ao deletar funcionario! "+error})}
        if(resultado.length === 0){return res.json({msg:"Nenhum funcionario foi deletado!!!"})}
        return res.json({msg:"funcionario deletado com sucesso!!!"});
    });
});

app.get('/filial',(req,res)=>{
    db.query('SELECT *FROM filiais',(error,resultado)=>{
        if(error){return res.json({msg:"Falha em consultar filias"})}
        res.json(resultado);
    });
});


app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});