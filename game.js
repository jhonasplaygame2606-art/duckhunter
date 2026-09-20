// ============================================================
// DUCK HUNTER
// Versão completa
// HTML + CSS + JavaScript puro
// ============================================================


// ============================================================
// CANVAS
// ============================================================

const canvas =
    document.getElementById("canvas");

const ctx =
    canvas.getContext("2d");


canvas.width = 800;
canvas.height = 500;


// ============================================================
// IMAGENS
// ============================================================

const fundo = new Image();
fundo.src = "background.png";


const imagemPato = new Image();
imagemPato.src = "pato.png";


const imagemFrango = new Image();
imagemFrango.src = "frango.png";


const imagemBalas = new Image();
imagemBalas.src = "balas.png";


// ============================================================
// SOM
// ============================================================

const somTiro =
    new Audio("tiro.mp3");


// ============================================================
// TELAS
// ============================================================

const menu =
    document.getElementById("menu");

const pausa =
    document.getElementById("pausa");

const gameOver =
    document.getElementById("gameOver");

const faseCompleta =
    document.getElementById("faseCompleta");


// ============================================================
// TEXTOS
// ============================================================

const resultadoFinal =
    document.getElementById(
        "resultadoFinal"
    );

const textoFase =
    document.getElementById(
        "textoFase"
    );

const textoPontosFase =
    document.getElementById(
        "textoPontosFase"
    );


// ============================================================
// BOTÕES
// ============================================================

const btnJogar =
    document.getElementById(
        "btnJogar"
    );

const btnContinuar =
    document.getElementById(
        "btnContinuar"
    );

const btnReiniciar =
    document.getElementById(
        "btnReiniciar"
    );

const btnReiniciarPausa =
    document.getElementById(
        "btnReiniciarPausa"
    );

const btnMenuPausa =
    document.getElementById(
        "btnMenuPausa"
    );

const btnMenuFim =
    document.getElementById(
        "btnMenuFim"
    );

const btnProximaFase =
    document.getElementById(
        "btnProximaFase"
    );

const btnAtirar =
    document.getElementById(
        "btnAtirar"
    );

const btnPausaMobile =
    document.getElementById(
        "btnPausaMobile"
    );

const btnTelaCheia =
    document.getElementById(
        "btnTelaCheia"
    );

const btnTelaCheiaMenu =
    document.getElementById(
        "btnTelaCheiaMenu"
    );

const btnMenuMobile =
    document.getElementById(
        "btnMenuMobile"
    );

const controlesMobile =
    document.getElementById(
        "controlesMobile"
    );

const flashTiro =
    document.getElementById(
        "flashTiro"
    );


// ============================================================
// ESTADO DO JOGO
// ============================================================

let jogoRodando = false;

let jogoPausado = false;

let pontos = 0;

let fase = 1;

let balas = 7;

let patos = [];

let frango = null;

let particulas = [];

let tirosVisuais = [];

let tempoFrango = 0;

let tempoFase = 0;

let tempo = 0;


// ============================================================
// CONFIGURAÇÕES
// ============================================================

const LARGURA =
    canvas.width;

const ALTURA =
    canvas.height;


// ============================================================
// TELAS
// ============================================================

function esconderTelas() {

    menu.classList.add(
        "escondido"
    );

    pausa.classList.add(
        "escondido"
    );

    gameOver.classList.add(
        "escondido"
    );

    faseCompleta.classList.add(
        "escondido"
    );
}


// ============================================================
// MENU
// ============================================================

function abrirMenu() {

    jogoRodando = false;

    jogoPausado = false;

    esconderTelas();

    menu.classList.remove(
        "escondido"
    );

    controlesMobile.classList.add(
        "escondido"
    );
}


// ============================================================
// INICIAR JOGO
// ============================================================

function iniciarJogo() {

    pontos = 0;

    fase = 1;

    jogoRodando = true;

    jogoPausado = false;

    particulas = [];

    tirosVisuais = [];

    esconderTelas();

    controlesMobile.classList.remove(
        "escondido"
    );

    criarFase();
}


