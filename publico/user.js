$(document).ready(function(){
    $("#campos_null").hide();
    $("#info-erradas").hide();
});

$("#username,#password").click(function(){
    $("#campos_null").hide();
    $("#info-erradas").hide();
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
            else{
                 $("#info-erradas").show();
            }
        },
        error: function () {
            alert("Falha ao acessar o Endpoint POST /fazer_login");
        }
    })
});