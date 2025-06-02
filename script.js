// Lógica para navegação entre seções
function showSection(sectionId) {
    // Esconde todas as seções
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // Exibe a seção clicada
    document.getElementById(sectionId).style.display = 'block';

    // Se a seção do jogo for exibida, carrega a primeira pergunta
    if (sectionId === 'game') {
        loadQuestion();
    }
}

// Lógica para salvar o perfil
function saveProfile(event) {
    event.preventDefault(); // Impede o recarregamento da página

    const nomeInput = document.getElementById('nome');
    const fotoInput = document.getElementById('foto');
    const profileOutput = document.getElementById('profile-output');

    const nome = nomeInput.value;
    const foto = fotoInput.files[0]; // Pega o primeiro arquivo selecionado

    // Valida se o nome e a foto foram preenchidos
    if (!nome) {
        alert('Por favor, preencha seu nome.');
        return;
    }
    if (!foto) {
        alert('Por favor, selecione uma foto de perfil.');
        return;
    }

    // Exibe nome e foto no perfil
    const reader = new FileReader();
    
    reader.onload = function(e) {
        profileOutput.innerHTML = `
            <h3>Perfil Salvo:</h3>
            <img src="${e.target.result}" alt="Foto de perfil" class="profile-img">
            <p>Nome: <strong>${nome}</strong></p>
        `;
        // Adiciona um estilo básico para a imagem de perfil (pode ser movido para o CSS)
        const profileImg = profileOutput.querySelector('.profile-img');
        if (profileImg) {
            profileImg.style.width = '100px';
            profileImg.style.height = '100px';
            profileImg.style.borderRadius = '50%'; // Para deixá-la redonda
            profileImg.style.objectFit = 'cover'; // Para preencher a área sem distorcer
            profileImg.style.marginBottom = '10px';
        }
    };

    if (foto) {
        reader.readAsDataURL(foto); // Lê o conteúdo do arquivo como URL de dados
    }

    // Salva o nome no LocalStorage para persistência
    localStorage.setItem('nomeUsuario', nome); // Use uma chave mais específica
}

// Lógica do Jogo de Perguntas
const questions = [
    {
        question: "Qual é o maior estado do Brasil em área?",
        options: ["São Paulo", "Amazonas", "Bahia", "Mato Grosso"],
        correct: 1 // Índice da opção correta (Amazonas)
    },
    {
        question: "Qual cultura agrícola é a base da produção de etanol no Brasil?",
        options: ["Soja", "Milho", "Cana-de-açúcar", "Café"],
        correct: 2 // Índice da opção correta (Cana-de-açúcar)
    },
    {
        question: "Qual é o nome do bioma brasileiro conhecido por sua grande biodiversidade e chuvas regulares, abrigando a maior floresta tropical do mundo?",
        options: ["Cerrado", "Caatinga", "Pantanal", "Amazônia"],
        correct: 3 // Índice da opção correta (Amazônia)
    },
    {
        question: "Qual a principal atividade econômica do campo que fornece matéria-prima para a indústria têxtil?",
        options: ["Pecuária", "Cafeicultura", "Cotonicultura", "Apicultura"],
        correct: 2 // Índice da opção correta (Cotonicultura)
    }
    // Adicione mais perguntas aqui!
];

let score = 0;
let currentQuestionIndex = 0;

function loadQuestion() {
    // Garante que o jogo não tente carregar perguntas se não houver mais
    if (currentQuestionIndex >= questions.length) {
        endGame();
        return;
    }

    const question = questions[currentQuestionIndex];
    const questionText = document.getElementById('question');
    const optionsContainer = document.getElementById('options-container');
    const scoreDisplay = document.getElementById('score');
    
    questionText.textContent = question.question;
    optionsContainer.innerHTML = ''; // Limpa as opções anteriores

    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-button'); // Adiciona uma classe para estilização (opcional)
        button.onclick = () => checkAnswer(index);
        optionsContainer.appendChild(button);
    });

    scoreDisplay.textContent = `Pontos: ${score}`;
}

function checkAnswer(selectedIndex) {
    const correctIndex = questions[currentQuestionIndex].correct;
    
    if (selectedIndex === correctIndex) {
        score += 10;
    } else {
        score -= 5;
    }

    currentQuestionIndex++; // Avança para a próxima pergunta

    if (currentQuestionIndex < questions.length) {
        loadQuestion(); // Carrega a próxima pergunta
    } else {
        endGame(); // Todas as perguntas foram respondidas
    }
}

function endGame() {
    const gameSection = document.getElementById('game');
    gameSection.innerHTML = `
        <h2>Fim do Jogo!</h2>
        <p>Você fez **${score}** pontos!</p>
        <p>Obrigado por participar!</p>
        <button onclick="restartGame()">Jogar Novamente</button>
        <button onclick="showSection('home')">Voltar ao Início</button>
    `;
    // Opcional: Salvar a pontuação final no localStorage
    // localStorage.setItem('pontuacaoFinal', score);
}

function restartGame() {
    score = 0;
    currentQuestionIndex = 0;
    document.getElementById('game').innerHTML = `
        <h2>Responda as Perguntas e Ganhe Pontos!</h2>
        <div id="question-container">
            <p id="question">Carregando...</p>
            <div id="options-container">
                </div>
        </div>
        <p id="score">Pontos: 0</p>
    `;
    loadQuestion(); // Inicia o jogo novamente
}

// Inicialização: Exibe a seção 'home' quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
    showSection('home');
    // Opcional: Carregar o nome do usuário se já estiver salvo
    const savedName = localStorage.getItem('nomeUsuario');
    if (savedName) {
        document.getElementById('nome').value = savedName;
        // Se quiser exibir o perfil salvo automaticamente, chame saveProfile ou uma função similar
        // Note: A foto não é persistida facilmente no localStorage.
    }
});