// ============================================================
// CRIAR FASE
// ============================================================

function criarFase() {

    patos = [];

    frango = null;

    particulas = [];

    tirosVisuais = [];

    tempoFrango = 0;

    tempoFase = 0;


    // A cada fase aparecem mais patos

    const quantidade =
        Math.min(
            3 + fase * 2,
            18
        );


    // Mais dificuldade

    balas =
        7 +
        Math.min(fase, 8);


    for (
        let i = 0;
        i < quantidade;
        i++
    ) {

        criarPato(
            i
        );
    }
}


// ============================================================
// CRIAR PATO
// ============================================================

function criarPato(indice) {

    const tamanho =
        72 +
        Math.random() * 28;


    const pato = {

        x:
            LARGURA +
            80 +
            indice * 70 +
            Math.random() * 200,

        y:
            85 +
            Math.random() *
            (ALTURA - 200),

        tamanho:
            tamanho,

        velocidade:
            1.8 +
            Math.random() * 2 +
            fase * 0.18,

        inclinacao:
            Math.random() * 0.12 - 0.06,

        onda:
            Math.random() *
            Math.PI * 2,

        vivo:
            true
    };


    patos.push(
        pato
    );
}


// ============================================================
// CRIAR FRANGO
// ============================================================

function criarFrango() {

    if (frango !== null) {
        return;
    }


    frango = {

        x:
            LARGURA + 100,

        y:
            90 +
            Math.random() *
            (ALTURA - 200),

        tamanho:
            75,

        velocidade:
            3 +
            fase * 0.15,

        onda:
            Math.random() *
            Math.PI * 2,

        vivo:
            true
    };
}


// ============================================================
// PAUSA
// ============================================================

function pausarJogo() {

    if (!jogoRodando) {
        return;
    }


    jogoPausado = true;


    pausa.classList.remove(
        "escondido"
    );
}


// ============================================================
// CONTINUAR
// ============================================================

function continuarJogo() {

    if (!jogoRodando) {
        return;
    }


    jogoPausado = false;


    pausa.classList.add(
        "escondido"
    );
}


// ============================================================
// GAME OVER
// ============================================================

function terminarJogo() {

    jogoRodando = false;

    jogoPausado = false;


    resultadoFinal.textContent =
        "Pontos: " +
        pontos +
        "  •  Fase: " +
        fase;


    controlesMobile.classList.add(
        "escondido"
    );


    gameOver.classList.remove(
        "escondido"
    );
}


// ============================================================
// FASE COMPLETA
// ============================================================

function completarFase() {

    jogoPausado = true;


    textoFase.textContent =
        "Você terminou a fase " +
        fase;


    textoPontosFase.textContent =
        "+" +
        pontos +
        " pontos totais";


    faseCompleta.classList.remove(
        "escondido"
    );
}


// ============================================================
// PRÓXIMA FASE
// ============================================================

function iniciarProximaFase() {

    fase++;

    jogoPausado = false;

    faseCompleta.classList.add(
        "escondido"
    );

    criarFase();
}


// ============================================================
// ATIRAR
// ============================================================

