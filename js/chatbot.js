// Configuración de la API de Gemini
// Endpoint serverless para ocultar API Key
const API_ENDPOINT = '/.netlify/functions/gemini';

// Elementos del DOM
const chatbotButton = document.getElementById('chatbotButton');
const chatbotContainer = document.getElementById('chatbotContainer');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');

// Variables de estado
let isChatOpen = false;
let isLoading = false;
let userName = null;

// Historial de la conversación
const systemPrompt = 'Eres un asistente virtual de SATLOG.NET, una empresa especializada en soluciones tecnológicas integradas para PYMES. Proporciona respuestas concisas y útiles sobre servicios de desarrollo de software, ciberseguridad y análisis de datos. Si no sabes algo, ofrecerás contactar con un asesor humano.';
let conversationHistory = [
    { role: 'user', parts: [{ text: systemPrompt }] }
];

// Función para alternar la visibilidad del chat
function toggleChat() {
    isChatOpen = !isChatOpen;
    if (isChatOpen) {
        chatbotContainer.classList.add('visible');
        chatbotInput.focus();
    } else {
        chatbotContainer.classList.remove('visible');
    }
}

// Función para añadir un mensaje al chat
function addMessage(role, content) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}`;

    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.textContent = content;

    messageDiv.appendChild(messageContent);
    chatbotMessages.appendChild(messageDiv);

    // Desplazar al último mensaje
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Función para mostrar el indicador de escritura
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot';
    typingDiv.id = 'typingIndicator';

    const typingContent = document.createElement('div');
    typingContent.className = 'typing-indicator';
    typingContent.innerHTML = '<span></span><span></span><span></span>';

    typingDiv.appendChild(typingContent);
    chatbotMessages.appendChild(typingDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

    return typingDiv;
}

// Función para ocultar el indicador de escritura
function hideTypingIndicator(typingElement) {
    if (typingElement) {
        typingElement.remove();
    }
}

// Función para enviar un mensaje
async function sendMessage() {
    const message = chatbotInput.value.trim();
    if (!message || isLoading) return;

    // Mostrar mensaje del usuario
    addMessage('user', message);
    chatbotInput.value = '';

    // Si aún no tenemos nombre, capturarlo y saludar
    if (!userName) {
        userName = message;
        addMessage('bot', `Mucho gusto, ${userName}. ¿En qué puedo ayudarte hoy?`);
        return;
    }

    // Mostrar indicador de escritura
    const typingElement = showTypingIndicator();

    // Agregar mensaje al historial
    conversationHistory.push({
        role: 'user',
        parts: [{ text: message }]
    });

    isLoading = true;

    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: conversationHistory,
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 1024,
                },
            }),
        });

        if (!response.ok) {
            throw new Error(`Error en la API: ${response.status}`);
        }

        const data = await response.json();
        const botResponse = data.candidates[0].content.parts[0].text;

        // Agregar respuesta al historial
        conversationHistory.push({
            role: 'model',
            parts: [{ text: botResponse }]
        });

        // Mostrar respuesta del bot
        hideTypingIndicator(typingElement);
        addMessage('bot', botResponse);

    } catch (error) {
        console.error('Error:', error);
        hideTypingIndicator(typingElement);
        addMessage('bot', 'Lo siento, ha ocurrido un error al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde.');
    } finally {
        isLoading = false;
    }
}

// Event Listeners
chatbotButton.addEventListener('click', toggleChat);
chatbotClose.addEventListener('click', toggleChat);
chatbotSend.addEventListener('click', sendMessage);
chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// Preguntar nombre al usuario al cargar
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        addMessage('bot', '¡Hola! Soy tu asistente virtual de SATLOG.NET. ¿Cómo te llamas?');
    }, 500);
});
