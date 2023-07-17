const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = 'wYWaXiDBtyC47GX3e7ECtbjjbAidSM0c-Ue6PWZR9g0';
// const key1 = 'hlCwgSQfJUze6-qbz8voTfnVLrgZtWyLEVN7t8q_mZQ';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded

const renderHTML = function (photo) {
	console.log(photo);
	let html = `
	<div class="card-body">
            <div class="body-author">
                <div class="author-photo"><img src="${photo.user.profile_image.small}"></div>
                <h3 class="author">${
									photo.user.instagram_username === null
										? photo.user.first_name + '_' + photo.user.last_name
										: photo.user.instagram_username
								}
					

				</h3>
                <button type="button">...</button>
            </div>
            <div class="body-image">
                <a id="item"><img id="img" src="${photo.urls.regular}"></a>
            </div>
            <div class="body-content">
                <div class="icons">
                    <i class="fa-regular fa-heart"></i>
                    <i class="fa-regular fa-comment"></i>
                    <i class="fa-regular fa-paper-plane"></i>
                    <i class="fa-regular fa-bookmark"></i>
                </div>
                <div class="likes">${photo.likes} likes</div>
                <div class="description">
                    <p><b>${photo.user.instagram_username}</b> ${photo.alt_description}</p>
                </div>
                <div class="comments">
                    <p>View all <span>X</span> comments</p>
                </div>
            </div>
        </div>`;

	imageContainer.insertAdjacentHTML('beforeend', html);
};

function imageLoaded() {
	imagesLoaded++;
	if (imagesLoaded === totalImages) {
		imagesLoaded = 0;
		ready = true;
	}
}

// Helper function to set attributes on DOM elements

function setAttributes(element, attributes) {
	for (const key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
}

// Create elements for links and photos

function displayPhotos() {
	totalImages = photosArray.length;
	// Run function for each object in photosArray
	photosArray.forEach(photo => {
		renderHTML(photo);

		const img = document.createElement('img');
		setAttributes(img, {
			src: photo.urls.regular,
			alt: photo.alt_description,
			title: photo.alt_description,
		});

		// Event listener check when each is finished loading

		img.addEventListener('load', imageLoaded);

		// put <img> inside <a> then put both inside imageContainer element

		// item.appendChild(img);
		// imageContainer.appendChild(item);
	});
}

// Get photos from Unsplash API

async function getPhotos() {
	try {
		const response = await fetch(apiUrl);
		photosArray = await response.json();
		displayPhotos();
	} catch (error) {
		// Catch error here
	}
}

// Check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
	if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
		ready = false;
		getPhotos();
		console.log(ready);
		console.log('total images =', totalImages);
		console.log('loaded images =', imagesLoaded);
	}
});

getPhotos();
