'use strict'

// define as constantes
const redirectUrl = 'index.html'
let totalFigures = 0
let figures = null
let currentItem = null
let score = 0

// carrega os arquivos do json
function start(){
	const jsonText = document.getElementById('data').innerText.trim()
	figures = JSON.parse(jsonText).figuras
	totalFigures = figures.length
	updateItem()
}

// atualiza o documento com os arquivos da figura atual
function updateItem(){
	if(figures.length === 0)
		return

	const item = getFigures() // Pegando figura
	const imgElement = document.getElementById('animalfigure')
	let audioElement = document.getElementById("animalaudio");
	audioElement.setAttribute('src', item.audio)
    imgElement.setAttribute('src', item.img)
  	currentItem = item
}

// Retorna uma figura aleatoria e a remove do array
function getFigures(){ 
	const index = Math.floor((Math.random()) * figures.length)
    const item = figures[index]
    figures.splice(index,1)
    return item
}

// Executa o som
function playAudio(){
	document.getElementById('animalaudio').play()
}

// Verifica se o usuario digitou corretamente, da o feedback visual e chama a nextItem se ele acertou
function processName() {
	const inputElement = document.getElementById('figuretext')
	const itemName = (inputElement['value'] || '').toLowerCase().trim()
	if(itemName === currentItem.name){
		inputElement.setAttribute('class', 'sucess form-control')
		setTimeout(nextItem, 1000)
	}else{
		inputElement.setAttribute('class', 'fail form-control')
	}
}

// Adiciona 1 na pontuação e atualiza o texto da pontuação
function updateScore(){
	document.getElementById('score').innerText = 'Pontuação ' + (++score)

}

// Carrega a proxima figura ou volta se elas acabaram
function nextItem(){
	updateItem()
	updateScore()
	const inputElement = document.getElementById('figuretext')
	inputElement.setAttribute('class', 'form-control')
	inputElement.value = ''
	inputElement.focus()
	if(score === totalFigures){
		window.location.replace(redirectUrl)
	}
}