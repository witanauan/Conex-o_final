//funcoes

function CarregarFiliais() {
    $.ajax({
        url: 'http://localhost:3000/filial',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: function (dados) {
            dados.forEach(function (item) {
                $("#caixa_filial").append(`
                    <option value="${item.codigo_filial}">${item.nome_filial}</option>
                `)
            });
        },
        error: function () {
            alert("Falha ao acessar o Endpoint GET /filial");
        }
    });
}

function CarregarAdministrativo() {
    $.ajax({
        url: 'http://localhost:3000/Administrativo',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: function (dados) {
            dados.forEach(function (item) {
                $(".Administrativo").append(`
                    <div class='cartoes'>
                        Nº Matrícula: <b id='matricula'>${item.matricula}</b><br>
                        Nome Completo: <b id='nome'>${item.nome_funcionario}</b><br>
                        Nome Filial: <b id='nome_filial'>${item.nome_filial}</b><br>
                        R$ <b id='salario'>${item.salario}</b><br>
                        Setor: <b id='setor'>${item.setor}</b><br>
                        Status: <b id='status'>${item.status}</b><br>
                        Endereço: <b id='endereco'>${item.endereco}</b><br>
                    </div>
                `);
            });
        },
        error: function () {
            alert("Falha ao acessar o Endpoint GET /Administrativo");
        }
    });
}

function CarregarSuporte() {
    $.ajax({
        url: 'http://localhost:3000/Suporte',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: function (dados) {
            dados.forEach(function (item) {
                $(".Suporte").append(`
                    <div class='cartoes'>
                        Nº Matrícula: <b id='matricula'>${item.matricula}</b><br>
                        Nome Completo: <b id='nome'>${item.nome_funcionario}</b><br>
                        Nome Filial: <b id='nome_filial'>${item.nome_filial}</b><br>
                        R$ <b id='salario'>${item.salario}</b><br>
                        Setor: <b id='setor'>${item.setor}</b><br>
                        Status: <b id='status'>${item.status}</b><br>
                        Endereço: <b id='endereco'>${item.endereco}</b><br>
                    </div>
                `);
            });
        },
        error: function () {
            alert("Falha ao acessar o Endpoint GET /Suporte");
        }
    });
}

function CarregarFinanceiro() {
    $.ajax({
        url: 'http://localhost:3000/Financeiro',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: function (dados) {
            dados.forEach(function (item) {
                $(".Financeiro").append(`
                    <div class='cartoes'>
                        Nº Matrícula: <b id='matricula'>${item.matricula}</b><br>
                        Nome Completo: <b id='nome'>${item.nome_funcionario}</b><br>
                        Nome Filial: <b id='nome_filial'>${item.nome_filial}</b><br>
                        R$ <b id='salario'>${item.salario}</b><br>
                        Setor: <b id='setor'>${item.setor}</b><br>
                        Status: <b id='status'>${item.status}</b><br>
                        Endereço: <b id='endereco'>${item.endereco}</b><br>
                    </div>
                `);
            });
        },
        error: function () {
            alert("Falha ao acessar o Endpoint GET /Financeiro");
        }
    });
}


$(document).ready(function () {
    $("#campos_null").hide();
    $("#info-erradas").hide();
    $("#tela_escura").hide();
    $("#cadastro_filial").hide();
    $("#cadastro_funcionario").hide();
    $("#formulario_alterar").hide();
    $(".container_gen_fun").hide();
    CarregarFiliais();
});

$("#btn_entrar").click(function () {
    const username = $("#username").val();
    const password = $("#password").val();

    if (username == "" || password == "") {
        $("#campos_null").show();
        return;
    }
    $.ajax({
        url: 'http://localhost:3000/fazer_login',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({ username, password }),
        success: function (resposta) {
            if (resposta.msg == "logado com sucesso!!!") {
                window.location.href = '/';
            }
        },
        error: function () {
            alert("Falha ao acessar o Endpoint POST /fazer_login");
        }
    })
});

// cadastro de funcionario
$("#formulario_cad_fun").click(function () {
    $("#tela_escura").show();
    $("#cadastro_funcionario").show();

    $("#btn_cad").click(function () {
        const nome = $("#nome").val();
        const salario = $("#salario").val();
        const setor = $("#caixa_setor").val();
        const status = $("#caixa_situacao").val();
        const filial = $("#caixa_filial").val();

        $.ajax({
            url: 'http://localhost:3000/funcionario',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({ nome, salario, setor, status, filial }),
            success: function (resposta) {
                alert(resposta.msg);
                window.location.href = '/';
            },
            error: function () {
                alert("Falha ao acessar POST /funcionario");
            }
        });
    });
});

$("#btn_fechar1").click(function () {
    $("#tela_escura").hide();
    $("#cadastro_funcionario").hide();
});
// fim cadastro de funcionario

// cadastro de filial
$("#formulario_cad_filial").click(function () {
    $("#tela_escura").show();
    $("#cadastro_filial").show();

    $("#btn_cad2").click(function () {
        const nome_filial = $("#nome_filial").val();
        const endereco = $("#endereco").val();

        $.ajax({
            url: 'http://localhost:3000/filial',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({nome_filial,endereco}),
            success: function(resposta){
                alert(resposta.msg);
            },
            error: function(){
              alert("Falha ao acessar o Endpoint POST /filial");  
            }
        });
    });
})
$("#btn_fechar").click(function () {
    $("#tela_escura").hide();
    $("#cadastro_filial").hide();
});
// fim cadastro de filial

$("#formulario_gen_fun").click(function () {
    $(".content").hide();
    $(".container_gen_fun").show();
    CarregarAdministrativo();
    CarregarSuporte();
    CarregarFinanceiro();
});

$(document).on('click','.cartoes', function(){
    $("#tela_escura").show();
    $("#formulario_alterar").show();
    CarregarAdministrativo();
    CarregarSuporte();
    CarregarFinanceiro();
    CarregarFiliais();

    var matricula = $(this).find("#matricula").text();
    $("#matricula2").val(matricula);
    
    var nome = $(this).find("#nome").text();
    $("#nome2").val(nome);

    var salario = $(this).find("#salario").text();
    $("#salario2").val(salario);

    var setor = $(this).find("#setor").text();
    $("#setor2").val(setor);

    var status = $(this).find("#status").text();
    $("#status2").val(status);

    var filial = $(this).find("#nome_filial").text();
    $("#caixa_filial2").val(filial);
});

$(document).on('click','#btn_fechar1',function(){
    $("#tela_escura").hide();
    $("#formulario_alterar").hide();
});
