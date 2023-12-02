import './styles.css';
import 'slim-select/dist/slimselect.css'
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select'

import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";

const refs = {
    breedSelect: document.querySelector('.breed-select'),
    catInfo: document.querySelector('.cat-info'),
    loader: document.querySelector('.loader'),
}

function renderCatOption(cat) {
    return `<option value="${cat.id}">${cat.name}</option>`
}

function renderCatDetails(cat) {
    const breedDetails = cat.breeds[0]

    return `
        <div class="cat-image">
            <img src="${cat.url}" />
        </div>
        <div class="cat-details">
            <h1>${breedDetails.name}</h1>
            <p>${breedDetails.description}</p>
            <p><b>Temperament:</b> ${breedDetails.temperament}</p>
        </div>
    `
}

window.addEventListener('load', () => {
    fetchBreeds()
        .then((data) => {
            data.forEach((cat) => {
                refs.breedSelect.innerHTML = refs.breedSelect.innerHTML + renderCatOption(cat)
                refs.breedSelect.classList.remove('hidden')
                refs.loader.classList.add('hidden')
            });

            new SlimSelect({
                select: refs.breedSelect
            })        
        })
        .catch(() => {
            refs.loader.classList.add('hidden')
            Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
        })
})

refs.breedSelect.addEventListener('change', (event) => {
    const breedId = event.currentTarget.value;

    refs.loader.classList.remove('hidden')
    refs.catInfo.classList.add('hidden')

    fetchCatByBreed(breedId)
        .then((data) => {
            refs.catInfo.innerHTML = renderCatDetails(data[0])
            refs.loader.classList.add('hidden')
            refs.catInfo.classList.remove('hidden')
        })
        .catch(() => {
            refs.loader.classList.add('hidden')
            Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
        })
})
