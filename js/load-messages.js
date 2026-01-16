document.addEventListener('DOMContentLoaded', () => {
    // List of teachers you have cards for
    const teachers = ["Ronald Richards", "Devon Lane"];

    teachers.forEach(name => {
        const storageKey = `chat_${name}`;
        const history = JSON.parse(localStorage.getItem(storageKey)) || [];

        if (history.length > 0) {
            // Get the very last message in the array
            const lastEntry = history[history.length - 1];
            
            // 1. Update the message preview text
            const msgPreview = document.getElementById(`msg-${name}`);
            if (msgPreview) {
                // If the message was sent by 'me', add a prefix
                const prefix = lastEntry.sender === 'me' ? "You: " : "";
                msgPreview.innerText = prefix + lastEntry.text;
            }

            // 2. Update the time
            const timeDisplay = document.getElementById(`time-${name}`);
            if (timeDisplay) {
                const msgDate = new Date(lastEntry.timestamp);
                
                // If it was today, show time. If older, show date.
                const isToday = new Date().toDateString() === msgDate.toDateString();
                
                if (isToday) {
                    timeDisplay.innerText = msgDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                } else {
                    timeDisplay.innerText = msgDate.toLocaleDateString([], { day: 'numeric', month: 'short' });
                }
            }
        }
    });
});