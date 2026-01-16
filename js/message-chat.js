// 1. Get elements
const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const teacherImgElement = document.getElementById('teacher-img');
const teacherNameHeading = document.getElementById('teacher-name');

// 2. Identify which teacher this is from the URL
const urlParams = new URLSearchParams(window.location.search);
const teacherImg = urlParams.get('img');
teacherImgElement.src = teacherImg;
const teacherName = urlParams.get('teacher') || "Unknown Teacher";
teacherNameHeading.innerText = teacherName;

// 3. Unique key for localStorage (e.g., "chat_Ronald Richards")
const storageKey = `chat_${teacherName}`;

// 4. Function to render messages
function displayMessages() {
    const history = JSON.parse(localStorage.getItem(storageKey)) || [];
    chatBox.innerHTML = ''; // Clear current view

    let lastMessageTime = null;
    
    history.forEach(msg => {
        const timestamp = msg.timestamp || new Date().getTime();
        const msgDate = new Date(timestamp);
        const timeString = msgDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const dateString = msgDate.toLocaleDateString([], { day: 'numeric', month: 'short' });

        // If it's a new day or the first message, show a date divider in the middle
        const isNewDay = !lastMessageTime || new Date(lastMessageTime).toDateString() !== msgDate.toDateString();
        if (isNewDay) {
            const dateDivider = document.createElement('div');
            dateDivider.className = "chat-date-divider";

            dateDivider.style.marginLeft = "auto";
            dateDivider.style.marginRight = "auto";
            dateDivider.style.padding = "8px";
            dateDivider.style.width = "fit-content";
            dateDivider.style.height = "31px";
            dateDivider.style.border = "1px solid #E2E8F0";
            dateDivider.style.borderRadius = "8px";
            dateDivider.style.backgroundColor = "#F1F5F9";
            dateDivider.style.fontSize = "12px";
            dateDivider.style.fontWeight = "600";
            dateDivider.style.textAlign = "center";
            dateDivider.style.color = "#0F172A";
            dateDivider.innerText = dateString;
            chatBox.appendChild(dateDivider);
        }
        
        const isContinuous = lastMessageTime && (timestamp - lastMessageTime < 120000);

        const msgDiv = document.createElement('div');
        msgDiv.className = `message-wrapper ${msg.sender}`;

        msgDiv.style.display = "flex";
        msgDiv.style.flexDirection = "column";
        msgDiv.style.margin = msg.sender === 'me' ? '8px 0' : '24px';
        msgDiv.style.alignItems = msg.sender === 'me' ? 'flex-end' : 'flex-start';

        // Only add the time label if NOT continuous
        let timeLabelHtml = !isContinuous ? `<span class="message-time" style="font-size: 12px; font-weight: 600; color: #64748B; margin-bottom: 8px;">${timeString}</span>` : '';
        
        msgDiv.innerHTML = `
            ${timeLabelHtml}
            <span style="width: fit-content;
                         max-width: 65%;
                         padding: 8px 16px; border-radius: 8px; 
                         background: ${msg.sender === 'me' ? '#0F172A' : '#F1F5F9'}; 
                         word-wrap: break-word;
                         font-size: 16px;
                         color: ${msg.sender === 'me' ? 'white' : 'black'};">
                ${msg.text}
            </span>
        `;
        chatBox.appendChild(msgDiv);

        lastMessageTime = msg.timestamp; // Update for the next loop
    });
    // Auto scroll to bottom
    chatBox.scrollTop = chatBox.scrollHeight;
}

// 5. Function to send message
function sendMessage() {
    const text = messageInput.value.trim();
    if (text === "") return;

    const history = JSON.parse(localStorage.getItem(storageKey)) || [];
    history.push({  sender: 'me',
                    text: text,
                    timestamp: new Date().getTime()
                 });
    
    localStorage.setItem(storageKey, JSON.stringify(history));
    messageInput.value = ""; // Clear input
    displayMessages(); // Refresh chat
}

// Event Listeners
sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

// Initial Load
displayMessages();