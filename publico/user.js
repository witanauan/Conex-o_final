// funcoes
function marcarErro(id) {
    $(id).css({
        border: "3px solid red",
        "box-shadow": "2px 2px 2px red"
    });
}

function desmarcarErro(id) {
    $(id).css({
        border: "",
        "box-shadow": ""
    });
}

// pagina inicial
$(document).ready(function(){
    $("#campos_null").hide();
    $("#info-erradas").hide();
});

$("#username,#password").click(function(){
    $("#campos_null").hide();
    $("#info-erradas").hide();
});

$("#username").click(function(){
    desmarcarErro("#username");
});

$("#password").click(function(){
    desmarcarErro("#password");
});

$("#btn_entrar").click(function () {
    const username = $("#username").val();
    const password = $("#password").val();

    
    if( username == ""){
       marcarErro("#username");
    }
    if( password == ""){
        marcarErro("#password");
    }
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
            else{
                 $("#info-erradas").show();
            }
        },
        error: function () {
            alert("Falha ao acessar o Endpoint POST /fazer_login");
        }
    })
});