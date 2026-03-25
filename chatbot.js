// Chatbot functionality
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotWindow = document.getElementById('chatbotWindow');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');
const chatbotSuggestions = document.getElementById('chatbotSuggestions');

const BACKEND_CHAT_URL = 'http://localhost:3000/chat';

// System/local content
const prizrenQA = {
  // HISTORY
  "when was prizren founded": "Prizren was founded in the 2nd century AD as a Roman settlement called Theranda.",
  "what is the history of prizren": "Prizren has a rich history spanning over 2000 years, from Roman times through Byzantine, Serbian, and Ottoman periods to modern Kosovo.",
  "who built prizren fortress": "The Prizren Fortress was built by the Byzantine Empire in the 6th century and later expanded by Serbian and Ottoman rulers.",
  "when did ottomans conquer prizren": "The Ottoman Empire conquered Prizren in 1455, ruling it for over 450 years until 1912.",
  "what was the league of prizren": "The League of Prizren (1878) was an Albanian political organization formed to resist the partition of Albanian-inhabited territories.",
  "when was the league of prizren formed": "The League of Prizren was formed on June 10, 1878, in the city of Prizren.",
  "who ruled prizren before ottomans": "Before the Ottomans, Prizren was ruled by the Serbian Empire, particularly under Emperor Stefan Dushan in the 14th century.",
  "what is theranda": "Theranda was the ancient Roman name for Prizren, established in the 2nd century AD.",
  "who was stefan dusan": "Stefan Dushan was a Serbian Emperor (1331-1355) who made Prizren his capital and was crowned Emperor there in 1346.",
  "when was stefan dusan crowned": "Stefan Dushan was crowned Emperor of Serbs and Greeks in Prizren on April 16, 1346.",
  "what happened in prizren in 1878": "In 1878, the League of Prizren was formed to protect Albanian territories from being divided among neighboring countries.",
  "when did prizren fall to ottomans": "Prizren fell to Ottoman forces in 1455 under Sultan Mehmed II.",
  "what is the old name of prizren": "The old Roman name of Prizren was Theranda.",
  "when was prizren liberated": "Prizren was liberated from Ottoman rule in 1912 during the First Balkan War.",
  "what empires ruled prizren": "Prizren was ruled by Roman, Byzantine, Bulgarian, Serbian, and Ottoman empires over its history.",
  "what is prizren's significance in kosovo": "Prizren is Kosovo's cultural capital and second-largest city, known for its historical and religious tolerance.",

  // ATTRACTIONS
  "what are top attractions in prizren": "Top attractions include Prizren Fortress, Sinan Pasha Mosque, Stone Bridge, Our Lady of Ljevis, and the historic bazaar.",
  "where is prizren fortress": "Prizren Fortress sits on a hilltop overlooking the city, accessible by a walking path from the old town.",
  "how to visit prizren fortress": "Walk up from the old town center following signs, or drive partway up. It's a 20-30 minute uphill walk with stunning views.",
  "what is sinan pasha mosque": "Sinan Pasha Mosque is a 17th-century Ottoman mosque built in 1615, featuring beautiful architecture and a prominent minaret.",
  "where is the stone bridge": "The Stone Bridge crosses the Bistrica River in the heart of Prizren's old town.",
  "what can i see in old town prizren": "In the old town, see Ottoman houses, mosques, churches, the Stone Bridge, artisan shops, and traditional restaurants.",
  "is there a bazaar in prizren": "Yes, Prizren has a historic bazaar around the Shadervan area with traditional crafts, cafes, and shops.",
  "where is shadervan": "Shadervan is the central square fountain in Prizren's old town, surrounded by cafes and restaurants.",
  "are there museums in prizren": "Yes, including the Prizren Museum and the League of Prizren Museum.",
  "what is the best view in prizren": "The best view is from Prizren Fortress, overlooking the city, river, and surrounding mountains.",
  "can you walk around prizren old town": "Yes, the old town is very walkable with cobblestone streets and many attractions close to each other.",

  // CULTURE
  "what festivals happen in prizren": "Major festivals include Dokufest, Prizren Cultural Summer, and traditional Albanian celebrations.",
  "when is dokufest": "Dokufest is held annually in early August, usually for 8-9 days.",
  "what is dokufest": "Dokufest is an international documentary and short film festival, one of the largest in Southeast Europe.",
  "what language is spoken in prizren": "Albanian is the primary language, with Turkish and Serbian also spoken by some communities.",
  "what is prizren known for": "Prizren is known for its cultural diversity, Ottoman architecture, traditional crafts, and as Kosovo's cultural capital.",
  "what crafts are made in prizren": "Traditional crafts include filigree jewelry, copper work, traditional clothing, and handwoven textiles.",
  "is prizren multicultural": "Yes, Prizren has historically been one of the most multicultural cities in the Balkans.",
  "what religions are practiced": "Islam, Orthodox Christianity, and Catholicism are the main religions practiced in Prizren.",
  "what makes prizren special": "Prizren's blend of Ottoman, Byzantine, and Albanian heritage in a preserved historic setting makes it unique.",

  // FOOD
  "what food is prizren famous for": "Prizren is famous for flija, pite, tave, qebapa, baklava, and Turkish-influenced dishes.",
  "what is flija": "Flija is a traditional layered pancake dish cooked slowly over fire, served with cream and honey.",
  "where to eat in prizren": "Recommended restaurants include Te Syla, Marashi, Ambient, and cafes around Shadervan square.",
  "what is traditional albanian food": "Traditional dishes include byrek, tave, qebapa, and flija.",
  "what desserts are popular": "Popular desserts include baklava, kadaif, tulumba, and sheqerpare.",
  "where to drink coffee": "Cafes around Shadervan square and along the Bistrica River are great spots for coffee.",
  "is there local wine": "Kosovo produces wine in regions like Rahovec, and it is available in many Prizren restaurants.",
  "are there vegetarian options": "Yes, many restaurants offer vegetarian dishes including spinach pie, salads, and bean dishes.",

  // TOURISM INFO
  "how to get to prizren": "Reach Prizren by car from Pristina in around 1.5 hours, by bus from major cities, or via Pristina airport.",
  "where to stay in prizren": "You can stay at Hotel Centrum, boutique hotels in the old town, or guesthouses in traditional houses.",
  "is prizren safe for tourists": "Yes, Prizren is generally considered very safe for tourists and is known for hospitality.",
  "when is best time to visit prizren": "Best times are May-June and September-October for pleasant weather, or August for Dokufest.",
  "how many days to visit prizren": "2-3 days is ideal to explore the old town, fortress, nearby sites, and enjoy the local culture.",
  "what currency is used": "The Euro is the official currency in Kosovo.",
  "is english spoken": "English is increasingly spoken, especially by younger people and in tourist areas.",
  "what to buy as souvenirs": "Popular souvenirs include filigree jewelry, traditional crafts, local honey, and Kosovo wine.",
  "can i use credit cards": "Credit cards are accepted in hotels and larger restaurants, but carry cash for smaller shops and cafes.",

  // HOTEL / SALES
  "what services does hotel centrum offer": "Hotel Centrum offers comfortable accommodation in a central location, close to Prizren's main attractions and dining spots.",
  "where is hotel centrum located": "Hotel Centrum is located in central Prizren, making it convenient for exploring the city on foot.",
  "can i book a room": "Yes, you can contact Hotel Centrum directly to check availability and make a reservation.",
  "does the hotel help tourists": "Yes, Hotel Centrum is a great base for tourists and can help with local guidance and nearby recommendations.",
  "best photo spots in prizren": "Great photo spots include Prizren Fortress, the Stone Bridge, Shadervan, and views over the city at sunset.",
  "plan my day in prizren": "A great day in Prizren starts with coffee in Shadervan, a walk through the old town, a visit to the fortress, lunch at a traditional restaurant, and evening drinks with a city view."
};

