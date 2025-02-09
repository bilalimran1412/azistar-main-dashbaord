(function() {
  if (typeof window !== 'undefined') {
      window.addEventListener('load', () => {
          // Retrieve the user ID from local storage
          const userId = localStorage.getItem('userId');
          console.log('User ID from local storage:', userId); // Log the stored ID

          if (userId) {
              // Create the new chatbot URL with the user ID
              const newChatbotUrl = `http://localhost:3000/livebot?userId=${encodeURIComponent(userId)}`;

              // Create the chatbot container
              const chatbotContainer = document.createElement('div');
              chatbotContainer.id = 'chatbot-container';
              document.body.appendChild(chatbotContainer);
              
              // Create the chatbot iframe
              const chatbotFrame = document.createElement('iframe');
              chatbotFrame.src = newChatbotUrl;
              chatbotFrame.style.position = 'fixed';
              chatbotFrame.style.bottom = '0';
              chatbotFrame.style.right = '0';
              chatbotFrame.style.width = '400px';
              chatbotFrame.style.height = '600px';
              chatbotFrame.style.border = 'none';
              chatbotFrame.style.zIndex = '9999'; // Ensure it is above other content
              document.getElementById('chatbot-container').appendChild(chatbotFrame);
          } else {
              console.log('No user ID found in local storage.');
          }
      });
  }
})();
