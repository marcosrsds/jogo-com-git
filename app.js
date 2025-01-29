//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Jogo de adivinhar numeros';               ESSAS LINHAS FORAM SUBSTITUIDAS DEVIDO REPETIÇÃO
                                                                // PELO "exibirTextoNaTela".
//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha um numero entre 1 e 10:'; 
let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', 
        {rate:1.2} );
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    exibirTextoNaTela('p', `Chute entre 1 e ${numeroLimite}!!`);
}
exibirMensagemInicial();


function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
    exibirTextoNaTela('h1', 'ACERTOU!!');
    let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
    let mensagemTentativas = `Muito bem voce descobriu o numero em ${tentativas} ${palavraTentativa} !`;
    exibirTextoNaTela('p', mensagemTentativas);
    document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
        exibirTextoNaTela('p', 'o numero é menor');
        } else {
            exibirTextoNaTela('p', ' o numero é maior');
        }
        //tentativas = tentativas + 1;
        tentativas++;
        limparCampo();       
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    }else{
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    //exibirTextoNaTela('h1', 'Jogo do Número Secreto'); linhas substituidas por "exibirMensagemInicial"
    //exibirTextoNaTela('p', 'Chute entre 1 e 10!!');
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}
