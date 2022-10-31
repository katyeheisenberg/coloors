const cols = document.querySelectorAll('.col');

document.addEventListener('keydown', (event) => {
  event.preventDefault()
  if (event.code.toLocaleLowerCase() === 'space') {
    setRandomColor()
  }
});

document.addEventListener('click', (event) => {
  const type = event.target.dataset.type
  if(type === 'lock') {
    const node = event.target.tagName.toLocaleLowerCase() === 'i'
     ? event.target
     : event.target.children[0]

     node.classList.toggle("fa-shield-halved");
    node.classList.toggle("fa-heart");

  }
  if (type === 'copy') {
    copyColor(event.target.textContent)
  }
});

function generateColor() {
  const hexCodes = '0123456789ABCDEF';

  let color = '';

  for (let i = 0; i < 6; i += 1) {
    color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
  }

  return `#${color}`
}

function setTitleColor(text, color) {
  const luminance = chroma(color).luminance();
  text.style.color = luminance > 0.5 ? 'black' : 'white'
}

function setRandomColor(isInitial) {
  const colorsArr = isInitial ? getColorHash() : []
  cols.forEach((col, index) => {
    const isLocked = col
      .querySelector("i")
      .classList.contains("fa-shield-halved");
    const title = col.querySelector('h2');
    const button = col.querySelector('button');

    if(isLocked) {
      colorsArr.push(title.textContent)
      return
    }
    const color = isInitial
    ? colorsArr[index]
      ? colors[index]
      : generateColor()
    : generateColor()
    if(!isInitial) {
      colorsArr.push(color)
    }
    title.textContent = color
    col.style.background = color
    setTitleColor(title, color)
    setTitleColor(button, color);
  })

  updateHash(colorsArr)
}

function copyColor(text) {
  return navigator.clipboard.writeText(text)
}

function updateHash(colors = []) {
  document.location.hash = colors.map((col) => {
    return col.substring(1)
  }).join('-')
}

function getColorHash() {
  if(document.location.hash.length > 1) {
    return document.location.hash.substring(1).split('-').map((col) => {
      return `#${col}`
    })
  }
  return []
}

setRandomColor(true)