function atirar(x, y) {

    if (
        !jogoRodando ||
        jogoPausado
    ) {

        return;
    }


    if (balas <= 0) {

        return;
    }


    balas--;


    // Som

    somTiro.currentTime = 0;

    somTiro.play().catch(
        function () {}
    );


    // Flash

    flashTiro.classList.remove(
        "escondido"
    );


    setTimeout(
        function () {

            flashTiro.classList.add(
                "escondido"
            );

        },
        120
    );


    // Efeito visual do tiro

    tirosVisuais.push({

        x: x,

        y: y,

        vida: 12

    });


    let acertou = false;


    // ========================================================
    // VERIFICAR PATOS
    // ========================================================

    for (
        let i = patos.length - 1;
        i >= 0;
        i--
    ) {

        const pato =
            patos[i];


        /*
         * Aqui o jogador precisa clicar
         * DENTRO do pato.
         */

        if (
            x >= pato.x &&
            x <=
                pato.x +
                pato.tamanho &&

            y >= pato.y &&
            y <=
                pato.y +
                pato.tamanho
        ) {

            acertou = true;


            pontos += 2;


            criarExplosao(
                pato.x +
                pato.tamanho / 2,

                pato.y +
                pato.tamanho / 2
            );


            patos.splice(
                i,
                1
            );


            break;
        }
    }


    // ========================================================
    // FRANGO
    // ========================================================

    if (
        !acertou &&
        frango !== null
    ) {

        if (
            x >= frango.x &&
            x <=
                frango.x +
                frango.tamanho &&

            y >= frango.y &&
            y <=
                frango.y +
                frango.tamanho
        ) {

            pontos += 5;


            criarExplosao(
                frango.x +
                frango.tamanho / 2,

                frango.y +
                frango.tamanho / 2
            );


            frango = null;


            acertou = true;
        }
    }


    // ========================================================
    // FASE COMPLETA
    // ========================================================

    if (
        patos.length === 0
    ) {

        setTimeout(
            function () {

                if (
                    jogoRodando
                ) {

                    completarFase();
                }

            },
            300
        );

        return;
    }


    // ========================================================
    // SEM BALAS
    // ========================================================

    if (
        balas <= 0 &&
        patos.length > 0
    ) {

        setTimeout(
            function () {

                if (
                    jogoRodando &&
                    patos.length > 0
                ) {

                    terminarJogo();
                }

            },
            350
        );
    }
}


// ============================================================
// CRIAR EXPLOSÃO
// ============================================================

function criarExplosao(
    x,
    y
) {

    for (
        let i = 0;
        i < 18;
        i++
    ) {

        const angulo =
            Math.random() *
            Math.PI *
            2;


        const velocidade =
            1 +
            Math.random() * 4;


        particulas.push({

            x: x,

            y: y,

            vx:
                Math.cos(angulo) *
                velocidade,

            vy:
                Math.sin(angulo) *
                velocidade,

            vida:
                25 +
                Math.random() * 20,

            tamanho:
                2 +
                Math.random() * 4
        });
    }
}


// ============================================================
// ATUALIZAR PARTÍCULAS
// ============================================================

function atualizarParticulas() {

    for (
        let i =
            particulas.length - 1;

        i >= 0;

        i--
    ) {

        const p =
            particulas[i];


        p.x += p.vx;

        p.y += p.vy;

        p.vy += 0.08;

        p.vida--;


        if (
            p.vida <= 0
        ) {

            particulas.splice(
                i,
                1
            );
        }
    }
}


// ============================================================
// DESENHAR PARTÍCULAS
// ============================================================

function desenharParticulas() {

    for (
        const p of particulas
    ) {

        ctx.globalAlpha =
            Math.max(
                0,
                p.vida / 45
            );


        ctx.fillStyle =
            "#ffe36e";


        ctx.beginPath();


        ctx.arc(
            p.x,
            p.y,
            p.tamanho,
            0,
            Math.PI * 2
        );


        ctx.fill();
    }


    ctx.globalAlpha = 1;
}


// ============================================================
// MOVER PATOS
// ============================================================

function moverPatos() {

    for (
        const pato of patos
    ) {

        pato.x -=
            pato.velocidade;


        pato.onda += 0.04;


        pato.y +=
            Math.sin(
                pato.onda
            ) *
            0.6;


        if (
            pato.x <
            -pato.tamanho
        ) {

            pato.x =
                LARGURA +
                40 +
                Math.random() *
                180;


            pato.y =
                85 +
                Math.random() *
                (ALTURA - 200);
        }
    }
}


// ============================================================
// MOVER FRANGO
// ============================================================

function moverFrango() {

    if (
        frango === null
    ) {

        return;
    }


    frango.x -=
        frango.velocidade;


    frango.onda +=
        0.05;


    frango.y +=
        Math.sin(
            frango.onda
        ) *
        0.8;


    if (
        frango.x <
        -frango.tamanho
    ) {

        frango = null;
    }
}


// ============================================================
// CONTROLAR FRANGO
// ============================================================

