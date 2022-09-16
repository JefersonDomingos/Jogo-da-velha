const casasElementos = document.querySelectorAll(".casas");
const tabuleiro = document.querySelector(".tabuleiro");
const fimDeJogoTela = document.querySelector(".vencedor");
const fimDeJogoMensagem = document.querySelector(".vencedor-paragrafo");
const reiniciar = document.querySelector(".reiniciar-botao");

let vezDoCirculo;

const combinacoesDeVitoria = [
    //horizontal
    [0,1,2],
    [3,4,5],
    [6,7,8],

    //vertical
    [0,3,6],
    [1,4,7],
    [2,5,8],

    //diagonal
    [0,4,8],
    [2,4,6]
];


const quemComeca = () => {
    for(const casas of casasElementos){
        vezDoCirculo = false;
    
        //Resetar o jogo
        casas.classList.remove("circulo");
        casas.classList.remove("x");
        casas.removeEventListener("click", handleClick);
        casas.addEventListener("click", handleClick,{once: true});
    }
    
    selecionarClasseHover(); //alterar hover
  
    fimDeJogoTela.classList.remove("vencedor-mostrar");
      
}

//Fim de jogo 
const fimDeJogo = (empate) => {
    if(empate){ 
        fimDeJogoMensagem.innerText = "Empatou!"
    
    }else{
        fimDeJogoMensagem.innerText = vezDoCirculo ? "O venceu!" : "X venceu!";

    }
    
    fimDeJogoTela.classList.add("vencedor-mostrar");
}


//verificar quem ganhou
const verificarVencedor = (jogadorDaVez) => { 
   
    return combinacoesDeVitoria.some((combination) => {
        
    return combination.every((index) => { 
            
    return casasElementos[index].classList.contains(jogadorDaVez);
        });
    });
    
};

const verificarEmpate = () => { // se todos as casas tiverem a classe "x" ou "circulo"
    return [...casasElementos].every(casas => { //OS tres pontos e colchetes "[...]" transforma aquela constante em uma lista
    return  casas.classList.contains('x') || casas.classList.contains('circulo')
        
    })
}

const marcarJogada = (casas, jogadorDaVez) => {
     casas.classList.add(jogadorDaVez)
}

const selecionarClasseHover = () => {
    tabuleiro.classList.remove("circulo");
    tabuleiro.classList.remove("x");
    
    if(vezDoCirculo){
        tabuleiro.classList.add("circulo")
    }
   
    else{
        tabuleiro.classList.add("x")
    }
}

//trocar simbolo
const trocarSimbolo = () => {
    vezDoCirculo = !vezDoCirculo 
    selecionarClasseHover(); // limpar tabuleiro para o  hover
}


const handleClick = (elemento) => {
    const casas = elemento.target 
    const jogadorDaVez = vezDoCirculo ? "circulo" : "x"; //true : false
    
    marcarJogada(casas, jogadorDaVez)

    //Verificar por vitória
    const vencedor = verificarVencedor(jogadorDaVez);  
    
    //Verificar por empate
    const deuEmpate = verificarEmpate();

    if (vencedor){
        fimDeJogo(false); 
    }
    else if(deuEmpate){
        fimDeJogo(true);
    }
    else{
    //Mudar simbolo
    trocarSimbolo();

    }
};
quemComeca() 
reiniciar.addEventListener("click", quemComeca);


