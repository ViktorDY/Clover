// Squares and shrinks a picked photo to 256×256 so it fits in storage.
export function readPhoto(file, onDone) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.onload = () => {
      const side = 256;
      const canvas = document.createElement("canvas");
      canvas.width = side;
      canvas.height = side;
      const m = Math.min(img.width, img.height);
      canvas.getContext("2d").drawImage(img, (img.width - m) / 2, (img.height - m) / 2, m, m, 0, 0, side, side);
      onDone(canvas.toDataURL("image/jpeg", 0.86));
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
}
