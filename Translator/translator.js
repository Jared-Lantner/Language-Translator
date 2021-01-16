const xapi = require('xapi'); 

const userInput = {
	Text: "Enter word", 
	FromLanguage: "English", 
	ToLanguage: "English"
}; 

function open(url) {
	xapi.command('UserInterface WebView Display', {Url: url}) 
	.catch(e => console.log('Not able to open url', e.toString())) 
}

//Open translate widget when button is pressed 
function translateButton(event) {
	if (event.PanelId === 'translate') {
		xapi.command('UserInterfaceMessage TextInput Display', userInput); 
	}
}


//Use google translate to perform the requested translation.  
function callTranslate(event) {
	open(`translate.google.com/?sl=${userInput.fromLanguage}&tl=${userInput.toLanguage}&text=${userInput.text}&op=translate`)
}

xapi.event.on('UserInterface Extentions Panel Clicked', translateButton);
xapi.event.on('UserInterface Message TextInput Response', callTranslate);  
