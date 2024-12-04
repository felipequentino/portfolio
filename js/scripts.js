// Função para arrastar as janelas
const draggableWindows = document.querySelectorAll(".window");

draggableWindows.forEach((win) => {
  const header = win.querySelector(".window-header");

  let offsetX = 0;
  let offsetY = 0;
  let isDragging = false;

  header.addEventListener("mousedown", (e) => {
    isDragging = true;
    // Calcular a posição relativa do mouse dentro da janela
    offsetX = e.clientX - win.getBoundingClientRect().left;
    offsetY = e.clientY - win.getBoundingClientRect().top;

    // Colocar a janela no topo
    win.style.zIndex = getHighestZIndex() + 1;

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });

  const onMouseMove = (e) => {
    if (!isDragging) return;
    let newLeft = e.clientX - offsetX;
    let newTop = e.clientY - offsetY;

    // Garantir que a janela não saia da viewport
    newLeft = Math.max(0, Math.min(newLeft, window.innerWidth - win.offsetWidth));
    newTop = Math.max(0, Math.min(newTop, window.innerHeight - win.offsetHeight - 40)); // 40px para a taskbar

    win.style.left = `${newLeft}px`;
    win.style.top = `${newTop}px`;
  };

  const onMouseUp = () => {
    isDragging = false;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };
});

// Função para abrir uma janela específica
function openWindow(windowId) {
  const windowElement = document.getElementById(windowId);
  if (windowElement) {
    windowElement.style.display = "flex"; // Exibe a janela
    windowElement.style.zIndex = getHighestZIndex() + 1; // Coloca a janela no topo
  }
}

// Função para fechar uma janela específica
function closeWindow(windowId) {
  const windowElement = document.getElementById(windowId);
  if (windowElement) {
    windowElement.style.display = "none"; // Oculta a janela
  }
}

// Função para minimizar uma janela específica
function minimizeWindow(windowId) {
  const windowElement = document.getElementById(windowId);
  if (windowElement) {
    windowElement.style.display = "none"; // Oculta a janela
    // Opcional: Adicionar o atalho da janela na barra de tarefas
  }
}

// Função para maximizar/restaurar uma janela específica
function maximizeWindow(windowId) {
  const windowElement = document.getElementById(windowId);
  if (windowElement) {
    if (windowElement.classList.contains('maximized')) {
      windowElement.classList.remove('maximized'); // Restaura o tamanho original
    } else {
      windowElement.classList.add('maximized'); // Maximiza a janela
      windowElement.style.zIndex = getHighestZIndex() + 1; // Coloca a janela no topo
    }
  }
}

// Função auxiliar para calcular o maior z-index atual
function getHighestZIndex() {
  const elements = document.querySelectorAll(".window, .start-menu");
  let highest = 0;
  elements.forEach((el) => {
    const zIndex = parseInt(window.getComputedStyle(el).zIndex, 10);
    if (zIndex > highest) highest = zIndex;
  });
  return highest;
}

// Alternar o menu Start
function toggleStartMenu() {
  const startMenu = document.getElementById("start-menu");
  const isHidden = (startMenu.style.display === "none" || !startMenu.style.display);
  startMenu.style.display = isHidden ? "flex" : "none"; // Alterna entre 'flex' e 'none'
  
  // Ajustar z-index
  if (!isHidden) {
    startMenu.style.zIndex = getHighestZIndex() + 1;
  }
}

// Fechar o menu Start ao clicar fora
document.addEventListener('click', function(event) {
  const startMenu = document.getElementById('start-menu');
  const startButton = document.querySelector('.start-button');
  if (!startMenu.contains(event.target) && !startButton.contains(event.target)) {
    startMenu.style.display = 'none';
  }
});

// Função para abrir a Lixeira
function openTrash() {
  openWindow('recycle-bin-window');
}

// Função para filtrar projetos no Gerenciador de Arquivos
function filterProjects(category) {
  const projects = document.querySelectorAll('.project-item');
  projects.forEach(project => {
    if (category === 'all' || project.dataset.category === category) {
      project.style.display = 'block';
    } else {
      project.style.display = 'none';
    }
  });
}

// Função para abrir detalhes do projeto
function openProjectDetails(projectName) {
    // Atualiza a janela de detalhes com informações do projeto
    const detailsWindow = document.getElementById('project-details-window');
    const nameElement = detailsWindow.querySelector('#project-name');
    const descriptionElement = detailsWindow.querySelector('#project-description');
    const linkElement = detailsWindow.querySelector('#project-link');
    const stackList = detailsWindow.querySelector('#stack-list');

    // Limpar a lista de stack anterior
    stackList.innerHTML = '';

    // Exemplo de dados - idealmente, você teria um objeto com detalhes dos projetos
    const projects = {
        'Brasilico': {
            description: 'Um site com informações em tempo real do Brasil, através de Predições de Séries Temporais.',
            stack: ['Vue.js', 'Node.js', 'Express.js', 'MongoDB', 'Python', 'Pandas', 'Scikit-learn', 'Facebook Prophet', 'Docker', 'Heroku'],
            link: 'https://seuprojeto.com'
        },
        'Projeto App Mobile': {
            description: 'Aplicativo mobile desenvolvido com React Native.',
            stack: ['React Native', 'Redux', 'Node.js', 'Express.js', 'MongoDB', 'Firebase'],
            link: 'https://seuprojeto.com/mobile'
        },
        'Projeto Design Gráfico': {
            description: 'Design gráfico para branding e materiais promocionais.',
            stack: ['Adobe Photoshop', 'Adobe Illustrator', 'Canva'],
            link: '#'
        }
    };

    const project = projects[projectName];
    if (project) {
        nameElement.innerText = projectName;
        descriptionElement.innerText = project.description;
        linkElement.href = project.link;
        linkElement.innerText = project.link !== '#' ? 'Ver Projeto' : 'Em Breve';

        // Adicionar as tecnologias à lista de stack
        project.stack.forEach(tech => {
            const li = document.createElement('li');
            li.innerText = tech;
            stackList.appendChild(li);
        });
    } else {
        nameElement.innerText = 'Projeto Desconhecido';
        descriptionElement.innerText = 'Detalhes não disponíveis.';
        linkElement.href = '#';
        linkElement.innerText = 'Fechar';
    }

    openWindow('project-details-window');
}

// Adicionar eventos de clique nos projetos após o DOM carregar
document.addEventListener('DOMContentLoaded', () => {
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(item => {
        item.addEventListener('dblclick', () => {
            const projectName = item.querySelector('span').innerText;
            openProjectDetails(projectName);
        });
    });
});

// Tornar as janelas focadas ao clicar
const allWindows = document.querySelectorAll('.window');
allWindows.forEach(win => {
  win.addEventListener('mousedown', () => {
    win.style.zIndex = getHighestZIndex() + 1;
  });
});