// Create searchable questions array with keywords
const questions = Object.keys(prizrenQA);
const keywords = {
  history: questions.filter(q =>
    q.includes('history') || q.includes('founded') || q.includes('ottoman') ||
    q.includes('byzantine') || q.includes('empire') || q.includes('league') ||
    q.includes('ruled') || q.includes('theranda')
  ),
  attractions: questions.filter(q =>
    q.includes('fortress') || q.includes('mosque') || q.includes('bridge') ||
    q.includes('museum') || q.includes('bazaar') || q.includes('attraction') ||
    q.includes('visit') || q.includes('see') || q.includes('view')
  ),
  culture: questions.filter(q =>
    q.includes('festival') || q.includes('dokufest') || q.includes('culture') ||
    q.includes('craft') || q.includes('language') || q.includes('religion')
  ),
  food: questions.filter(q =>
    q.includes('food') || q.includes('eat') || q.includes('restaurant') ||
    q.includes('coffee') || q.includes('dessert') || q.includes('wine')
  ),
  hotel: questions.filter(q =>
    q.includes('hotel') || q.includes('room') || q.includes('book') || q.includes('stay')
  )
};

let conversationHistory = [];

// Toggle chatbot
chatbotToggle.addEventListener('click', () => {
  chatbotWindow.classList.add('active');
  chatbotToggle.style.display = 'none';
  chatbotInput.focus();

  if (!chatbotMessages.dataset.welcomeShown) {
    chatbotMessages.dataset.welcomeShown = "true";
  }
});

chatbotClose.addEventListener('click', () => {
  chatbotWindow.classList.remove('active');
  chatbotToggle.style.display = 'flex';
});