function controlarFrango() {

    tempoFrango++;


    // Aparece depois de um tempo

    if (
        tempoFrango >
            800 &&
        frango === null
    ) {

        criarFrango();

        tempoFrango = 0;
    }
}


// ============================================================
// ATUALIZAR TIROS VISUAIS
// ============================================================

function atualizarTiros() {

    for (
        let i =
            tirosVisuais.length - 1;

        i >= 0;

        i--
    ) {

        tirosVisuais[i].vida--;


        if (
            tirosVisuais[i].vida <= 0
        ) {

            tirosVisuais.splice(
                i,
                1
            );
        }
    }
}


// ============================================================
// DESENHAR TIROS
// ============================================================

function desenharTiros() {

    for (
        const tiro of tirosVisuais
    ) {

        ctx.strokeStyle =
            "rgba(255,255,255,0.85)";

        ctx.lineWidth = 2;


        ctx.beginPath();


        ctx.arc(
            tiro.x,
            tiro.y,
            8 +
                (12 -
                    tiro.vida) *
                    2,

            0,
            Math.PI * 2
        );


        ctx.stroke();


        ctx.lineWidth = 1;
    }
}


// ============================================================
// DESENHAR FUNDO
// ============================================================

function desenharFundo() {

    if (
        fundo.complete &&
        fundo.naturalWidth > 0
    ) {

        /*
         * Preenche a tela mantendo
         * a proporção do background.
         */

        const proporcaoImagem =
            fundo.width /
            fundo.height;


        const proporcaoCanvas =
            LARGURA /
            ALTURA;


        let largura;
        let altura;
        let x;
        let y;


        if (
            proporcaoImagem >
            proporcaoCanvas
        ) {

            altura = ALTURA;

            largura =
                ALTURA *
                proporcaoImagem;

        } else {

            largura = LARGURA;

            altura =
                LARGURA /
                proporcaoImagem;
        }


        x =
            (LARGURA -
                largura) /
            2;


        y =
            (ALTURA -
                altura) /
            2;


        ctx.drawImage(
            fundo,
            x,
            y,
            largura,
            altura
        );

    } else {

        ctx.fillStyle =
            "#3782b8";


        ctx.fillRect(
            0,
            0,
            LARGURA,
            ALTURA
        );
    }
}


// ============================================================
// DESENHAR PATO
// ============================================================

function desenharPato(
    pato
) {

    if (
        !imagemPato.complete
    ) {

        return;
    }


    ctx.save();


    ctx.translate(
        pato.x +
            pato.tamanho / 2,

        pato.y +
            pato.tamanho / 2
    );


    ctx.rotate(
        pato.inclinacao
    );


    ctx.drawImage(
        imagemPato,

        -pato.tamanho / 2,

        -pato.tamanho / 2,

        pato.tamanho,

        pato.tamanho
    );


    ctx.restore();
}


// ============================================================
// DESENHAR FRANGO
// ============================================================

function desenharFrango() {

    if (
        frango === null ||
        !imagemFrango.complete
    ) {

        return;
    }


    ctx.drawImage(
        imagemFrango,

        frango.x,

        frango.y,

        frango.tamanho,

        frango.tamanho
    );
}


// ============================================================
// DESENHAR HUD
// ============================================================

