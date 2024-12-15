document.addEventListener("DOMContentLoaded", () => {
    // Validate function (example: confirm before navigating)
    function validateNavigation(message, targetUrl) {
        // Ask the user for confirmation
        if (confirm(message)) {
            window.location.href = targetUrl;  // Navigate to the next page
        }
    }
    
    // Cookbook1 Page: Next and About Button
    if (document.getElementById("nextButton")) {
        document.getElementById("nextButton").addEventListener("click", function() {
            validateNavigation("Are you sure you want to go to Cookbook2?", "cookbook2.html");
        });
    }
    
    if (document.getElementById("aboutButton")) {
        document.getElementById("aboutButton").addEventListener("click", function() {
            validateNavigation("Are you sure you want to go to Cookbook3?", "cookbook3.html");
        });
    }
    
    // Cookbook2 Page: Back and Next Button
    if (document.getElementById("backButton")) {
        document.getElementById("backButton").addEventListener("click", function() {
            validateNavigation("Are you sure you want to go back to Cookbook1?", "cookbook1.html");
        });
    }
    
    if (document.getElementById("nextButton")) {
        document.getElementById("nextButton").addEventListener("click", function() {
            validateNavigation("Are you sure you want to go to Cookbook3?", "cookbook3.html");
        });
    }
    
    // Cookbook3 Page: Back and Home Button
    if (document.getElementById("backButton")) {
        document.getElementById("backButton").addEventListener("click", function() {
            validateNavigation("Are you sure you want to go back to Cookbook2?", "cookbook2.html");
        });
    }

    if (document.getElementById("homeButton")) {
        document.getElementById("homeButton").addEventListener("click", function() {
            validateNavigation("Are you sure you want to go back to the home page?", "cookbook1.html");
        });
    }
    

    const handleAudioControls = () => {
        const songSelector = document.getElementById("songSelector");
        const playButton = document.getElementById("playMusic");
        const stopButton = document.getElementById("stopMusic");
        const rewindButton = document.getElementById("rewindMusic");
        const forwardButton = document.getElementById("forwardMusic");
        const volumeUpButton = document.getElementById("volumeUp");
        const volumeDownButton = document.getElementById("volumeDown");

        const audio = new Audio(); // Single Audio object for all tracks
        audio.volume = 0.5; // Default volume
        let isPlaying = false;
        let rewindInterval, forwardInterval; // Hold intervals for rewind and forward

        // Play/Pause functionality
        playButton.addEventListener("click", async () => {
            const selectedSong = songSelector.value;

            if (!selectedSong) {
                alert("Please select a track to play!");
                return;
            }
        
            const trackPath = `${selectedSong}`;
            if (audio.src !== trackPath) {
                alert(`Attempting to play: ${trackPath}`);
                audio.src = trackPath;
            }
        
            if (isPlaying) {
                audio.pause();
                playButton.textContent = "▶"; // Reset to play symbol
                isPlaying = false;
            } else {
                try {
                    await audio.play();
                    playButton.textContent = "⏸"; // Change to pause symbol
                    isPlaying = true;
                    console.log(`Now playing: ${trackPath}`);
                } catch (error) {
                    console.error("Error playing audio:", error);
                    alert("Failed to play audio. Check the console for details.");
                }
            }
        });

        // Stop functionality
        stopButton.addEventListener("click", () => {
            audio.pause();
            audio.currentTime = 0; // Reset to the start
            isPlaying = false;
            playButton.textContent = "▶"; // Reset to play symbol
        });

        // Rewind functionality
        rewindButton.addEventListener("mousedown", () => {
            rewindInterval = setInterval(() => {
                audio.currentTime = Math.max(0, audio.currentTime - 1); // Rewind by 1 second
            }, 100);
        });
        rewindButton.addEventListener("mouseup", () => {
            clearInterval(rewindInterval);
        });

        // Forward functionality
        forwardButton.addEventListener("mousedown", () => {
            forwardInterval = setInterval(() => {
                audio.currentTime = Math.min(audio.duration, audio.currentTime + 1); // Forward by 1 second
            }, 100);
        });
        forwardButton.addEventListener("mouseup", () => {
            clearInterval(forwardInterval);
        });

        // Volume up
        volumeUpButton.addEventListener("click", () => {
            if (audio.volume < 1.0) {
                audio.volume = Math.min(1.0, audio.volume + 0.1);
                console.log(`Volume: ${audio.volume}`);
            }
        });

        // Volume down
        volumeDownButton.addEventListener("click", () => {
            if (audio.volume > 0.0) {
                audio.volume = Math.max(0.0, audio.volume - 0.1);
                console.log(`Volume: ${audio.volume}`);
            }
        });

        // Reset play button when audio ends
        audio.addEventListener("ended", () => {
            isPlaying = false;
            playButton.textContent = "▶"; // Reset to play symbol
        });
    };

    const addRecipePopups = () => {
        const recipeSections = ["snacks", "drinks", "desserts", "surprise_recipe"];
        recipeSections.forEach((id) => {
            const dropdown = document.getElementById(id);
            if (dropdown) {
                dropdown.addEventListener("change", (event) => {
                    const recipe = event.target.value;
                    const modal = document.createElement("div");
                    modal.style.position = "fixed";
                    modal.style.top = "50%";
                    modal.style.left = "50%";
                    modal.style.transform = "translate(-50%, -50%)";
                    modal.style.background = "#ffffff";
                    modal.style.border = "2px solid #808080";
                    modal.style.padding = "20px";
                    modal.style.boxShadow = "2px 2px 0 #000000";

                    modal.innerHTML = `
                        <h3>${recipe} Recipe</h3>
                        <p>Here's how you make ${recipe}. Stay tuned for more updates!</p>
                        <button onclick="this.parentElement.remove()">Close</button>
                    `;
                    document.body.appendChild(modal);
                });
            }
        });
    };

    const handleQuizFeature = () => {
        document.getElementById("submitQuiz").addEventListener("click", () => {
            const answer = document.getElementById("quizAnswer").value.toLowerCase();
            const result = document.getElementById("quizResult");
            if (answer === "pac-man") {
                result.textContent = "Correct! Pac-Man is a classic favorite. 🕹️";
                result.style.color = "#32CD32"; // Green text
            } else {
                result.textContent = "Not quite! Hint: It's an arcade classic. Try again!";
                result.style.color = "#FF4500"; // Red text
            }
        });
    };

    addNavigationButtons();
    handleAudioControls();
    addRecipePopups();
    handleQuizFeature();
});
