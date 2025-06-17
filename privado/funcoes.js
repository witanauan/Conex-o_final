//funcoes
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
                        Nome Filial: <b id='filial1'>${item.nome_filial}</b><br>
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
                        Nome Filial: <b id='filial1'>${item.nome_filial}</b><br>
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
                        Nome Filial: <b id='filial1'>${item.nome_filial}</b><br>
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

function CarregarFiliais() {
    $.ajax({
        url: 'http://localhost:3000/filial',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: function (dados) {
            dados.forEach(function (item) {
                $("#caixa_filial,#filial3").append(`
                    <option value="${item.codigo_filial}">${item.nome_filial}</option>
                `);
            });
        },
        error: function () {
            alert("Falha ao acessar o Endpoint GET /filial");
        }
    });
}


$(document).ready(function () {
    $("#tela_escura").hide();
    $("#cadastro_filial").hide();
    $("#cadastro_funcionario").hide();
    $("#formulario_alterar").hide();
    $(".container_gen_fun").hide();
    CarregarFiliais();
    CarregarAdministrativo();
    CarregarSuporte();
    CarregarFinanceiro();
});

// cadastro de funcionario
$("#formulario_cad_fun").click(function () {
    $("#tela_escura").show();
    $("#cadastro_funcionario").show();

    $("#btn_cad").click(function () {
        const nome = $("#nome2").val();
        const salario = $("#salario2").val();
        const setor = $("#caixa_setor").val();
        const status = $("#caixa_situacao").val();
        const filial = $("#caixa_filial").val();

        if(nome === "" ||salario === "" ||setor === "" ||status === "" ||filial === ""){
            alert("Preencha todos os campos");
            return;
        }

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
        const nome_filial = $("#nome_filial_cad").val();
        const endereco = $("#endereco1").val();
        if(nome_filial === "" ||endereco === ""){
            alert("Preencha todos os campos");
            return;
        }
        $.ajax({
            url: 'http://localhost:3000/filial',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({nome_filial,endereco}),
            success: function (resposta) {
                alert(resposta.msg);
                window.location.href = '/';
            },
            error: function () {
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
});

$(document).on('click', '.cartoes', function () {
    $("#tela_escura").show();
    $("#formulario_alterar").show();

    var matriculaSemAlter = $(this).find("#matricula").text();
    $("#matricula3").val(matriculaSemAlter);

    var nomeSemAlter = $(this).find("#nome").text();
    $("#nome3").val(nomeSemAlter);

    var salarioSemAlter = $(this).find("#salario").text();
    $("#salario3").val(salarioSemAlter);

    var setorSemAlter = $(this).find("#setor").text();
    $("#setor3").val(setorSemAlter);

    var statusSemAlter = $(this).find("#status").text();
    $("#status3").val(statusSemAlter);

    var filialSemAlter = $(this).find("#filial1").text();

    $('#filial3 option').filter(function() {
        return ($(this).text() === filialSemAlter);
    }).prop('selected', true);

    $("#salvar").click(function () {
        const matricula = $("#matricula3").val();
        const nome = $("#nome3").val();
        const salario = $("#salario3").val();
        const setor = $("#setor3").val();
        const status = $("#status3").val();
        const filial = $("#filial3").val();
        
        if(nome === "" ||salario === "" ||setor === "" ||status === "" ||filial === "" || matricula === ""){
            alert("Preencha todos os campos");
            return;
        }else if(matriculaSemAlter != matricula){
            alert("não mude o id da caixa");
            return;
        }

       $.ajax({
            url: 'http://localhost:3000/funcionario',
            type: 'PUT',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({matricula,nome,salario,setor,status,filial}),
            success: function(resposta){
                alert(resposta.msg);
                window.location.href = '/';
            },
            error: function(){
                alert("Falha na conexao do Endpoint PUT /funcionario");
            }
        })
    });
    $("#exclui").click(function(){
        const matricula = $("#matricula3").val();

        if(matriculaSemAlter != matricula){
            alert("não mude o id da caixa");
            return;
        }

        $.ajax({
             url: 'http://localhost:3000/funcionario',
            type: 'DELETE',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({matricula}),
            success: function(resposta){
                alert(resposta.msg);
                window.location.href = '/';
            },
            error: function(){
                alert("Falha na conexao do Endpoint DELETE /funcionario");
            }
        })
    });
});

$(document).on('click', '#btn_fechar1', function () {
    $("#tela_escura").hide();
    $("#formulario_alterar").hide();
});
