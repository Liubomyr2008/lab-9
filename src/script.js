
const gallery = document.getElementById("gallery");

const loadMore = document.getElementById("loadMore");
const clearGallery = document.getElementById("clearGallery");
const removeLast = document.getElementById("removeLast");
const reverseGallery = document.getElementById("reverseGallery");
const shuffleGallery = document.getElementById("shuffleGallery");

let page = 1;
let loading = false;

async function loadPhotos() {
    if (loading) return;

    loading = true;
    loadMore.disabled = true;

    try {
        const response = await fetch(
            "https://picsum.photos/v2/list?page=" + page + "&limit=4"
        );

        if (!response.ok) {
            throw new Error("Помилка завантаження");
        }

        const photos = await response.json();

        if (photos.length === 0) {
            alert("Більше фотографій немає");
            return;
        }

        photos.forEach(function(photo) {
            const card = document.createElement("div");
            card.className = "photo";

            const image = document.createElement("img");
            image.src = "https://picsum.photos/id/" + photo.id + "/500/350";
            image.alt = "Фотографія";
            
            const author = document.createElement("p");
            author.textContent = "Автор: " + photo.author;

            card.appendChild(image);
            card.appendChild(author);

            gallery.appendChild(card);
        });

        page++;

    } catch (error) {
        alert("Не вдалося завантажити фотографії");
        console.error(error);
    } finally {
        loading = false;
        loadMore.disabled = false;
    }
}

loadMore.addEventListener("click", loadPhotos);

clearGallery.addEventListener("click", function() {
    gallery.innerHTML = "";
});

removeLast.addEventListener("click", function() {
    if (gallery.lastElementChild) {
        gallery.lastElementChild.remove();
    }
});

reverseGallery.addEventListener("click", function() {
    const photos = Array.from(gallery.children);

    photos.reverse();

    photos.forEach(function(photo) {
        gallery.appendChild(photo);
    });
});

shuffleGallery.addEventListener("click", function() {
    const photos = Array.from(gallery.children);

    for (let i = photos.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        const temp = photos[i];
        photos[i] = photos[j];
        photos[j] = temp;
    }

    photos.forEach(function(photo) {
        gallery.appendChild(photo);
    });
});

loadPhotos();
