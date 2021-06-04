const $levels = { "easy": 3, "medium": 5, "hard": 8 };
const $imgWidth = 72; //largura da topeira
const $imgHeight = 57; ///altura da topeira
const $imgsTheme = { "default": "buraco.gif", "active": "toupeira.gif", "dead": "morreu.gif" };
const $initialTime = 10; //tempo de jogo independente do nível
var $timeGame = $initialTime;
var $idChronoGame; //Irá controlar o setInterval do cronometro
var $idChronoStartGame; //Irá controlar o setInterval do cronometro

$(document).ready(function () {
    fillBoard();
    $("#chrono").text($initialTime);
    if (localStorage.getItem("usr")) $("#userLogado").text(JSON.parse(localStorage.getItem("usr")).user);
    $("#level").change(() => {
        if (getLevel()) $("#btnPlay").prop('disabled', false)
        else $("#btnPlay").prop('disabled', true);
    })
    $("#btnPlay").click(() => {
        btnCtrl();
        $idChronoStartGame = setInterval(startGame, 1180);
        $idChronoGame = setInterval(startChronoGame, 1000);
    });
    $("#btnPause").click(function () {
        clearInterval($idChronoGame);
        clearInterval($idChronoStartGame);
        $("#board").html("<p class='msgLevel'>PAUSADO!</p>");
        $("#btnPlay").prop('disabled', false);
        $("#btnPause").prop('disabled', true);
    });
    $("#btnStop").click(() => endGame());
    $("#btnExit").click(() => logout());
});

function logout() {
    localStorage.clear();
    window.open("index.html", "_self")
}

function startChronoGame() {
    let $secondsFormat = (--$timeGame).toLocaleString("pt-br", { minimumIntegerDigits: 2 });
    ($timeGame >= 0) ? $("#chrono").text($secondsFormat) : endGame();
}

function endGame() {
    clearInterval($idChronoGame);
    clearInterval($idChronoStartGame);
    var $score = $("#score").text();
    alertWifi(`Fim de jogo: sua pontuação foi de ${$score}`, false, 0, `img/${$imgsTheme.default}`, "50");
    fillBoard();
    saveScore($score);
}

function saveScore($score) {
    let $usr = JSON.parse(localStorage.getItem("usr"));
    let $data = { "pontuacao": parseInt($score), "nivel": $("#level").val(), "usuario": $usr };

    axios.post("https://mole-game-tulio.herokuapp.com/ranking", $data);
    $("#fecha").click(() => {
        location.reload();
    });
    $("#ranking").click(() => {
        window.open(`ranking.html?level=${$("#level").val()}`, "_self")
    });
    $("#logout").click(() => logout());
}


function startGame() {
    fillBoard();
    $randNumber = getRandNumber(1, Math.pow(getLevel(), 2));
    $(`#mole_${$randNumber}`).attr("src", `img/${$imgsTheme.active}`);

}

//Cria a moldura do tabuleiro conforme o nível de dificuldade
function fillBoard() {
    $level = getLevel();
    if ($level) {
        $boardWidth = $imgWidth * $level;
        $boardHeight = $imgHeight * $level;
        $("#board").css({ "width": $boardWidth, "height": $boardHeight });
        placeHolesBoard($level);
    } else {
        $("#board").html("<p class='msgLevel'>Escolha um nível!</p>");
    }
}
//Insere os buracos das toupeiras no tabuleiro
function placeHolesBoard($level) {
    $("#board").empty();
    for ($i = 0; $i < Math.pow($level, 2); $i++) {
        $div = $("<div></div>");
        $img = $("<img>").attr({ "src": `img/${$imgsTheme.default}`, "id": `mole_${$i + 1}` });
        $img.addClass("figura");
        $($img).click(function () { updateScore(this) });//ArrowFunctio não funciona aqui
        $($div).append($img);
        $("#board").append($div);
    }

}

function updateScore($img) {
    if ($($img).attr("src").includes($imgsTheme.active)) {
        $("#score").text(Number($("#score").text()) + 1);
        $($img).attr("src", `img/${$imgsTheme.dead}`);
    }
}


function getRandNumber(min, max) {
    return Math.round((Math.random() * Math.abs(max - min)) + min);
}

function getLevel() {
    return $levels[$("#level").val()];
}

function btnCtrl() {
    $("#btnPause").prop('disabled', false);
    $("#btnStop").prop('disabled', false);
    $("#btnPlay").prop('disabled', true);
    $("#level").prop('disabled', true);
}
