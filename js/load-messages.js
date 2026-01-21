document.addEventListener('DOMContentLoaded', () => {
    // List of teachers you have cards for
    const teachers = ["Ronald Richards", "Devon Lane"];

    teachers.forEach(name => {
        const storageKey = `chat_${name}`;
        const history = JSON.parse(localStorage.getItem(storageKey)) || [];

        if (history.length > 0) {
            // Get the very last message in the array
            const last_message = history[history.length - 1];
            
            // Display the message
            const message_preview = document.getElementById(`msg-${name}`);
            if (message_preview) {
                const sender = last_message.sender === 'me' ? "You: " : "";
                message_preview.innerText = sender + last_message.text;
            }

            // Display the time
            const time_display = document.getElementById(`time-${name}`);
            if (time_display) {
                const messsage_date = new Date(last_message.timestamp);
                
                // If it was today, show time. If older, show date
                const today = new Date().toDateString() === messsage_date.toDateString();
                
                if (today) {
                    time_display.innerText = messsage_date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                } else {
                    time_display.innerText = messsage_date.toLocaleDateString([], { day: 'numeric', month: 'short' });
                }
            }
        }
    });
});