document.addEventListener("DOMContentLoaded", function () {
    const cadastroBox = document.querySelector(".box");
    const quizScreen = document.querySelector(".quiz-screen");
    const startQuizButton = document.getElementById("startQuiz");
    const cadastrarButton = document.getElementById("cadastrar");

    // Adiciona um ouvinte de evento ao botão "Cadastrar"
    cadastrarButton.addEventListener("click", function (event) {
        // Impede o envio do formulário para evitar recarregar a página
        event.preventDefault();
        // Esconde a tela de cadastro
        cadastroBox.style.display = "none";
        // Mostra a tela do quiz
        quizScreen.style.display = "flex";
    });

    // Adiciona um ouvinte de evento ao botão "Iniciar Quiz"
    startQuizButton.addEventListener("click", function () {
        // Aqui você pode adicionar lógica para começar o quiz, navegar para a primeira pergunta, etc.
        // Por enquanto, apenas esconde a tela do quiz
        quizScreen.style.display = "none";
    });
});
