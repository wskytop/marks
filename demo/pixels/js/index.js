function $(id) {
  return id ? document.getElementById(id) : null;
}
const showImg = $('showImg');
const subtract = $('subtract');
const add = $('add');
const range = $('range');
const rangeScale = $('rangeScale');
const scaleVal = $('scaleVal');
const threshold = $('threshold');
const color = $('color-check');
const downloadBtn = $('download');

var currentThreshold = 128,
  scale = 0.25,
  currentImage = '',
  mode = 0;
const onSubtract = (e) => {
  range.value -= 1;
  threshold.innerHTML = range.value;
  currentThreshold = range.value;
  render();
};
const onSubtractScale = () => {
  rangeScale.value -= 0.01;
  scaleVal.innerHTML = rangeScale.value;
  scale = rangeScale.value;
  render();
};
const onAdd = (e) => {
  range.value = Number(range.value) + 1;
  threshold.innerHTML = range.value;
  currentThreshold = range.value;
  render();
};
const onAddScale = () => {
  rangeScale.value = Number(rangeScale.value) + 0.01;
  scaleVal.innerHTML = rangeScale.value;
  scale = rangeScale.value;
  render();
};
const onChangeRange = (e) => {
  threshold.innerHTML = e.value;
  currentThreshold = range.value;
  render();
};
const onChangeRangeScale = (e) => {
  rangeScale.value = e.value;
  scaleVal.innerHTML = rangeScale.value;
  scale = rangeScale.value;
  render();
};
const onChangeModel = () => {
  mode = mode === 1 ? 0 : 1;
  mode === 1
    ? color.classList.add('check-black')
    : color.classList.remove('check-black');
  color.innerHTML = mode === 0 ? '彩色' : '黑白';
  render();
};

const onDown = function () {
  downloadBtn.download = 'pixel.png';
  downloadBtn.href = canvas.toDataURL();
};
function changePic(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      currentImage = e.target.result;
      showImg.innerHTML = `<img src="${e.target.result}" />`;
      render();
    };
    reader.readAsDataURL(input.files[0]);
  }
}
/**
 * [thresholdConvert 阈值处理]
 * @param  {[type]} ctx       [description]
 * @param  {[type]} imageData [description]
 * @param  {[type]} threshold [阈值]
 * @param  {[type]} mode      [模式：0：彩色，1：黑白]
 * @return {[type]}           [description]
 */
var thresholdConvert = function (ctx, imageData, threshold, mode) {
  var data = imageData.data;
  for (var i = 0; i < data.length; i += 4) {
    var red = data[i];
    var green = data[i + 1];
    var blue = data[i + 2];
    var alpha = data[i + 3];

    // 灰度计算公式
    var gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];

    var color = gray >= threshold ? 255 : 0;

    data[i] = mode == 0 && color == 0 ? red : color; // red
    data[i + 1] = mode == 0 && color == 0 ? green : color; // green
    data[i + 2] = mode == 0 && color == 0 ? blue : color; // blue
    data[i + 3] = alpha >= threshold ? 255 : 0; // 去掉透明
  }
  ctx.putImageData(imageData, 0, 0);
};
var render = function () {
  if (!currentImage) {
    alert('请先上传图片');
    return;
  }
  var canvasTemp = document.createElement('canvas');
  var context = canvasTemp.getContext('2d');
  var image = new Image();
  image.src = currentImage;
  image.onload = function () {
    canvasTemp.width = image.width * scale;
    canvasTemp.height = image.height * scale;
    // 缩小到 25%
    context.drawImage(image, 0, 0, image.width * scale, image.height * scale);

    var imageData = context.getImageData(
      0,
      0,
      image.width * scale,
      image.height * scale
    );
    // 阈值处理
    thresholdConvert(context, imageData, currentThreshold, mode);

    var dataURL = canvasTemp.toDataURL();
    var canvas = $('canvas');
    var ctx = canvas.getContext('2d');
    var img = new Image();
    img.src = dataURL;
    img.onload = function () {
      canvas.width = img.width / scale;
      canvas.height = img.height / scale;

      // 反锯齿
      ctx.imageSmoothingEnabled = false;
      ctx.mozImageSmoothingEnabled = false;
      ctx.webkitImageSmoothingEnabled = false;
      ctx.msImageSmoothingEnabled = false;

      ctx.drawImage(img, 0, 0, img.width / scale, img.height / scale);
      // download();
    };
  };
};
