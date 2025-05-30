// Lógica para navegação entre seções
function showSection(sectionId) {
    // Esconde todas as seções
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // Exibe a seção clicada
    document.getElementById(sectionId).style.display = 'block';
}

// Lógica para salvar o perfil
function saveProfile(event) {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const fotoInput = document.getElementById('foto');
    const foto = fotoInput.files[0];

    // Exibe nome e foto no perfil
    const profileOutput = document.getElementById('profile-output');
    const reader = new FileReader();
    
    reader.onload = function(e) {
        profileOutput.innerHTML = `
            <h3>Perfil Salvo:</h3>
            <img src="${e.target.result}" alt="Foto de perfil" width="100" height="100">
            <p>Nome: ${nome}</p>
        `;
    };

    if (foto) {
        reader.readAsDataURL(foto);
    }

    // Salva o nome no LocalStorage
    localStorage.setItem('nome', nome);
}

// Lógica do Jogo de Perguntas
const questions = [
    {
        question: "Qual é o maior estado do Brasil em área?",
        options: ["São Paulo", "Amazonas", "Bahia", "Mato Grosso"],
        correct: 1
    },
    {
        question: "Qual cidade é considerada a capital do agronegócio?",
        options: ["São Paulo", "Uberlândia", "Campinas", "Cuiabá"],
        correct: 1
    },
    // Adicione mais perguntas conforme necessário
];

let score = 0;
let currentQuestionIndex = 0;

function loadQuestion() {
    const question = questions[currentQuestionIndex];
    const questionText = document.getElementById('question');
    const optionsContainer = document.getElementById('options-container');
    
    questionText.textContent = question.question;
    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => checkAnswer(index);
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedIndex) {
    const correctIndex = questions[currentQuestionIndex].correct;
    if (selectedIndex === correctIndex) {
        score += 10;
    } else {
        score -= 5;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        alert(`Fim do jogo! Você fez
