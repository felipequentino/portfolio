const crimesImages = ['img/crimes/1.png', 'img/crimes/2.png', 'img/crimes/3.png'];
const kleitonImages = ['img/kleiton/1.png', 'img/kleiton/2.png', 'img/kleiton/3.png', 'img/kleiton/4.png'];
const annyImages = ['img/anny/1.png', 'img/anny/2.png', 'img/anny/3.png', 'img/anny/4.png', 'img/anny/5.png', 'img/anny/6.png'];
const botImages = ['img/bot/1.png', 'img/bot/2.png', 'img/bot/3.png', 'img/bot/4.png', 'img/bot/5.png', 'img/bot/6.png'];

let crimesImageIndex = 0;
let kleitonImageIndex = 0;
let annyImageIndex = 0;
let botImageIndex = 0;

function showImage(project, index) {
  const imgElement = document.getElementById(`${project}Image`);
  let selectedImages;
  
  switch (project) {
    case 'crimes':
      selectedImages = crimesImages;
      crimesImageIndex = index;
      break;
    case 'kleiton':
      selectedImages = kleitonImages;
      kleitonImageIndex = index;
      break;
    case 'anny':
      selectedImages = annyImages;
      annyImageIndex = index;
      break;
    case 'bot':
      selectedImages = botImages;
      botImageIndex = index;
      break;
    default:
      selectedImages = [];
  }

  imgElement.src = selectedImages[index];
}

function changeImageIndex(project, direction) {
  let index;
  switch (project) {
    case 'crimes':
      index = crimesImageIndex;
      break;
    case 'kleiton':
      index = kleitonImageIndex;
      break;
    case 'anny':
      index = annyImageIndex;
      break;
    case 'bot':
      index = botImageIndex;
      break;
    default:
      index = 0;
  }

  const imagesLength = project === 'crimes' ? crimesImages.length : project === 'kleiton' ? kleitonImages.length : project === 'anny' ? annyImages.length : botImages.length;

  if (direction === 'previous') {
    index = (index - 1 + imagesLength) % imagesLength;
  } else {
    index = (index + 1) % imagesLength;
  }

  switch (project) {
    case 'crimes':
      crimesImageIndex = index;
      break;
    case 'kleiton':
      kleitonImageIndex = index;
      break;
    case 'anny':
      annyImageIndex = index;
      break;
    case 'bot':
      botImageIndex = index;
      break;
    default:
      break;
  }

  showImage(project, index);
}

// Uso:
// Para exibir a próxima imagem de um projeto específico (crimes, kleiton, anny, bot)
// changeImageIndex('crimes', 'next'); // Exemplo para exibir a próxima imagem do projeto 'crimes'
// changeImageIndex('kleiton', 'previous'); // Exemplo para exibir a imagem anterior do projeto 'kleiton'
// changeImageIndex('anny', 'next'); // Exemplo para exibir a próxima imagem do projeto 'anny'
// changeImageIndex('bot', 'previous'); // Exemplo para exibir a imagem anterior do projeto 'bot'
