document.addEventListener('DOMContentLoaded', function () {
  const optionInputsEl = document.querySelectorAll(
    '.option input, .option-clr input'
  );
  const btnRndFractal = document.getElementById('rnd-fractal');
  const btnClearCanvas = document.getElementById('clear-canvas');
  const btnGenerateFractal = document.getElementById('generate-fractal');

  const canvas = document.querySelector('#canvas');
  let curve;

  canvas.height = innerHeight * 0.6 > 590 ? innerHeight * 0.6 : 590;
  if (innerWidth > 500) {
    canvas.width = innerWidth * 0.71 > 669 ? 669 : innerWidth * 0.71;
  } else {
    canvas.width = innerWidth * 0.94;
  }

  const ctx = canvas.getContext('2d');

  const drawFactal = (
    x,
    y,
    len,
    angle,
    branchWidth,
    color1,
    color2,
    lvlLeaf = 6
  ) => {
    maxLen = lvlLeaf * 3;
    ctx.beginPath();
    ctx.save();
    ctx.lineCap = 'round';
    ctx.strokeStyle = color1;
    ctx.fillStyle = color2;
    ctx.shadowBlur = 15;
    ctx.shadowColor = 'rgba(0,0,0,.45)';
    ctx.lineWidth = branchWidth;
    ctx.translate(x, y);
    ctx.rotate((angle * Math.PI) / 180);
    ctx.moveTo(0, 0);
    //   ctx.lineTo(0, -len);
    //   ctx.lineTo(0, len / 5);
    if (Math.random() > 0.5) {
      ctx.bezierCurveTo(10, -len / 2, -10, -len / 2, 0, -len);
    } else {
      ctx.bezierCurveTo(10, -len / 2, 10, -len / 2, 0, -len);
    }
    ctx.stroke();
    if (len < 22 - maxLen) {
      // leafs
      ctx.beginPath();
      ctx.arc(0, -len, 10, 0, Math.PI / 2);
      ctx.fill();
      ctx.restore();
      return;
    }

    curve = Math.random() * 10 + 10;
    drawFactal(
      0,
      -len,
      len * 0.75,
      angle + curve,
      branchWidth * 0.69,
      color1,
      color2,
      lvlLeaf
    );
    drawFactal(
      0,
      -len,
      len * 0.75,
      angle - curve,
      branchWidth * 0.69,
      color1,
      color2,
      lvlLeaf
    );

    ctx.restore();
  };

  // drawFactal(canvas.width / 2, canvas.height - 350, 120, 10, 2, 'white', 'green');
  const handleGenerateFractal = () => {
    const [angle, lvlLeaf, widthBranch, color1, color2] = getValuesInputs();
    console.log(lvlLeaf * 6);
    generateFractal(angle, lvlLeaf, widthBranch, color1, color2);
  };
  const generateFractal = (angle, lvlLeaf, widthBranch, color1, color2) => {
    drawFactal(
      canvas.width / 2,
      canvas.height * 0.9,
      Math.random() * 20 + 100,
      +angle,
      widthBranch,
      color1,
      color2,
      lvlLeaf
    );
  };

  // Function return res = [angle, len, widthBranch, color1, color2]
  const getValuesInputs = () => {
    const res = [];
    optionInputsEl.forEach((el) => res.push(el.value));
    return res;
  };

  const handleGenerateRndFractal = () => {
    let i = 0;
    loopGenrateRndFractal(i);
  };

  const loopGenrateRndFractal = (i) => {
    i == 0 && clearCanavas();
    setTimeout(() => {
      i++;
      generateFractal(
        0,
        5,
        i * 2,
        `hsl(${Math.ceil(Math.random() * 360)}, 76%, 55%)`,
        `hsl(${Math.ceil(Math.random() * 360)},0 76%, 55%)`
      );
      console.log(i);
      if (i < 10) {
        loopGenrateRndFractal(i);
      } else {
        return;
      }
    }, 300);
  };
  const clearCanavas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (innerWidth > 500) {
      canvas.width = innerWidth * 0.71 > 669 ? 669 : innerWidth * 0.71;
    } else {
      canvas.width = innerWidth * 0.94;
    }
  };

  btnRndFractal.addEventListener('click', handleGenerateRndFractal);
  btnGenerateFractal.addEventListener('click', handleGenerateFractal);
  btnClearCanvas.addEventListener('click', clearCanavas);
  addEventListener('resize', clearCanavas);
});
