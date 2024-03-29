let deferredPrompt;
const btnAdd = "";

    window.addEventListener('beforeinstallprompt', function(e) {
      e.preventDefault(); // Prevent Chrome 67 and earlier from automatically showing the prompt
      deferredPrompt = e // Stash the event so it can be triggered later.
    });

    
    this.addEventListener('click', (e) => {
      // hide our user interface that shows our A2HS button
      btnAdd.style.display = 'none';
      // Show the prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice
        .then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
          } else {
            console.log('User dismissed the A2HS prompt');
          }
          deferredPrompt = null;
        });
    });
  