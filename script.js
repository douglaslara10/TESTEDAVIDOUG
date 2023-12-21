document.addEventListener("DOMContentLoaded", function () {
    const cadastroBox = document.querySelector(".box");
    const quizScreen = document.querySelector(".quiz-screen");
    const startQuizButton = document.getElementById("startQuiz");
    const cadastrarButton = document.getElementById("cadastrar");
    const quizContainer = document.getElementById("quizContainer");
    const tempoRestanteSpan = document.getElementById("tempoRestante");
    const barraProgresso = document.getElementById("barraProgresso");

    const perguntas = [
        {
            pergunta: "Qual é a capital do Brasil?",
            opcoes: ["Rio de Janeiro", "Brasília", "São Paulo", "Belo Horizonte"],
            respostaCorreta: "Brasília",
        },
        {
            pergunta: "Qual é o maior planeta do nosso sistema solar?",
            opcoes: ["Júpiter", "Saturno", "Vênus", "Marte"],
            respostaCorreta: "Júpiter",
        },

      
    {
        pergunta: "Quem escreveu 'Romeu e Julieta'?",
        opcoes: ["Charles Dickens", "Jane Austen", "William Shakespeare", "F. Scott Fitzgerald"],
        respostaCorreta: "William Shakespeare",
    },
    {
        pergunta: "Qual é o número atômico do carbono?",
        opcoes: ["6", "14", "26", "32"],
        respostaCorreta: "6",
    },
    {
        pergunta: "Qual é o oceano mais profundo do mundo?",
        opcoes: ["Oceano Atlântico", "Oceano Pacífico", "Oceano Índico", "Oceano Ártico"],
        respostaCorreta: "Oceano Pacífico",
    },
    {
        pergunta: "Em que ano a Declaração de Independência dos Estados Unidos foi assinada?",
        opcoes: ["1776", "1789", "1801", "1824"],
        respostaCorreta: "1776",
    },
    {
        pergunta: "Quem pintou a Mona Lisa?",
        opcoes: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"],
        respostaCorreta: "Leonardo da Vinci",
    },
    {
        pergunta: "Qual é a montanha mais alta do mundo?",
        opcoes: ["Monte Everest", "Monte Kilimanjaro", "Monte McKinley", "Monte Elbrus"],
        respostaCorreta: "Monte Everest",
    },
    {
        pergunta: "Quantos elementos químicos existem na tabela periódica?",
        opcoes: ["92", "118", "103", "109"],
        respostaCorreta: "118",
    },
    {
        pergunta: "Quem foi o primeiro presidente dos Estados Unidos?",
        opcoes: ["George Washington", "Thomas Jefferson", "John Adams", "Abraham Lincoln"],
        respostaCorreta: "George Washington",
    },
    // Novas perguntas
    {
        pergunta: "Qual é o rio mais longo do mundo?",
        opcoes: ["Rio Nilo", "Rio Amazonas", "Rio Yangtzé", "Rio Mississipi"],
        respostaCorreta: "Rio Amazonas",
    },
    {
        pergunta: "Quem foi o inventor da lâmpada elétrica?",
        opcoes: ["Thomas Edison", "Nikola Tesla", "Alexander Graham Bell", "Marie Curie"],
        respostaCorreta: "Thomas Edison",
    },
    {
        pergunta: "Qual é o país mais populoso do mundo?",
        opcoes: ["Índia", "China", "Estados Unidos", "Brasil"],
        respostaCorreta: "China",
    },
    {
        pergunta: "Quem escreveu 'Dom Quixote'?",
        opcoes: ["William Shakespeare", "Miguel de Cervantes", "Homer", "Charles Dickens"],
        respostaCorreta: "Miguel de Cervantes",
    },
    {
        pergunta: "Qual é a temperatura de congelamento da água em graus Celsius?",
        opcoes: ["0", "100", "-10", "25"],
        respostaCorreta: "0",
    },
    {
        pergunta: "Quem foi o fundador da Microsoft?",
        opcoes: ["Steve Jobs", "Bill Gates", "Mark Zuckerberg", "Jeff Bezos"],
        respostaCorreta: "Bill Gates",
    },
    {
        pergunta: "Qual é a maior cordilheira do mundo?",
        opcoes: ["Cordilheira dos Andes", "Cordilheira do Himalaia", "Montanhas Rochosas", "Alpes"],
        respostaCorreta: "Cordilheira do Himalaia",
    },
    {
        pergunta: "Em que ano a Primeira Guerra Mundial começou?",
        opcoes: ["1910", "1914", "1918", "1922"],
        respostaCorreta: "1914",
    },// Adicione mais perguntas conforme necessário
    ];

    let perguntasQuiz = [];
    let perguntaAtual = 0;
    let tempoRestante = 10;
    let temporizador;
    let progresso = 0;

    // Adiciona um ouvinte de evento ao botão "Cadastrar"
    cadastrarButton.addEventListener("click", function (event) {
        // Impede o envio do formulário para evitar recarregar a página
        event.preventDefault();
        // Esconde a tela de cadastro
        cadastroBox.style.display = "none";
        // Mostra a tela do quiz
        quizScreen.style.display = "flex";
        // Habilita o botão "Iniciar Quiz"
        startQuizButton.removeAttribute("disabled");

        // Embaralha as perguntas para obter uma ordem aleatória
        perguntasQuiz = shuffleArray(perguntas).slice(0, 10);
    });

    // Adiciona um ouvinte de evento ao botão "Iniciar Quiz"
    startQuizButton.addEventListener("click", function () {
        // Esconde a tela do quiz de autorização
        quizScreen.style.display = "none";
        // Inicia o quiz
        iniciarQuiz();
    });

    function shuffleArray(array) {
        // Função para embaralhar o array usando o algoritmo de Fisher-Yates
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    async function iniciarQuiz() {
        // Limpa o conteúdo existente no contêiner do quiz
        quizContainer.innerHTML = "";
        // Exibe o contêiner do quiz
        quizContainer.style.display = "block";

        // Itera sobre as perguntas do quiz
        for (let i = 0; i < perguntasQuiz.length; i++) {
            const perguntaAtual = perguntasQuiz[i];

            // Cria um elemento div para a pergunta
            const perguntaDiv = document.createElement("div");
            perguntaDiv.classList.add("pergunta");

            // Adiciona o texto da pergunta à div
            const numeroPergunta = i + 1;
            perguntaDiv.innerHTML = `<strong>${numeroPergunta}.</strong> ${perguntaAtual.pergunta}`;

            // Cria um elemento ul para as opções de resposta
            const opcoesUl = document.createElement("ul");

            // Embaralha as opções de resposta para obter uma ordem aleatória
            const opcoesEmbaralhadas = shuffleArray(perguntaAtual.opcoes);

            // Itera sobre as opções de resposta e as adiciona à lista
            for (let j = 0; j < opcoesEmbaralhadas.length; j++) {
                const opcaoLi = document.createElement("li");
                opcaoLi.innerText = opcoesEmbaralhadas[j];
                opcaoLi.addEventListener("click", function () {
                    verificarResposta(opcaoLi, perguntaAtual);
                });
                opcoesUl.appendChild(opcaoLi);
            }

            // Adiciona o elemento ul ao div da pergunta
            perguntaDiv.appendChild(opcoesUl);

            // Adiciona a div da pergunta ao contêiner do quiz
            quizContainer.appendChild(perguntaDiv);

            // Reinicia o temporizador e a barra de progresso para cada pergunta
            iniciarTemporizador();
            // Aguarda o término do temporizador antes de passar para a próxima pergunta
            await aguardarTemporizador();
        }
        // Quiz concluído
        alert("Quiz concluído! Obrigado por participar.");
        // Aqui você pode adicionar lógica adicional, como enviar resultados, etc.
    }

    function iniciarTemporizador() {
        tempoRestante = 10;
        progresso = 0;
        barraProgresso.style.width = "100%";
        barraProgresso.style.transition = "width 10s linear";
        tempoRestanteSpan.textContent = tempoRestante;

        temporizador = setInterval(function () {
            tempoRestanteSpan.textContent = tempoRestante;
            progresso = 100 - (tempoRestante / 10) * 100;
            barraProgresso.style.width = `${progresso}%`;

            tempoRestante--;
            if (tempoRestante < 0) {
                clearInterval(temporizador);
                proximaPergunta();
            }
        }, 1000);
    }

    function aguardarTemporizador() {
        return new Promise((resolve) => {
            setTimeout(() => {
                clearInterval(temporizador);
                resolve();
            }, (10 - tempoRestante) * 1000);
        });
    }

    function verificarResposta(opcaoSelecionada, pergunta) {
        const opcoes = opcaoSelecionada.parentElement.children;

        // Desabilita todas as opções para impedir mais cliques
        for (let i = 0; i < opcoes.length; i++) {
            opcoes[i].style.pointerEvents = "none";
        }

        // Verifica se a opção selecionada está correta
        if (opcaoSelecionada.innerText === pergunta.respostaCorreta) {
            piscarElemento(opcaoSelecionada, "resposta-correta");
        } else {
            piscarElemento(opcaoSelecionada, "resposta-incorreta");

            // Destaca a resposta correta em verde
            for (let i = 0; i < opcoes.length; i++) {
                if (opcoes[i].innerText === pergunta.respostaCorreta) {
                    piscarElemento(opcoes[i], "resposta-correta");
                    break;
                }
            }
        }
    }

    function piscarElemento(elemento, classe) {
        const intervalo = setInterval(() => {
            elemento.classList.toggle(classe);
        }, 200);
        setTimeout(() => {
            clearInterval(intervalo);
            elemento.classList.remove(classe);
        }, 3000);
    }

    function proximaPergunta() {
        // Avança para a próxima pergunta ou finaliza o quiz
        const perguntaAtual = document.querySelector(".pergunta");
        if (perguntaAtual.nextElementSibling) {
            perguntaAtual.style.display = "none";
            perguntaAtual.nextElementSibling.style.display = "block";
        } else {
            // Quiz concluído
            alert("Quiz concluído! Obrigado por participar.");
            // Aqui você pode adicionar lógica adicional, como enviar resultados, etc.
        }
    }
});
