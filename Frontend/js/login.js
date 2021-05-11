var $login = function () {
    let $user = $("#user").val();
    let $pwd = $("#pwd").val();
    if ($user && $pwd) {
        $.getJSON("http://localhost:8080/usuario", function ($registros) {
            let usr = $registros.find($usuario => $usuario.user == $user && $usuario.pwd == $pwd)
            if (usr) {
                localStorage.setItem("usr", JSON.stringify(usr));
                window.open("../jogo.html", "_self");
            } else alert("Usuário inválido!")
        });
    }
    else alert("Erro! Favor informar o usuario e senha!")
};

var $cadastro = function () {
    let $user = $("#userc").val();
    let $pwd = $("#pwdc").val();
    if ($user && $pwd) {
        $.getJSON("http://localhost:8080/usuario", function ($registros) {
            if ($registros.find($usuario => $usuario.user == $user)) {
                alert(`O nome de usuário "${$user}" já está em uso!`)
                $("input").val('');
            }
            else {
                let data = { user: $user, pwd: $pwd };
                axios.post("http://localhost:8080/usuario", data);
                $("input").val('');
                alert("Usuário Cadastrado!");
                window.open("index.html", "_self");
            }
        });
    }
    else alert("Erro: favor informar o usuario e senha!")
};

$(document).ready(function () {
    $("#btnLogin").click($login)
    $("#user").keypress((e) => { if (e.which == 13) $login() });
    $("#pwd").keypress((e) => { if (e.which == 13) $login() });


    $("#btnCadastro").click($cadastro);
    $("#userc").keypress((e) => { if (e.which == 13) $cadastro() });
    $("#pwdc").keypress((e) => { if (e.which == 13) $cadastro() });
});


