var voiceMenu = document.querySelector('#voiceMenu'),
speechBtn = document.querySelector("#speechBtn"),
textInput = document.querySelector("#textInput");

var tts = window.speechSynthesis; //make the speech synthesis
var voices = []; //make the voices is equal to an array

GetVoices(); //call the function

if(speechSynthesis !== undefined || speechSynthesis == undefined) //check if the selected synthesis voice is undefined or defined to make the function good working 
{

    speechSynthesis.onvoiceschanged = GetVoices; //when a voice selected, turn on the function (GetVoices) and speeck when the btn is clicked
}
speechBtn.addEventListener('click', function() {
    var speeck = new SpeechSynthesisUtterance(textInput.value); //make the variable speeck to make the browser say the text written in the textInput
     var selectedVoiceName = voiceMenu.selectedOptions[0].getAttribute('data-name'); //get the textContent of the selected voice name from the voiceMenu
     voices.forEach((voice) => {
if(voice.name == selectedVoiceName){
    speeck.voice = voice; //speeck only if the speech's voice's name is the same as the selected one
}
     });
     tts.speak(speeck) //activate the speechSynthesis by speacking the (speeck)
});

function GetVoices()  //make the ("GetVoices ") function
{
voices = tts.getVoices(); //make the google speech synthesis and append it as an array in the voices variable
voiceMenu.innerHTML = ''; //fill the voiceMenu with no thing
voices.forEach((voice) => {
var listOption = document.createElement('option') //make the voiceMenu options
listOption.textContent = voice.name; //enter each voice's name as a textContent for each listOption
listOption.setAttribute('data-lang', voice.lang) //make each listOption text language the same as the voice by (setAttribute) method
listOption.setAttribute('data-name', voice.name)//make each listOption textContent the same as the voice by (setAttribute) method as well

voiceMenu.appendChild(listOption) //finally, append each listOption to the voiceMenu of course

})
voiceMenu.selectedIndex = 0; //make the selected option of the voiceMenu the first one. (cahngeable)
}
var mic = document.querySelector('.mic')
var micIcon = mic.querySelector('i')

const SpeechRecognition  = window.SpeechRecognition || window.webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;


if(SpeechRecognition) {
    console.log('supported')
    const recognition = new SpeechRecognition();
    //var myInterimResult = recognition.interimResults;
    recognition.lang = 'en';
  
var colors = [ 'aqua' , 'azure' , 'beige', 'bisque', 'black', 'blue', 'brown', 'chocolate', 'coral', 'crimson', 'cyan', 'fuchsia', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'indigo', 'ivory', 'khaki', 'lavender', 'lime', 'linen', 'magenta', 'maroon', 'moccasin', 'navy', 'olive', 'orange', 'orchid', 'peru', 'pink', 'plum', 'purple', 'red', 'salmon', 'sienna', 'silver', 'snow', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'white', 'yellow'];
var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;';
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;

//recognition.interimResults = true;


    mic.addEventListener('click', micClicked)
    function micClicked() {
        if(micIcon.classList.contains('fa-microphone')){
            //start speech recognition
            recognition.start()
        }
        else{
            //stop speech recognition
            recognition.stop()
        }
    }
   recognition.onstart = function startSpechRecognition() {
    micIcon.classList.remove('fa-microphone'); micIcon.classList.add('fa-microphone-alt-slash');
    textInput.focus()
console.log('speech recognition is active')
   }
   recognition.onend = function endSpechRecognition() {
    micIcon.classList.add('fa-microphone'); 
    micIcon.classList.remove('fa-microphone-alt-slash');
    textInput.focus() 
    console.log('speech recognition is not active')
       }
       recognition.onresult = function resulOfSpeechRecognition(evt) {
console.log(evt) //print the sound in the console
var currentResulIndex = evt.resultIndex
var transcript = evt.results[currentResulIndex][0].transcript;
textInput.value = transcript;
speechBtn.click()

if(transcript.toLocaleLowerCase().trim() === 'stop') {
  recognition.stop()
  speechBtn.click()
           }
           else if(transcript.toLocaleLowerCase().trim() === 'go' || transcript.toLocaleLowerCase().trim() === 'run') {
            
                speechBtn.click()
                   }
                   else if(transcript.toLocaleLowerCase().trim() === 'reset') {
                        textInput.value = '';
                           }
    }
}


else{
    console.log('not supported')
    mic.remove()
}