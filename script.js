// Global variables for the game
let currentQuestionIndex = 0;
let score = 0;

// Global variables for stories carousel
let currentStoryIndex = 0;
let storyItems; // Will be initialized when DOM is ready

// Lógica para navegação entre seções
function showSection(sectionId) {
    // Esconde todas as seções
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // Exibe a seção clicada
    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.style.display = 'block';
    }

    // Lógica específica para cada seção
    if (sectionId === 'game') {
        // Only load question if starting a new game or if coming back to game after restarting
        if (currentQuestionIndex === 0 && document.getElementById('question').textContent === 'Carregando...') {
            loadQuestion();
        } else if (currentQuestionIndex < questions.length) {
            // If the game was in progress, ensure the current question is shown
            loadQuestion();
        }
    } else if (sectionId === 'stories') {
        // Initialize story items and show the first one when entering stories section
        storyItems = document.querySelectorAll('.story-item');
        if (storyItems.length > 0) {
            currentStoryIndex = 0; // Always start from the first story
            showStory(currentStoryIndex);
        }
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
    };

    if (foto) {
        reader.readAsDataURL(foto); // Lê o conteúdo do arquivo como URL de dados
    }

    // Salva o nome no LocalStorage para persistência
    localStorage.setItem('nomeUsuario', nome);
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
    },
    // --- Novas Perguntas com Contexto de Cidade e Campo ---
    {
        question: "Pense na conexão: Qual transporte é fundamental para levar produtos agrícolas do campo para as grandes cidades e centros de distribuição?",
        story: "Do interior do país para a sua mesa, a logística é um desafio. Qual meio de transporte é o mais utilizado para essa tarefa crucial?",
        options: ["Avião", "Trem", "Caminhão", "Navio"],
        correct: 2 // Caminhão
    },
    {
        question: "A energia que ilumina as cidades e impulsiona indústrias muitas vezes vem de fontes rurais. Qual a principal fonte de energia renovável no Brasil, frequentemente gerada em grandes represas no campo?",
        story: "As luzes da cidade dependem de uma infraestrutura que se estende por todo o território. Qual o pilar da nossa matriz energética limpa?",
        options: ["Energia Solar", "Energia Eólica", "Energia Hidrelétrica", "Biomassa"],
        correct: 2 // Energia Hidrelétrica
    },
    {
        question: "Na cidade, o descarte adequado é essencial. Qual é a prática rural que, ao invés de descartar, transforma resíduos orgânicos da agropecuária em fertilizante natural para o solo?",
        story: "Ciclos sustentáveis são a chave para o futuro. No campo, o que fazemos com o que sobra para enriquecer a terra?",
        options: ["Aterro sanitário", "Compostagem", "Incineração", "Reciclagem de plásticos"],
        correct: 1 // Compostagem
    },
    {
        question: "Muitos jovens do campo se mudam para a cidade em busca de oportunidades. Qual é o termo para esse movimento populacional do campo para a cidade?",
        story: "É um fenômeno global que molda a demografia das nações. Como chamamos essa grande migração interna?",
        options: ["Êxodo Urbano", "Migração Sazonal", "Êxodo Rural", "Migração Pendular"],
        correct: 2 // Êxodo Rural
    },
    {
        question: "Para que o campo possa se modernizar e produzir mais eficientemente, qual tipo de tecnologia desenvolvida em centros urbanos é crucial para otimizar plantio, colheita e gestão de rebanhos?",
        story: "A tecnologia da informação e comunicação (TIC) tem revolucionado o agronegócio. Qual área tecnológica é vital para a 'Agricultura 4.0'?",
        options: ["Engenharia Civil", "Inteligência Artificial e Drones", "Design Gráfico", "Produção de Moda"],
        correct: 1 // Inteligência Artificial e Drones
    }
];

// Get references to game elements (updated to use 'let' as they might be reassigned)
let questionElement = document.getElementById('question');
let optionsContainer = document.getElementById('options-container');
let scoreElement = document.getElementById('score');

function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        endGame();
        return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    optionsContainer.innerHTML = ''; // Clear previous options

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-button');
        button.onclick = () => checkAnswer(index);
        optionsContainer.appendChild(button);
    });

    scoreElement.textContent = `Pontos: ${score}`;
}

function checkAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedIndex === currentQuestion.correct) {
        score += 10; // Add points for correct answer
        alert('Correto!');
    } else {
        alert('Errado! A resposta correta era: ' + currentQuestion.options[currentQuestion.correct]);
    }

    currentQuestionIndex++; // Advance to the next question

    if (currentQuestionIndex < questions.length) {
        loadQuestion(); // Load the next question
    } else {
        endGame(); // All questions have been answered
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
    localStorage.setItem('pontuacaoFinal', score);
}

function restartGame() {
    currentQuestionIndex = 0;
    score = 0;
    const gameSection = document.getElementById('game');
    gameSection.innerHTML = `
        <h2>Responda as Perguntas e Ganhe Pontos!</h2>
        <div id="question-container">
            <p id="question">Carregando...</p>
            <div id="options-container"></div>
        </div>
        <p id="score">Pontos: 0</p>
    `;
    // Re-assign the elements after recreating the HTML to ensure correct references
    questionElement = document.getElementById('question');
    optionsContainer = document.getElementById('options-container');
    scoreElement = document.getElementById('score');

    loadQuestion(); // Start the game again
}

// Lógica do Carrossel de Histórias
function showStory(index) {
    // Hide all stories
    storyItems.forEach((item, i) => {
        item.style.display = 'none';
        item.classList.remove('active');
        item.style.animation = 'none'; // Reset animation
    });

    // Show the active story
    if (storyItems[index]) {
        storyItems[index].style.display = 'block';
        storyItems[index].classList.add('active');
        storyItems[index].style.animation = 'slideIn 0.8s ease-out forwards'; // Apply animation
    }
}

function changeStory(direction) {
    currentStoryIndex += direction;

    if (currentStoryIndex < 0) {
        currentStoryIndex = storyItems.length - 1; // Loop to last story
    } else if (currentStoryIndex >= storyItems.length) {
        currentStoryIndex = 0; // Loop to first story
    }
    showStory(currentStoryIndex);
}


// Inicialização: Exibe a seção 'home' quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
    showSection('home');

    // Opcional: Carregar o nome do usuário se já estiver salvo
    const savedNome = localStorage.getItem('nomeUsuario');
    if (savedNome) {
        document.getElementById('nome').value = savedNome;
        const profileOutput = document.getElementById('profile-output');
        profileOutput.innerHTML = `
            <h3>Perfil Salvo:</h3>
            <p>Nome: <strong>${savedNome}</strong></p>
            <p>Selecione uma nova foto para atualizar.</p>
        `;
    }
});
