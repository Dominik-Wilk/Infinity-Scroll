const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30;
// const apiKey = 'wYWaXiDBtyC47GX3e7ECtbjjbAidSM0c-Ue6PWZR9g0';
const key1 = 'hlCwgSQfJUze6-qbz8voTfnVLrgZtWyLEVN7t8q_mZQ';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${key1}&count=${count}`;

// Check if all images were loaded

function imageLoaded() {
	imagesLoaded++;
	console.log(imagesLoaded);
	if (imagesLoaded === totalImages) {
		imagesLoaded = 0;
		ready = true;
		console.log('ready =', ready);
	}
}

// Helper functtion to set attributes on DOM elements

function setAttributes(element, attributes) {
	for (const key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
}

// Create elements for links and photos

function displayPhotos() {
	totalImages = photosArray.length;
	console.log('total images', totalImages);
	// Run function for each object in photosArray
	photosArray.forEach(photo => {
		// Create <a> to link to Unsplash

		const item = document.createElement('a');
		setAttributes(item, {
			href: photo.links.html,
			target: '_blank',
		});

		const img = document.createElement('img');
		setAttributes(img, {
			src: photo.urls.regular,
			alt: photo.alt_description,
			title: photo.alt_description,
		});

		// Event listener check when each is finished loading

		img.addEventListener('load', imageLoaded);

		// put <img> inside <a> then put both inside imageContainer element

		item.appendChild(img);
		imageContainer.appendChild(item);
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
