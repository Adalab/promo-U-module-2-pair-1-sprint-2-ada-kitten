'use strict';
//QUERYSELECTORS
const listElement = document.querySelector('.js-list');

const inputSearch = document.querySelector('.js_in_search_desc');

const btnSearch = document.querySelector('.js-btn-search');

let race = '';

const btnAdd = document.querySelector('.js-btn-add');

const inputDesc = document.querySelector('.js-input-desc');
const inputPhoto = document.querySelector('.js-input-photo');
const inputName = document.querySelector('.js-input-name');
const inputRace = document.querySelector('.js-input-race');
const labelMessageError = document.querySelector('.js-label-error');

const btnCancel = document.querySelector('.js-btn-cancel');
const newForm = document.querySelector('.js-new-form');
const plusCircle = document.querySelector('.js-plus-circle');

const msjError = document.querySelector('.js-msj');

//OBJETOS
/* function kittenData(objectKitten) {
  objectKitten.name;
  objectKitten.desc;
  objectKitten.race;
  objectKitten.url;
} */
const kittenData_1 = {
  name: 'Anastacio',
  desc: 'Porte elegante, su patrón de color tan característico y sus ojos de un azul intenso, pero su historia se remonta a Asía al menos hace 500 años, donde tuvo su origen muy posiblemente.',
  race: '',
  url: 'https://dev.adalab.es/gato-siames.webp',
};

const kittenData_2 = {
  name: 'Fiona',
  desc: 'Produce fascinación y curiosidad. Exótico, raro, bello, extraño… hasta con pinta de alienígena han llegado a definir a esta raza gatuna que se caracteriza por la «ausencia» de pelo.',
  race: 'Sphynx',
  url: 'https://dev.adalab.es/sphynx-gato.webp',
};
const kittenData_3 = {
  name: 'Cielo',
  desc: 'Tienen la cabeza cuadrada y los ojos simétricos, por lo que su bella mirada se ha convertido en una de sus señas de identidad. Sus ojos son grandes y las orejas resultan largas y en punta.',
  race: 'Maine Coon',
  url: 'https://dev.adalab.es/maine-coon-cat.webp',
};
// const kittenDataList = [kittenData_1, kittenData_2, kittenData_3];

const GITHUB_USER = 'ainhoadlhs';
const SERVER_URL = `https://dev.adalab.es/api/kittens/${GITHUB_USER}`;

let kittenDataList = [];

const kittenListStored = JSON.parse(localStorage.getItem('kittenDataList'));

// fetch(SERVER_URL)
//   .then((response) => response.json())
//   .then((dataApi) => {
//     kittenDataList = dataApi.results;
//     renderKittenList(kittenDataList);
//   });

if (kittenListStored === '') {
  renderKittenList(kittenDataList);
} else {
  fetch(SERVER_URL)
    .then((response) => response.json())
    .then((dataApi) => {
      kittenDataList = dataApi.results;
      renderKittenList(kittenDataList);
      localStorage.setItem('renderLocalKitten', JSON.stringify(kittenDataList));
    })
    .catch((error) => {
      console.error(error);
    });
}

//FUNCIONES

//Pintar gatitos

function renderRace(race) {
  if (race === '') {
    return `Uy que despiste, no sabemos su raza`;
  } else {
    return race;
  }
}
// function renderKitten(kittenData) {
//   const kitten = `<li class="card">
//   <article>
//     <img
//       class="card_img" 
//       src="${kittenData.image}"
//       alt="siames-cat"
//     />
//     <h3 class="card_title">${kittenData.name.toUpperCase()}</h3>
//     <h4 class="card_race">${renderRace(kittenData.race)}</h4>
//     <p class="card_description">
//       ${kittenData.desc}
//     </p>
//   </article>
//   </li>`;

//   return kitten;
// }