// Add message to chat
function addMessage(text, isBot = true) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `chatbot-message ${isBot ? 'bot-message' : 'user-message'}`;
  messageDiv.innerHTML = `<div class="message-content">${text}</div>`;
  chatbotMessages.appendChild(messageDiv);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Show typing indicator
function showTyping() {
  const typingDiv = document.createElement('div');
  typingDiv.className = 'chatbot-message bot-message typing-indicator';
  typingDiv.id = 'typingIndicator';
  typingDiv.innerHTML = `
    <div class="message-content">
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
    </div>
  `;
  chatbotMessages.appendChild(typingDiv);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Remove typing indicator
function removeTyping() {
  const typing = document.getElementById('typingIndicator');
  if (typing) typing.remove();
}

// Find best matching answer
function findAnswer(userQuestion) {
  const lowerQuestion = userQuestion.toLowerCase().trim();

  // direct match
  if (prizrenQA[lowerQuestion]) {
    return prizrenQA[lowerQuestion];
  }

  // partial match
  for (const question in prizrenQA) {
    if (question.includes(lowerQuestion) || lowerQuestion.includes(question)) {
      return prizrenQA[question];
    }
  }

  // keyword match
  let bestMatch = null;
  let maxMatches = 0;

  for (const question in prizrenQA) {
    const words = lowerQuestion.split(' ').filter(w => w.length > 3);
    let matches = 0;

    words.forEach(word => {
      if (question.includes(word)) matches++;
    });

    if (matches > maxMatches) {
      maxMatches = matches;
      bestMatch = question;
    }
  }

  if (bestMatch && maxMatches > 0) {
    return prizrenQA[bestMatch];
  }

  return null;
}

// Get AI response from backend
async function getAIResponse(userQuestion) {
  try {
    const response = await fetch(BACKEND_CHAT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: userQuestion,
        history: conversationHistory
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Backend request failed');
    }

    return data.reply;
  } catch (error) {
    console.error('Chatbot Backend Error:', error);
    return "I'm having trouble connecting right now. Please try again in a moment.";
  }
}

// Show topic suggestions
function showTopicSuggestions(topic) {
  chatbotSuggestions.innerHTML = '';
  const topicQuestions = keywords[topic] || [];
  const randomQuestions = [...topicQuestions].sort(() => 0.5 - Math.random()).slice(0, 4);

  randomQuestions.forEach(q => {
    const btn = document.createElement('button');
    btn.className = 'suggestion-btn';
    btn.textContent = q.charAt(0).toUpperCase() + q.slice(1) + '?';
    btn.addEventListener('click', () => {
      handleUserInput(q);
    });
    chatbotSuggestions.appendChild(btn);
  });
}

// Handle user input
async function handleUserInput(question) {
  const userInput = question || chatbotInput.value.trim();
  if (!userInput) return;

  if (userInput.length > 300) {
    addMessage("Please keep your message a bit shorter.", true);
    return;
  }

  addMessage(userInput, false);
  chatbotInput.value = '';

  chatbotSend.disabled = true;
  showTyping();

  conversationHistory.push({
    role: 'user',
    content: userInput
  });

  // Try local answer first
  const localAnswer = findAnswer(userInput);

  if (localAnswer) {
    await new Promise(r => setTimeout(r, 500));
    removeTyping();
    addMessage(localAnswer, true);
     
    logConversation(userInput, localAnswer);

    conversationHistory.push({
      role: 'assistant',
      content: localAnswer
    });

    if (conversationHistory.length > 10) {
      conversationHistory = conversationHistory.slice(-10);
    }

    chatbotSend.disabled = false;
    return;
  }

  // Fall back to AI
  const aiAnswer = await getAIResponse(userInput);

  await new Promise(r => setTimeout(r, 700));
  removeTyping();
  addMessage(aiAnswer, true);

  logConversation(userInput, aiAnswer);

  conversationHistory.push({
    role: 'assistant',
    content: aiAnswer
  });

  if (conversationHistory.length > 10) {
    conversationHistory = conversationHistory.slice(-10);
  }

  chatbotSend.disabled = false;
}

// Send button
chatbotSend.addEventListener('click', () => handleUserInput());

// Enter key
chatbotInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') handleUserInput();
});

// Existing topic buttons from HTML
document.querySelectorAll('.suggestion-btn[data-question]').forEach(btn => {
  btn.addEventListener('click', () => {
    const topic = btn.dataset.question;
    showTopicSuggestions(topic);
  });
});
async function logConversation(message, response) {
  try {
    await fetch('http://127.0.0.1:3000/log', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message,
        response,
        language: currentLanguage
      })
    });
  } catch (error) {
    console.error("Logging failed:", error);
  }
}