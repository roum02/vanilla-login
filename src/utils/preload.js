// export default function preload(imagesArray, callback) {
//     var img = new Image();
//     img.src = imagesArray[0];
//     img.onload = callback;
// }

export default function preloadImages(urls, allImagesLoadedCallback) {
  let loadedCounter = 0;
  let toBeLoadedNumber = urls.length;
  urls.forEach(function (url) {
    preload(url, function () {
      loadedCounter++;
      //console.log(url)
      if (loadedCounter == toBeLoadedNumber) {
        allImagesLoadedCallback();
      }
    });
  });
  function preload(url, anImageLoadedCallback) {
    let img = new Image();
    img.onload = anImageLoadedCallback;
    img.src = url;
    //console.log(img)
  }
}