function desenharHUD() {

    // Barra superior

    const gradiente =
        ctx.createLinearGradient(
            0,
            0,
            0,
            72
        );


    gradiente.addColorStop(
        0,
        "rgba(3,12,23,0.9)"
    );


    gradiente.addColorStop(
        1,
        "rgba(3,12,23,0.45)"
    );


    ctx.fillStyle =
        gradiente;


    ctx.fillRect(
        0,
        0,
        LARGURA,
        72
    );


    // Linha inferior

    ctx.fillStyle =
        "rgba(255,255,255,0.12)";


    ctx.fillRect(
        0,
        71,
        LARGURA,
        1
    );


    // Pontos

    ctx.fillStyle =
        "#ffffff";


    ctx.font =
        "bold 20px Arial";


    ctx.textAlign =
        "left";


    ctx.fillText(
        "PONTOS",
        18,
        25
    );


    ctx.font =
        "bold 23px Arial";


    ctx.fillStyle =
        "#75c7ff";


    ctx.fillText(
        pontos,
        18,
        51
    );


    // Fase

    ctx.fillStyle =
        "#ffffff";


    ctx.font =
        "bold 18px Arial";


    ctx.textAlign =
        "center";


    ctx.fillText(
        "FASE " + fase,
        LARGURA / 2,
        28
    );


    ctx.font =
        "14px Arial";


    ctx.fillStyle =
        "#cbd7e1";


    ctx.fillText(
        patos.length +
        " patos restantes",
        LARGURA / 2,
        50
    );


    // Balas

    ctx.textAlign =
        "right";


    ctx.font =
        "bold 17px Arial";


    ctx.fillStyle =
        "#ffffff";


    ctx.fillText(
        "BALAS",
        LARGURA - 18,
        24
    );


    // Desenhar balas

    for (
        let i = 0;
        i < balas;
        i++
    ) {

        const tamanho =
            17;


        const espacamento =
            19;


        const x =
            LARGURA -
            18 -
            (i + 1) *
                espacamento;


        const y =
            34;


        if (
            imagemBalas.complete &&
            imagemBalas.naturalWidth > 0
        ) {

            ctx.drawImage(
                imagemBalas,
                x,
                y,
                tamanho,
                tamanho
            );

        } else {

            ctx.fillStyle =
                "#f4cf45";


            ctx.beginPath();


            ctx.arc(
                x + 8,
                y + 8,
                5,
                0,
                Math.PI * 2
            );


            ctx.fill();
        }
    }


    ctx.textAlign =
        "left";
}


// ============================================================
// DESENHAR MIRA
// ============================================================

function desenharMira() {

    /*
     * No PC usamos a posição
     * real do mouse.
     */

    if (
        window.innerWidth <= 700
    ) {

        return;
    }


    if (
        mouseX === null ||
        mouseY === null
    ) {

        return;
    }


    ctx.save();


    ctx.strokeStyle =
        "rgba(255,255,255,0.9)";


    ctx.lineWidth = 2;


    ctx.beginPath();


    ctx.arc(
        mouseX,
        mouseY,
        13,
        0,
        Math.PI * 2
    );


    ctx.stroke();


    ctx.beginPath();


    ctx.moveTo(
        mouseX - 20,
        mouseY
    );


    ctx.lineTo(
        mouseX - 6,
        mouseY
    );


    ctx.moveTo(
        mouseX + 6,
        mouseY
    );


    ctx.lineTo(
        mouseX + 20,
        mouseY
    );


    ctx.moveTo(
        mouseX,
        mouseY - 20
    );


    ctx.lineTo(
        mouseX,
        mouseY - 6
    );


    ctx.moveTo(
        mouseX,
        mouseY + 6
    );


    ctx.lineTo(
        mouseX,
        mouseY + 20
    );


    ctx.stroke();


    ctx.fillStyle =
        "#ff4545";


    ctx.beginPath();


    ctx.arc(
        mouseX,
        mouseY,
        2.5,
        0,
        Math.PI * 2
    );


    ctx.fill();


    ctx.restore();
}


// ============================================================
// MOUSE
// ============================================================

let mouseX = null;

let mouseY = null;


canvas.addEventListener(
    "mousemove",
    function (event) {

        const pos =
            converterPosicao(
                event.clientX,
                event.clientY
            );


        mouseX =
            pos.x;

        mouseY =
            pos.y;
    }
);


// ============================================================
// CONVERTER POSIÇÃO
// ============================================================

function converterPosicao(
    clientX,
    clientY
) {

    const rect =
        canvas.getBoundingClientRect();


    return {

        x:
            (clientX -
                rect.left) *
            (LARGURA /
                rect.width),

        y:
            (clientY -
                rect.top) *
            (ALTURA /
                rect.height)
    };
}


// ============================================================
// CLIQUE NO PC
// ============================================================

canvas.addEventListener(
    "click",
    function (event) {

        const pos =
            converterPosicao(
                event.clientX,
                event.clientY
            );


        atirar(
            pos.x,
            pos.y
        );
    }
);


