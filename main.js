const armasImages = ['img/armas/1.png', 'img/armas/2.png', 'img/armas/3.png'];
const pessoasImages = ['img/pessoas/1.png', 'img/pessoas/2.png', 'img/pessoas/3.png'];
const crimesImages = ['img/crimes/1.png', 'img/crimes/2.png', 'img/crimes/3.png'];

let armasImageIndex = 0;
let pessoasImageIndex = 0;
let crimesImageIndex = 0;

function showImage(project, index) {
  const imgElement = document.getElementById(`${project}Image`);
  let selectedImages;

  switch (project) {
    case 'armas':
      selectedImages = armasImages;
      armasImageIndex = index;
      break;
    case 'pessoas':
      selectedImages = pessoasImages;
      pessoasImageIndex = index;
      break;
    case 'crimes':
      selectedImages = crimesImages;
      crimesImageIndex = index;
      break;
    default:
      selectedImages = [];
  }

  imgElement.src = selectedImages[index];
}

function changeImageIndex(project, direction) {
  let index;
  let imagesLength;

  switch (project) {
    case 'armas':
      index = armasImageIndex;
      imagesLength = armasImages.length;
      break;
    case 'pessoas':
      index = pessoasImageIndex;
      imagesLength = pessoasImages.length;
      break;
    case 'crimes':
      index = crimesImageIndex;
      imagesLength = crimesImages.length;
      break;
    default:
      index = 0;
      imagesLength = 0;
  }

  if (direction === 'previous') {
    index = (index - 1 + imagesLength) % imagesLength;
  } else {
    index = (index + 1) % imagesLength;
  }

  switch (project) {
    case 'armas':
      armasImageIndex = index;
      break;
    case 'pessoas':
      pessoasImageIndex = index;
      break;
    case 'crimes':
      crimesImageIndex = index;
      break;
    default:
      break;
  }

  showImage(project, index);
}
