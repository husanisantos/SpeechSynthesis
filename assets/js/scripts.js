/**
 * O que é isso? Uma caixa onde o usuário vai digitar o texto que deseja ouvir falado!
 */
const textToSpeak   = document.getElementById('textToSpeak');

/**
 * Aqui temos o seletor de vozes! O lugar onde o usuário escolhe qual voz vai falar o texto.
 */
const voiceSelector = document.getElementById('voiceSelector');

/**
 * O botão mágico! Quando o usuário clica aqui, o texto será falado em voz alta.
 */
const speakButton   = document.getElementById('speakButton');

/**
 * O sintetizador de fala, também conhecido como "fala do navegador".
 * Ele vai ser nosso assistente para transformar texto em voz.
 */
const synth = window.speechSynthesis;

/**
 * Uma lista para armazenar todas as vozes disponíveis.
 * A cada carregamento da página, vamos descobrir quais vozes estão disponíveis para o nosso navegador.
 */
let voices = [];

/**
 * Carrega as vozes disponíveis e as exibe no seletor de vozes.
 * Isso acontece sempre que o navegador nos avisa que as vozes foram carregadas.
 */
function loadVoices() {
    // Aqui pegamos as vozes que o sintetizador pode usar
    voices = synth.getVoices();

    // Limpa as opções do seletor de vozes antes de preencher com novas
    voiceSelector.innerHTML = '';

    // Agora, para cada voz que encontramos, criamos uma opção no menu suspenso
    voices.forEach((voice, index) => {
        const option = document.createElement('option');
        option.value = index;  // Cada opção tem um valor único, que é o índice da voz

        // Mostra o nome da voz e o idioma (por exemplo, "Google Português (Brasil)")
        option.textContent = `${voice.name} (${voice.lang})`;

        // Se a voz for a voz padrão, vamos adicionar o rótulo "Padrão"
        if (voice.default) {
            option.textContent += ' [Padrão]';
        }

        // Adicionamos essa opção no seletor para o usuário escolher
        voiceSelector.appendChild(option);
    });
}

/**
 * O evento 'voiceschanged' é disparado sempre que as vozes disponíveis mudam (ex: ao carregar o navegador)
 */
synth.addEventListener('voiceschanged', loadVoices);

/**
 * A função mágica para falar o texto!
 * Quando o usuário clicar no botão, esta função é chamada e a fala começa.
 */
function speakText() {
    // Pega o texto que o usuário digitou na caixa de entrada
    const text = textToSpeak.value;

    // Se o usuário não digitou nada, vamos pedir para ele colocar um texto
    if (!text) {
        alert('Por favor, insira um texto para falar!');
        return;  // Não faz nada mais até o texto ser colocado
    }

    // Criamos um "objeto" que representa o texto que será falado
    const utterance = new SpeechSynthesisUtterance(text);

    // Pegamos o índice da voz escolhida no seletor
    const selectedVoiceIndex = voiceSelector.value;

    // Se o usuário escolheu uma voz, definimos essa voz no objeto "utterance"
    if (selectedVoiceIndex) {
        utterance.voice = voices[selectedVoiceIndex];
    }

    // Agora, fazemos o navegador falar o texto!
    synth.speak(utterance);
}

/**
 * A mágica acontece quando o usuário clica no botão!
 * Chamamos a função speakText() para que o texto digitado seja falado.
 */
speakButton.addEventListener('click', speakText);
