export const validEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// get lightest average color
export const getLightColorFromImage= async (imageUrl) => {
 
    return new Promise((resolve, reject) => {

      // check if imageUrl is valid
      if (!imageUrl || typeof imageUrl !== "string") {
           return reject(new Error ("Invalid image URL"));
      }

    const img = new Image();

    // if is not a base64 string, set crossOrigin (CORS)
    if (!imageUrl.startsWith("data:")) {
        img.crossOrigin = "Anonymous";
    }

    img.src = imageUrl;

    img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);

          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
          
          let r = 0, g = 0, b = 0, count = 0;

          for (let i = 0; i < imageData.length; i += 4) {
            const red = imageData[i];
            const green = imageData[i + 1];
            const blue = imageData[i + 2];
            const brightness = (red + green + blue) / 3;

            // Only count light pixels 
            if (brightness > 180) {
                  r += red;
                  g += green;
                  b += blue;
                  count++;
              }
          }

          if (count === 0) {
              resolve("#ffffff"); // fallback if no bright pixels found
          } else {
             r = Math.round(r / count);
             g = Math.round(g / count);
             b = Math.round(b / count);
             resolve(`rgb(${r}, ${g}, ${b})`);
          }
      };

      img.onerror = (e) => {
        console.error("Error loading image:", e);
        reject(new Error("Image could not be loaded or is blocked by Cors"));
      };
    });
};