// ============================================================
// TOQUE NO CELULAR
// ============================================================

canvas.addEventListener(
    "touchstart",
    function (event) {

        event.preventDefault();


        if (
            event.touches.length === 0
        ) {

            return;
        }


        const toque =
            event.touches[0];


        const pos =
            converterPosicao(
                toque.clientX,
                toque.clientY
            );


        atirar(
            pos.x,
            pos.y
        );

    },
    {
        passive: false
    }
);


// ============================================================
// BOTÃO ATIRAR
// ============================================================

btnAtirar.onclick =
    function () {

        /*
         * O botão serve para atirar
         * no ponto central da tela.
         */

        atirar(
            LARGURA / 2,
            ALTURA / 2
        );
    };


// ============================================================
// BOTÃO JOGAR
// ============================================================

btnJogar.onclick =
    function () {

        iniciarJogo();
    };


// ============================================================
// BOTÃO CONTINUAR
// ============================================================

btnContinuar.onclick =
    function () {

        continuarJogo();
    };


// ============================================================
// BOTÃO REINICIAR
// ============================================================

btnReiniciar.onclick =
    function () {

        iniciarJogo();
    };


btnReiniciarPausa.onclick =
    function () {

        iniciarJogo();
    };


// ============================================================
// BOTÃO MENU
// ============================================================

btnMenuPausa.onclick =
    function () {

        abrirMenu();
    };


btnMenuFim.onclick =
    function () {

        abrirMenu();
    };


btnMenuMobile.onclick =
    function () {

        abrirMenu();
    };


// ============================================================
// PRÓXIMA FASE
// ============================================================

btnProximaFase.onclick =
    function () {

        iniciarProximaFase();
    };


// ============================================================
// PAUSA MOBILE
// ============================================================

btnPausaMobile.onclick =
    function () {

        if (
            !jogoRodando
        ) {

            return;
        }


        if (
            jogoPausado
        ) {

            continuarJogo();

        } else {

            pausarJogo();
        }
    };


// ============================================================
// FULLSCREEN
// ============================================================

async function telaCheia() {

    try {

        if (
            !document.fullscreenElement
        ) {

            await document.documentElement
                .requestFullscreen();

        } else {

            await document.exitFullscreen();
        }

    } catch (erro) {

        console.log(
            "Fullscreen não disponível."
        );
    }
}


btnTelaCheia.onclick =
    function () {

        telaCheia();
    };


btnTelaCheiaMenu.onclick =
    function () {

        telaCheia();
    };


// ============================================================
// TECLADO
// ============================================================

document.addEventListener(
    "keydown",
    function (event) {

        const tecla =
            event.key.toLowerCase();


        // P ou ESC

        if (
            tecla === "p" ||
            tecla === "escape"
        ) {

            if (
                jogoRodando
            ) {

                if (
                    jogoPausado
                ) {

                    continuarJogo();

                } else {

                    pausarJogo();
                }
            }
        }


        // R

        if (
            tecla === "r"
        ) {

            if (
                jogoRodando ||
                !gameOver.classList.contains(
                    "escondido"
                )
            ) {

                iniciarJogo();
            }
        }


        // M

        if (
            tecla === "m"
        ) {

            abrirMenu();
        }
    }
);


// ============================================================
// LOOP
// ============================================================

function loop() {

    // Fundo

    desenharFundo();


    if (
        jogoRodando
    ) {

        if (
            !jogoPausado
        ) {

            moverPatos();

            moverFrango();

            controlarFrango();

            atualizarParticulas();

            atualizarTiros();
        }


        // Patos

        for (
            const pato of patos
        ) {

            desenharPato(
                pato
            );
        }


        // Frango

        desenharFrango();


        // Efeitos

        desenharParticulas();

        desenharTiros();


        // HUD

        desenharHUD();


        // Mira

        desenharMira();
    }


    requestAnimationFrame(
        loop
    );
}


// ============================================================
// INICIAR
// ============================================================

abrirMenu();

loop();