$(function () {

    const urlParams = new URLSearchParams(window.location.search);

    if (localStorage.getItem("usr")) {
        $("#backLogin").hide()
        let $level = urlParams.get('level')
        $("#rank").val($level);
        montaTabela($level);
    } else
        $("#backGame").hide();

    $("#rank").change(function () {
        let $nivel = $("#rank").val();
        montaTabela($nivel);
    });


    function montaTabela(nivel) {
        $("table").empty();
        $.getJSON(`http://localhost:8080/ranking?nivel=${nivel}`, function (registros) {

            $("table").append("<thead><th>#</th><th>Nome</th><th>Pontuação</th></thead>");
            var tbody = $("<tbody>");

            registros.forEach((registro, i) => {
                tbody.append(`<tr><td>${i + 1}º</td><td>${registro.usuario.user}</td><td>${registro.pontuacao}</td></tr>`);
            });
            $("table").append(tbody);

        });

    }
})
