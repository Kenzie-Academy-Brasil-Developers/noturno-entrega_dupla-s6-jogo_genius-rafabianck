// interface com DOM

function criarTabuleiro() {
    const body = document.querySelector('body');
    const divContainer = document.createElement('div');
    divContainer.setAttribute('class', 'container');

    const titulo = document.createElement('h1');
    titulo.innerText = 'Genius';

    const divTabuleiro = document.createElement('div');
    divTabuleiro.setAttribute('class', 'tabuleiro');
    
    const divVerde = document.createElement('div');
    divVerde.setAttribute('id', 'green');
    divVerde.classList.add('botao', 'botao--green');
    
    const divAmarelo = document.createElement('div');
    divAmarelo.setAttribute('id', 'yellow');
    divAmarelo.classList.add('botao', 'botao--yellow');
   
    const divVermelho = document.createElement('div');
    divVermelho.setAttribute('id', 'red');
    divVermelho.classList.add('botao', 'botao--red');
   
    const divAzul = document.createElement('div');
    divAzul.setAttribute('id', 'blue');
    divAzul.classList.add('botao', 'botao--blue');
    
    const divInfo = document.createElement('div');
    divInfo.setAttribute('class', 'informacoes');
    
    const btnIniciar = document.createElement('button');
    btnIniciar.setAttribute('id', 'iniciar');
    btnIniciar.innerText = 'INICIAR';


    body.appendChild(divContainer);
    divContainer.appendChild(titulo);
    divContainer.appendChild(divTabuleiro);
    divTabuleiro.appendChild(divInfo);
    divInfo.appendChild(btnIniciar);
    divTabuleiro.appendChild(divVerde);
    divTabuleiro.appendChild(divAmarelo);
    divTabuleiro.appendChild(divVermelho);
    divTabuleiro.appendChild(divAzul);

}

criarTabuleiro();


let sequenciaJogo = [];
let sequenciaJogador = [];

let contador = 0;



// ordem aleatória de cores
function randomColor(min, max) {
    let colorOrder = Math.floor(Math.random() * (max - min) + min);

    return colorOrder;
}


// função para animar os botões
function animarBotao(botao, color) {
    botao.classList.add(`animacao${color}`);
    setTimeout(() => {
        botao.classList.remove(`animacao${color}`);
    }, 1000);
} 


function gerarAnimacaoNoBotao() {
    const randomNum = randomColor(0, 4);

    const botao = document.querySelectorAll('.botao')[randomNum];
    const corBotao = botao.classList[1].split('-')[2];

    sequenciaJogo.push(botao);
    let contadorRepeticoes = 0;

    const intervaloAnimacao = setInterval(() => {
        if(sequenciaJogo.length > 0) {

            setTimeout(() => {
                if (contadorRepeticoes < sequenciaJogo.length){
                    const botaoAtual = sequenciaJogo[contadorRepeticoes];
                    const corAtual = botaoAtual.classList[1].split('-')[2];

                    animarBotao(botaoAtual, corAtual);
                    contadorRepeticoes++;

                } else {
                    contadorRepeticoes = 0;
                    clearInterval(intervaloAnimacao);
                }
            }, 1000);

        } else {
            animarBotao(botao, corBotao);
            clearInterval(intervaloAnimacao);
        }
    }, 2000);
  
}

function adicionarEventosBotoes() {
    const botoes = document.querySelectorAll('.botao');
    for (let i = 0; i < botoes.length; i++) {
        botoes[i].addEventListener('click', (e) => {
            const botaoClicado = e.target;
            let cor = botaoClicado.classList[1].split('-')[2];

            animarBotao(botaoClicado, cor);
            sequenciaJogador.push(botaoClicado);

            if (verificarPerda()) {
                fimDeJogo();

            } else if (sequenciaJogador.length === sequenciaJogo.length) {
                sequenciaJogador = [];
                gerarAnimacaoNoBotao();

                texto.innerText = 'Sequência correta.';
                setTimeout(() => {texto.innerText = 'Repita a sequência!'}, 3000);
            }
        })
    }
}



// função para game over
function verificarPerda() {

    for (let i = 0; i < sequenciaJogador.length; i++) {
        const botao = sequenciaJogo[i];
        if (sequenciaJogador[i] !== botao) {
            return true;
        }
    }
    return false;
}

function iniciarJogo() {
    gerarAnimacaoNoBotao();
    adicionarEventosBotoes();
}

// INICIAR O JOGO
let btnIniciar = document.getElementById('iniciar');
btnIniciar.addEventListener ('click', function(){
    const divInfo = document.querySelector('.informacoes');
    
    divInfo.removeChild(btnIniciar);

    const texto = document.createElement('p')

    texto.setAttribute('id','texto');
    divInfo.appendChild(texto);
    texto.innerText = 'Repita a sequência!';
    iniciarJogo();
 })


 
//Botão "Jogar Novamente"
//O resultado do jogo é mostrado na tela
function finalizarJogo () {
    const info = document.querySelector('.informacoes');
    
    info.removeChild(texto);

    const divInfo = document.querySelector('.informacoes');
    const btnFim = document.createElement('button');
    
    btnFim.setAttribute('id','fim');
    btnFim.innerText = 'Jogar Novamente';
    divInfo.appendChild(btnFim);

    const pontuacao = document.createElement('p');
    
    pontuacao.setAttribute('id','pontuacao');
    info.appendChild(pontuacao);
    pontuacao.innerHTML = `Pontuação: ${sequenciaJogo.length -1}`;
    sequenciaJogo = [];

    btnFim.addEventListener('click', function() {
        document.location.reload(true);
    } )
 }