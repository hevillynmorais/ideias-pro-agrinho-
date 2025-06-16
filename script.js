// src/components/Header.jsx
function Header({ showSection }) {
  return (
    <header>
      <div className="logo">
        <h1>Conexão Cidade e Campo</h1>
      </div>
      <nav>
        <ul>
          <li><a href="#" onClick={() => showSection('home')}>Início</a></li>
          <li><a href="#" onClick={() => showSection('profile')}>Perfil</a></li>
          <li><a href="#" onClick={() => showSection('stories')}>Histórias</a></li>
          <li><a href="#" onClick={() => showSection('game')}>Jogo</a></li>
        </ul>
      </nav>
    </header>
  );
}

// src/components/Footer.jsx
function Footer() {
  return (
    <footer>
      <p>&copy; 2025 Conexão Cidade e Campo - Todos os direitos reservados.</p>
    </footer>
  );
}

// src/components/HomeSection.jsx
function HomeSection({ showSection }) {
  return (
    <section className="intro">
      <div className="intro-content">
        <h2 className="animated-heading">Conexão Cidade e Campo</h2>
        <p className="intro-tagline">Celebrando a união que impulsiona o futuro.</p>
        <p className="intro-description">
          Explore como a **energia vibrante da cidade** se entrelaça com a **riqueza e a tranquilidade do campo**. Descubra as histórias, os processos e a inovação que fazem esses mundos se conectarem e prosperarem juntos.
        </p>

        <div className="connection-visual">
          <div className="city-side animated-element">
            <span className="visual-icon">&#127961;</span>
            <h3>O Urbano</h3>
            <p>Tecnologia, consumo e cultura em constante evolução.</p>
          </div>
          <div className="connecting-line animated-element"></div>
          <div className="field-side animated-element">
            <span className="visual-icon">&#127807;</span>
            <h3>O Rural</h3>
            <p>Natureza, produção de alimentos e tradições que nutrem.</p>
          </div>
        </div>

        <div className="intro-features">
          <div className="feature-item animated-element">
            <span className="icon">&#128176;</span>
            <h3>Economia Circular</h3>
            <p>Entenda o fluxo de recursos e produtos entre os dois mundos.</p>
          </div>
          <div className="feature-item animated-element">
            <span className="icon">&#128214;</span>
            <h3>Conhecimento Compartilhado</h3>
            <p>Aprenda com a sabedoria do campo e a inovação da cidade.</p>
          </div>
          <div className="feature-item animated-element">
            <span className="icon">&#127793;</span>
            <h3>Sustentabilidade</h3>
            <p>Descubra práticas que equilibram desenvolvimento e preservação.</p>
          </div>
        </div>

        <button onClick={() => showSection('profile')} className="start-journey-button animated-element">
          Começar a Jornada!
        </button>
      </div>
    </section>
  );
}

// src/components/ProfileSection.jsx
import React, { useState, useEffect } from 'react';

