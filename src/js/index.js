import "../scss/main.scss";

function buttonShow(btnNumb) {
    if (pageNumb === 1) {
        leftBtn.classList.add("hidden");
    } else if (pageNumb === 2 && btnNumb === 1) {
        leftBtn.classList.remove("hidden");
    }
    if (pageNumb === photos.length / 3) {
        rightBtn.classList.add("hidden");
    } else if (pageNumb === photos.length / 3 - 1 && btnNumb === 0) {
        rightBtn.classList.remove("hidden");
    }
}

function showPageNumber() {
    pageNumber.textContent = `${pageNumb}/${photos.length / 3}`;
}

const images = document.querySelectorAll(".gallery__collection__image");
//const galleryCollection = document.querySelector(".gallery__collection");
const leftBtn = document.querySelector(".gallery__btn--left");
const rightBtn = document.querySelector(".gallery__btn--right");

const btns = document.querySelectorAll(".gallery__btn");
const pageNumber = document.querySelector(".pageNumber");

const photos = [];
let pageNumb = 1;
const url = "https://picsum.photos/v2/list";

const request = new Request(url);

leftBtn.classList.add("hidden");

fetch(request)
.then(response => {
    if (response.status === 200) {
        return response.json();
    } else {
        throw new Error("Something went wrong on api server!");
    }
})
.then(response => {
    response.forEach( photo => {
        const correctPhoto = photo.url.replace("https://unsplash.com/photos/", "https://source.unsplash.com/")
        photos.push(correctPhoto);
    })
    /* photos.forEach( photo => {
        const newBox = document.createElement("div");
        newBox.classList.add("gallery__collection__image");
        newBox.style.backgroundImage = `url(${photo})`;
        galleryCollection.appendChild(newBox);
    }) */
    images.forEach( (image, i) => {
        image.style.backgroundImage = `url(${photos[i]})`;
    })
    showPageNumber();
}).catch(error => {
    console.error(error);
});

btns.forEach( (btn, i) => {
    btn.addEventListener("click", function() {
        if (i === 1 && pageNumb < photos.length / 3) {
            pageNumb++;
        } else if (i === 0 && pageNumb > 1) {
            pageNumb--;
        }
        buttonShow(i);
        showPageNumber();
        images.forEach( (image, i) => {
            image.style.backgroundImage = `url(${photos[i + 3 * (pageNumb - 1)]})`;
        })
    })
})