function renderKitten(kittenData) {
    const liElement = document.createElement('li');
    liElement.setAttribute('class', 'card')

    const articleElement = document.createElement('article');
    liElement.appendChild(articleElement);

    const imgElement = document.createElement('img');
    imgElement.createTextNode(kittenData.image);
    imgElement.setAttribute('class', 'card_img');
    imgElement.setAttribute('src', 'url.img');
    imgElement.setAttribute('alt', 'photo-cat');
    articleElement.appendChild(imgElement);

    const h3Element = document.createElement('h3');
    h3Element.createTextNode(kittenData.name);
    h3Element.setAttribute('class', 'card_title');
    articleElement.appendChild(h3Element);

    const h4Element = document.createElement('h4');
    h4Element.createTextNode(kittenData.race);
    h4Element.setAttribute('class', 'card_race');
    articleElement.appendChild(h4Element);

    const pElement = document.createElement('p');
    pElement.createTextNode(kittenData.desc);
    pElement.setAttribute('class', 'card_description');
    articleElement.appendChild(pElement);

    return liElement;
}



function renderKittenList(kittenDataList) {
  listElement.innerHTML = '';

  for (const kittenItem of kittenDataList) {
    listElement.appendChild (renderKitten(kittenItem));
  }
}

renderKittenList(kittenDataList);

//Añadir nuevos gatitos

function addNewKitten(event) {
  event.preventDefault();
  const valueDesc = inputDesc.value;
  const valuePhoto = inputPhoto.value;
  const valueName = inputName.value;

  if (valueDesc === '' || valuePhoto === '' || valueName === '') {
    labelMessageError.innerHTML = '¡Uy! parece que has olvidado algo';
    labelMessageError.classList.add('error-form');
  } else if (valueDesc !== '' || valuePhoto !== '' || valueName !== '')
    labelMessageError.innerHTML = 'Mola! Un nuevo gatito en Adalab!';
  labelMessageError.classList.add('error-form');
  const newKittenDataObject = {
    name: inputName.value,
    desc: inputDesc.value,
    race: inputRace.value,
    url: inputPhoto.value,
  };

  fetch(`https://dev.adalab.es/api/kittens/${GITHUB_USER}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newKittenDataObject),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        kittenDataList.push(newKittenDataObject);
        renderKittenList(kittenDataList);
      } else if (valueDesc === '' || valuePhoto === '' || valueName === '') {
        labelMessageError.innerHTML = '¡Uy! parece que has olvidado algo';
      }
      localStorage.setItem(
        'renderLocalKitten',
        JSON.stringify(newKittenDataObject)
      );
    });
}

function showNewCatForm() {
  newForm.classList.remove('collapsed');
}
function hideNewCatForm() {
  newForm.classList.add('collapsed');
}

function handleClickNewCatForm(event) {
  event.preventDefault();
  if (newForm.classList.contains('collapsed')) {
    showNewCatForm();
  } else {
    hideNewCatForm();
  }
}

//Buscar gatitos

const filterKitten = (event) => {
  event.preventDefault();
  deleteList();
  addKittens();
};

// function addKittens() {
//   let descrSearch = inputSearch.value;
//   if (descrSearch) {
//     msjError.innerHTML = '';
//     filter //HACERLO MAÑANA CON LA FUNCION kittenDataList
//     renderKittenList
//     // for (const kittenItem of kittenDataList) {
//     //   if (kittenItem.desc.includes(descrSearch)) {
//     //     listElement.innerHTML += renderKitten(kittenItem);
//     //   }
//     // }
//   } else {
//     msjError.innerHTML = 'Tienes que escribir algo en el buscador';
//   }
// }
function addKittens() {
  let descrSearch = inputSearch.value;
  if (descrSearch) {
    msjError.innerHTML = '';
    for (const kittenItem of kittenDataList) {
      if (kittenItem.desc.includes(descrSearch)) {
        listElement.innerHTML += renderKitten(kittenItem);
      }
    }
  } else {
    msjError.innerHTML = 'Tienes que escribir algo en el buscador';
  }
}

function deleteList() {
  listElement.innerHTML = '';
}

function cancelNewKitten(event) {
  event.preventDefault();
  inputDesc.value = '';
  inputName.value = '';
  inputPhoto.value = '';
  labelMessageError.innerHTML = '';
  hideNewCatForm();
}

//EVENTOS

btnAdd.addEventListener('click', addNewKitten);

btnCancel.addEventListener('click', cancelNewKitten);

plusCircle.addEventListener('click', handleClickNewCatForm);

btnSearch.addEventListener('click', filterKitten);

//const descrSearch = inputSearch.value;