function ProfileSection({ showSection }) {
  const [nome, setNome] = useState('');
  const [foto, setFoto] = useState(null); // Armazena a foto como Base64 string
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [profileOutputHtml, setProfileOutputHtml] = useState('');

  useEffect(() => {
    const savedNome = localStorage.getItem('nomeUsuario');
    const savedPhoto = localStorage.getItem('fotoPerfilBase64');
    const savedEmail = localStorage.getItem('emailUsuario');
    const savedLocation = localStorage.getItem('locationUsuario');
    const savedBio = localStorage.getItem('bioUsuario');

    if (savedNome) setNome(savedNome);
    if (savedPhoto) setFoto(savedPhoto);
    if (savedEmail) setEmail(savedEmail);
    if (savedLocation) setLocation(savedLocation);
    if (savedBio) setBio(savedBio);

    if (savedNome || savedPhoto || savedEmail || savedLocation || savedBio) {
      updateProfileDisplay(savedNome, savedPhoto, savedEmail, savedLocation, savedBio);
    }
  }, []);

  const updateProfileDisplay = (currentNome, currentFoto, currentEmail, currentLocation, currentBio) => {
    let outputHtml = `<h3>Perfil Salvo:</h3>`;
    if (currentFoto) {
      outputHtml += `<img src="${currentFoto}" alt="Foto de perfil" class="profile-img">`;
    }
    outputHtml += `<p>Nome: <strong>${currentNome || 'Não informado'}</strong></p>`;
    if (currentEmail) outputHtml += `<p>Email: <strong>${currentEmail}</strong></p>`;
    if (currentLocation) outputHtml += `<p>Localização: <strong>${currentLocation}</strong></p>`;
    if (currentBio) outputHtml += `<p>Biografia: <strong>${currentBio}</strong></p>`;
    outputHtml += `<p>Selecione uma nova foto para atualizar.</p>`;
    setProfileOutputHtml(outputHtml);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFoto(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveProfile = (e) => {
    e.preventDefault();

    if (!nome) {
      alert('Por favor, preencha seu nome.');
      return;
    }
    if (!foto) {
      alert('Por favor, selecione uma foto de perfil.');
      return;
    }
    if (!privacyAgreed) {
      alert('Você deve concordar com os Termos de Privacidade para salvar seu perfil.');
      return;
    }

    localStorage.setItem('nomeUsuario', nome);
    localStorage.setItem('fotoPerfilBase64', foto);
    localStorage.setItem('emailUsuario', email);
    localStorage.setItem('locationUsuario', location);
    localStorage.setItem('bioUsuario', bio);

    updateProfileDisplay(nome, foto, email, location, bio);
    alert('Perfil salvo com sucesso!');
  };

  return (
    <section className="profile">
      <h2>Atualize seu Perfil</h2>
      <form onSubmit={saveProfile}>
        <div className="input-field">
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div className="input-field">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-field">
          <label htmlFor="location">Localização:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="input-field">
          <label htmlFor="bio">Biografia:</label>
          <textarea
            id="bio"
            name="bio"
            rows="4"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
        </div>
        <div className="input-field">
          <label htmlFor="foto">Foto de Perfil:</label>
          <input
            type="file"
            id="foto"
            name="foto"
            accept="image/*"
            onChange={handleFileChange}
            required={!foto}
          />
        </div>

        <div className="privacy-consent">
          <input
            type="checkbox"
            id="privacy-agree"
            checked={privacyAgreed}
            onChange={(e) => setPrivacyAgreed(e.target.checked)}
            required
          />
          <label htmlFor="privacy-agree">Eu concordo com os <a href="/public/privacy-policy.html" target="_blank">Termos de Privacidade</a>.</label>
        </div>

        <button type="submit">Salvar Perfil</button>
      </form>
      <div id="profile-output" dangerouslySetInnerHTML={{ __html: profileOutputHtml }}>
      </div>
      <button className="next-step-button" onClick={() => showSection('stories')}>Próximo: Descubra as Histórias</button>
    </section>
  );
}


// src/components/StoriesSection.jsx
import React, { useState } from 'react';

function StoriesSection({ showSection }) {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

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

  const changeStory = (direction) => {
    let newIndex = currentStoryIndex + direction;
    if (newIndex < 0) {
      newIndex = storiesData.length - 1;
    } else if (newIndex >= storiesData.length) {
      newIndex = 0;
    }
    setCurrentStoryIndex(newIndex);
  };

  return (
    <section className="stories">
      <h2>Histórias que Conectam</h2>
      <div className="story-carousel">
        {storiesData.map((story, index) => (
          <div
            key={index}
            className={`story-item ${index === currentStoryIndex ? 'active' : ''}`}
          >
            <h3>{story.title}</h3>
            <img src={story.image} alt={story.title} />
            <p>{story.description}</p>
          </div>
        ))}
      </div>
      <div className="carousel-nav">
        <button className="nav-button prev" onClick={() => changeStory(-1)}>&#10094;</button>
        <button className="nav-button next" onClick={() => changeStory(1)}>&#10095;</button>
      </div>
      <button className="next-step-button" onClick={() => showSection('game')}>Pronto para o Jogo?</button>
    </section>
  );
}

// src/components/GameSection.jsx
import React, { useState, useEffect } from 'react';

const questions = [
  {
    question: "Qual é o maior estado do Brasil em área?",
    options: ["São Paulo", "Amazonas", "Bahia", "Mato Grosso"],
    correct: 1
  },
  {
    question: "Qual cultura agrícola é a base da produção de etanol no Brasil?",
    options: ["Soja", "Milho", "Cana-de-açúcar", "Café"],
    correct: 2
  },
  {
    question: "Qual é o nome do bioma brasileiro conhecido por sua grande biodiversidade e chuvas regulares, abrigando a maior floresta tropical do mundo?",
    options: ["Cerrado", "Caatinga", "Pantanal", "Amazônia"],
    correct: 3
  },
  {
    question: "Qual a principal atividade econômica do campo que fornece matéria-prima para a indústria têxtil?",
    options: ["Pecuária", "Cafeicultura", "Cotonicultura", "Apicultura"],
    correct: 2
  },
  {
    question: "Pense na conexão: Qual transporte é fundamental para levar produtos agrícolas do campo para as grandes cidades e centros de distribuição?",
    options: ["Avião", "Trem", "Caminhão", "Navio"],
    correct: 2
  },
  {
    question: "A energia que ilumina as cidades e impulsiona indústrias muitas vezes vem de fontes rurais. Qual a principal fonte de energia renovável no Brasil, frequentemente gerada em grandes represas no campo?",
    options: ["Energia Solar", "Energia Eólica", "Energia Hidrelétrica", "Biomassa"],
    correct: 2
  },
  {
    question: "Na cidade, o descarte adequado é essencial. Qual é a prática rural que, ao invés de descartar, transforma resíduos orgânicos da agropecuária em fertilizante natural para o solo?",
    options: ["Aterro sanitário", "Compostagem", "Incineração", "Reciclagem de plásticos"],
    correct: 1
  },
  {
    question: "Muitos jovens do campo se mudam para a cidade em busca de oportunidades. Qual é o termo para esse movimento populacional do campo para a cidade?",
    options: ["Êxodo Urbano", "Migração Sazonal", "Êxodo Rural", "Migração Pendular"],
    correct: 2
  },
  {
    question: "Para que o campo possa se modernizar e produzir mais eficientemente, qual tipo de tecnologia desenvolvida em centros urbanos é crucial para otimizar plantio, colheita e gestão de rebanhos?",
    options: ["Engenharia Civil", "Inteligência Artificial e Drones", "Design Gráfico", "Produção de Moda"],
    correct: 1
  }
];

function GameSection({ showSection }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);

  useEffect(() => {
    // Para reiniciar o jogo quando a seção é carregada
    restartGame();
  }, []); // Dependência vazia para rodar apenas uma vez na montagem

  const checkAnswer = (selectedIndex) => {
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedIndex === currentQuestion.correct) {
      setScore(prevScore => prevScore + 10);
      alert('Correto!');
    } else {
      alert('Errado! A resposta correta era: ' + currentQuestion.options[currentQuestion.correct]);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      setGameEnded(true);
      // Opcional: salvar a pontuação final no localStorage
      localStorage.setItem('pontuacaoFinal', score);
    }
  };

  const restartGame = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setGameEnded(false);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <section className="game">
      <h2>Responda as Perguntas e Ganhe Pontos!</h2>
      {!gameEnded ? (
        <div id="question-container">
          <p id="question">{currentQuestion.question}</p>
          <div id="options-container">
            {currentQuestion.options.map((option, index) => (
              <button key={index} onClick={() => checkAnswer(index)}>
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h2>Fim do Jogo!</h2>
          <p>Você fez **{score}** pontos!</p>
          <p>Obrigado por participar!</p>
          <button onClick={restartGame}>Jogar Novamente</button>
          <button onClick={() => showSection('home')}>Voltar ao Início</button>
        </div>
      )}
      <p id="score">Pontos: {score}</p>
    </section>
  );
}


// src/App.jsx
import React, { useState, useEffect } from 'react';
// import Header from './components/Header'; // Não precisa importar, já que estão no mesmo arquivo agora
// import Footer from './components/Footer';
// import HomeSection from './components/HomeSection';
// import ProfileSection from './components/ProfileSection';
// import StoriesSection from './components/StoriesSection';
// import GameSection from './components/GameSection';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [transitioning, setTransitioning] = useState(false);
  // const [nextSection, setNextSection] = useState(''); // Não usado, pode ser removido

  const showSection = (sectionId) => {
    if (activeSection === sectionId || transitioning) return;

    setTransitioning(true);
    const currentSectionElement = document.getElementById(activeSection);
    if (currentSectionElement) {
      currentSectionElement.classList.add('section-exit');
    }

    setTimeout(() => {
      setActiveSection(sectionId);
      // setNextSection(sectionId); // Não usado, pode ser removido
      const prevSectionElement = document.getElementById(activeSection);
      if (prevSectionElement) {
        prevSectionElement.classList.remove('section-exit');
      }
      setTransitioning(false);
    }, 500);
  };

  useEffect(() => {
    const currentSectionElement = document.getElementById(activeSection);
    if (currentSectionElement) {
      currentSectionElement.classList.remove('section-exit');
      currentSectionElement.classList.add('section-enter');
      const animationEndHandler = () => {
        currentSectionElement.classList.remove('section-enter');
        currentSectionElement.removeEventListener('animationend', animationEndHandler);
      };
      currentSectionElement.addEventListener('animationend', animationEndHandler);
    }
  }, [activeSection]);


  return (
    <>
      <Header showSection={showSection} />
      <main>
        <div id="home" className={`section ${activeSection === 'home' ? 'active' : ''}`} style={{ display: activeSection === 'home' ? 'block' : 'none' }}>
            <HomeSection showSection={showSection} />
        </div>
        <div id="profile" className={`section ${activeSection === 'profile' ? 'active' : ''}`} style={{ display: activeSection === 'profile' ? 'block' : 'none' }}>
            <ProfileSection showSection={showSection} />
        </div>
        <div id="stories" className={`section ${activeSection === 'stories' ? 'active' : ''}`} style={{ display: activeSection === 'stories' ? 'block' : 'none' }}>
            <StoriesSection showSection={showSection} />
        </div>
        <div id="game" className={`section ${activeSection === 'game' ? 'active' : ''}`} style={{ display: activeSection === 'game' ? 'block' : 'none' }}>
            <GameSection showSection={showSection} />
        </div>
      </main>
      <Footer />
    </>
  );
}

// src/main.jsx
// O conteúdo de main.jsx precisaria ser adaptado para injetar o App diretamente no DOM
// sem o uso de ReactDOM.createRoot, se você for usar um script simples no HTML.
// Exemplo (apenas ilustrativo, não é a mesma funcionalidade do React original):
/*
document.addEventListener('DOMContentLoaded', () => {
    // Aqui você teria que "montar" o App manualmente no DOM, o que é complexo sem o React
    // ou reescrever tudo para JS puro.
    // Este arquivo final não é o que o Vite gera na pasta dist.
});
*/

// Exporta o componente principal App para ser usado em um ambiente React (como o main.jsx original)
// Se você fosse usar este código como um único script, precisaria remover as exportações
// e chamadas de React específicas para que funcione como JS "puro".
// Mantendo as exportações para clareza sobre de onde veio cada parte.
export default App; // Exemplo de exportação do App.jsx
