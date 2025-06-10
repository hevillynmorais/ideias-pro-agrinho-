document.addEventListener('DOMContentLoaded', () => {
    // --- Funções de Navegação de Seções ---
    const sections = document.querySelectorAll('.section');
    const allSections = document.querySelectorAll('.section'); // Get all sections for display logic

    window.showSection = (sectionId) => {
        allSections.forEach(section => {
            section.classList.remove('active');
            section.style.display = 'none'; // Ensure all are hidden first
        });
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            targetSection.style.display = 'block'; // Show the active section
        }
    };

    // Exibe a seção 'home' por padrão ao carregar
    showSection('home');

    // --- Lógica da Seção de Perfil ---
    const profileForm = document.getElementById('profile-form');
    const profileOutput = document.getElementById('profile-output');
    const inputNome = document.getElementById('nome');
    const inputEmail = document.getElementById('email');
    const inputLocation = document.getElementById('location');
    const inputBio = document.getElementById('bio');
    const inputFoto = document.getElementById('foto');
    const privacyAgreeCheckbox = document.getElementById('privacy-agree');

    let currentFotoBase64 = null; // Para armazenar a imagem em Base64

    // Função para atualizar a exibição do perfil
    const updateProfileDisplay = (nome, fotoBase64, email, location, bio) => {
        let outputHtml = `<h3>Perfil Salvo:</h3>`;
        if (fotoBase64) {
            outputHtml += `<img src="${fotoBase64}" alt="Foto de perfil" class="profile-img">`;
        }
        outputHtml += `<p>Nome: <strong>${nome || 'Não informado'}</strong></p>`;
        if (email) outputHtml += `<p>Email: <strong>${email}</strong></p>`;
        if (location) outputHtml += `<p>Localização: <strong>${location}</strong></p>`;
        if (bio) outputHtml += `<p>Biografia: <strong>${bio}</strong></p>`;
        outputHtml += `<p>Selecione uma nova foto para atualizar.</p>`;
        profileOutput.innerHTML = outputHtml;
    };

    // Carregar perfil salvo ao carregar a página
    const loadProfile = () => {
        const savedNome = localStorage.getItem('nomeUsuario');
        const savedPhoto = localStorage.getItem('fotoPerfilBase64');
        const savedEmail = localStorage.getItem('emailUsuario');
        const savedLocation = localStorage.getItem('locationUsuario');
        const savedBio = localStorage.getItem('bioUsuario');

        if (savedNome) inputNome.value = savedNome;
        if (savedPhoto) currentFotoBase64 = savedPhoto;
        if (savedEmail) inputEmail.value = savedEmail;
        if (savedLocation) inputLocation.value = savedLocation;
        if (savedBio) inputBio.value = savedBio;

        if (savedNome || savedPhoto || savedEmail || savedLocation || savedBio) {
            updateProfileDisplay(savedNome, savedPhoto, savedEmail, savedLocation, savedBio);
        }
    };
    loadProfile(); // Chama ao carregar a página

    // Lidar com a seleção de arquivo para a foto
    inputFoto.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                currentFotoBase64 = event.target.result; // Armazena a imagem como Base64
            };
            reader.readAsDataURL(file);
        }
    });

    // Lidar com o envio do formulário de perfil
    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!inputNome.value) {
            alert('Por favor, preencha seu nome.');
            return;
        }
        if (!currentFotoBase64) {
            alert('Por favor, selecione uma foto de perfil.');
            return;
        }
        if (!privacyAgreeCheckbox.checked) {
            alert('Você deve concordar com os Termos de Privacidade para salvar seu perfil.');
            return;
        }

        // Salvar no LocalStorage
        localStorage.setItem('nomeUsuario', inputNome.value);
        localStorage.setItem('fotoPerfilBase64', currentFotoBase64);
        localStorage.setItem('emailUsuario', inputEmail.value);
        localStorage.setItem('locationUsuario', inputLocation.value);
        localStorage.setItem('bioUsuario', inputBio.value);

        updateProfileDisplay(inputNome.value, currentFotoBase64, inputEmail.value, inputLocation.value, inputBio.value);
        alert('Perfil salvo com sucesso!');
    });

    // --- Lógica da Seção de Histórias (Carrossel) ---
    const storiesData = [
        {
            title: "A Colheita que Alimenta a Cidade",
            image: "https://via.placeholder.com/600x300/607d8b/ffffff?text=Campo+e+Alimento",
            description: "Do campo, o trigo é colhido, transformado em farinha e chega às padarias da cidade, virando o pão quentinho da manhã. Uma verdadeira corrente de produção e sabor!"
        },
        {
            title: "A Inovação Urbana que Chega à Roça",
            image: "https://via.placeholder.com/600x300/4CAF50/ffffff?text=Tecnologia+no+Campo",
            description: "Drones, softwares de gestão e sementes geneticamente aprimoradas. Muitas das inovações desenvolvidas em centros urbanos transformam a vida e a produtividade dos agricultores no campo."
        },
        {
            title: "O Artesanato Local Ganhando o Mundo",
            image: "https://via.placeholder.com/600x300/8bc34a/ffffff?text=Artesanato+Rural",
            description: "Peças únicas feitas à mão no interior do país, com técnicas passadas de geração em geração, encontram no mercado urbano e nas plataformas digitais a vitrine para alcançar consumidores em todo o mundo. A tradição encontra a modernidade!"
        }
    ];

    let currentStoryIndex = 0;
    const storyCarousel = document.querySelector('.story-carousel');

    const renderStory = () => {
        const story = storiesData[currentStoryIndex];
        storyCarousel.innerHTML = `
            <div class="story-item active">
                <h3>${story.title}</h3>
                <img src="${story.image}" alt="${story.title}">
                <p>${story.description}</p>
            </div>
        `;
    };

    window.changeStory = (direction) => {
        currentStoryIndex += direction;
        if (currentStoryIndex < 0) {
            currentStoryIndex = storiesData.length - 1;
        } else if (currentStoryIndex >= storiesData.length) {
            currentStoryIndex = 0;
        }
        renderStory();
    };

    renderStory(); // Renderiza a primeira história ao carregar

    // --- Lógica da Seção de Jogo ---
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
        {
            question: "Pense na conexão: Qual transporte é fundamental para levar produtos agrícolas do campo para as grandes cidades e centros de distribuição?",
            options: ["Avião", "Trem", "Caminhão", "Navio"],
            correct: 2 // Caminhão
        },
        {
            question: "A energia que ilumina as cidades e impulsiona indústrias muitas vezes vem de fontes rurais. Qual a principal fonte de energia renovável no Brasil, frequentemente gerada em grandes represas no campo?",
            options: ["Energia Solar", "Energia Eólica", "Energia Hidrelétrica", "Biomassa"],
            correct: 2 // Energia Hidrelétrica
        },
        {
            question: "Na cidade, o descarte adequado é essencial. Qual é a prática rural que, ao invés de descartar, transforma resíduos orgânicos da agropecuária em fertilizante natural para o solo?",
            options: ["Aterro sanitário", "Compostagem", "Incineração", "Reciclagem de plásticos"],
            correct: 1 // Compostagem
        },
        {
            question: "Muitos jovens do campo se mudam para a cidade em busca de oportunidades. Qual é o termo para esse movimento populacional do campo para a cidade?",
            options: ["Êxodo Urbano", "Migração Sazonal", "Êxodo Rural", "Migração Pendular"],
            correct: 2 // Êxodo Rural
        },
        {
            question: "Para que o campo possa se modernizar e produzir mais eficientemente, qual tipo de tecnologia desenvolvida em centros urbanos é crucial para otimizar plantio, colheita e gestão de rebanhos?",
            options: ["Engenharia Civil", "Inteligência Artificial e Drones", "Design Gráfico", "Produção de Moda"],
            correct: 1 // Inteligência Artificial e Drones
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    const questionElement = document.getElementById('question');
    const optionsContainer = document.getElementById('options-container');
    const scoreElement = document.getElementById('score');
    const gameSection = document.getElementById('game'); // Referência à seção do jogo

    const loadQuestion = () => {
        if (currentQuestionIndex < questions.length) {
            const currentQuestion = questions[currentQuestionIndex];
            questionElement.textContent = currentQuestion.question;
            optionsContainer.innerHTML = ''; // Limpa as opções anteriores

            currentQuestion.options.forEach((option, index) => {
                const button = document.createElement('button');
                button.textContent = option;
                button.onclick = () => checkAnswer(index);
                optionsContainer.appendChild(button);
            });
            scoreElement.textContent = `Pontos: ${score}`;
        } else {
            endGame();
        }
    };

    const checkAnswer = (selectedIndex) => {
        const currentQuestion = questions[currentQuestionIndex];
        if (selectedIndex === currentQuestion.correct) {
            score += 10;
            alert('Correto!');
        } else {
            alert('Errado! A resposta correta era: ' + currentQuestion.options[currentQuestion.correct]);
        }
        currentQuestionIndex++;
        loadQuestion();
    };

    const endGame = () => {
        gameSection.innerHTML = `
            <section class="game">
                <h2>Fim do Jogo!</h2>
                <p>Você fez **${score}** pontos!</p>
                <p>Obrigado por participar!</p>
                <button onclick="restartGame()">Jogar Novamente</button>
                <button onclick="showSection('home')">Voltar ao Início</button>
            </section>
        `;
    };

    window.restartGame = () => {
        currentQuestionIndex = 0;
        score = 0;
        // Restaurar o conteúdo original da seção do jogo
        gameSection.innerHTML = `
            <section class="game">
                <h2>Responda as Perguntas e Ganhe Pontos!</h2>
                <div id="question-container">
                    <p id="question"></p>
                    <div id="options-container">
                        </div>
                </div>
                <p id="score">Pontos: 0</p>
            </section>
        `;
        // Re-obter referências dos elementos que foram recriados
        questionElement = document.getElementById('question');
        optionsContainer = document.getElementById('options-container');
        scoreElement = document.getElementById('score');
        loadQuestion();
    };

    loadQuestion(); // Inicia o jogo ao carregar a página
});
