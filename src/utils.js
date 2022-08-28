export const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

/* Utility function to convert a canvas to a BLOB */
var dataURLToBlob = function (dataURL) {
    var BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) == -1) {
        var parts = dataURL.split(',');
        var contentType = parts[0].split(':')[1];
        var raw = parts[1];

        return new Blob([raw], { type: contentType });
    }

    var parts = dataURL.split(BASE64_MARKER);
    var contentType = parts[0].split(':')[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;

    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
}
/* End Utility function to convert a canvas to a BLOB      */

export const compressImage = (img, maxLength, quality) => new Promise((resolve, reject) => {
    console.log(img);
    const blobURL = URL.createObjectURL(img);
    const imgToCompress = new Image();
    imgToCompress.src = blobURL;
    console.log(imgToCompress)

    imgToCompress.onload = function () {
        // URL.revokeObjectURL(this.src);
        console.log(imgToCompress)


        // resizing the image
        const canvas = document.createElement("canvas");
        const context = canvas.getContext('2d');

        const originalWidth = imgToCompress.width;
        const originalHeight = imgToCompress.height;

        const canvasWidth = maxLength;
        const canvasHeight = maxLength;

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        context.drawImage(
            imgToCompress,
            0, 0,
            maxLength,
            maxLength
        );

        var dataUrl = canvas.toDataURL('image/jpeg');
        var resizedImage = dataURLToBlob(dataUrl);
        console.log(resizedImage);
        resolve(resizedImage);
    };
})
    // // reducing the quality of the image
    // canvas.toBlob(
    //     (blob) => {
    //         if (blob) {
    //             // showing the compressed image
    //             resizedImage.src = URL.createObjectURL(resizedImageBlob);
    //         }
    //     },
    //     "image/jpeg",
    //     quality
    // );