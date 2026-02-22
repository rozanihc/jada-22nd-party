// COUNTDOWN
const countdown = document.getElementById("countdown");
const partyDate = new Date("March 13, 2026 20:00:00").getTime();

setInterval(() => {
    const now = new Date().getTime();
    const distance = partyDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    countdown.innerHTML = days + " days until the fun begins 💿✨";
}, 1000);

// SECRET MESSAGE
function toggleSecret() {
    const msg = document.getElementById("secretMessage");
    msg.style.display = msg.style.display === "block" ? "none" : "block";
}

// FALLING HEARTS & CAKES
const heartsContainer = document.querySelector('.hearts');
const emojis = ['💗', '🎂'];

for (let i = 0; i < 15; i++) {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    heart.style.opacity = Math.random() * 0.5 + 0.5;
    heartsContainer.appendChild(heart);
}

// Check sleepover availability when user selects "Yes"
document.getElementById("sleepover").addEventListener("change", function(e) {
    if (e.target.value === "Yes, I want to stay! 🛏️") {
        const searchValue = encodeURIComponent("Yes, I want to stay! 🛏️");
        fetch(`https://sheetdb.io/api/v1/z5qcaec937nkq?search=Sleepover=${searchValue}`)
            .then(res => res.json())
            .then(data => {
                const sleeperCount = data.length;
                
                if (sleeperCount >= 5) {
                    alert('❌ Sorry! All 5 sleepover spots are taken. No more space available! 😢');
                    document.getElementById("sleepover").value = "No thanks 😴";
                }
            });
    }
});


// FORM SUBMIT
const form = document.getElementById("rsvpForm");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const attendance = document.getElementById("attendance").value;
    const allergens = document.getElementById("allergens").value;
    const song = document.getElementById("song").value;
    const sleepover = document.getElementById("sleepover").value;

    // Check sleepover count
    const searchValue = encodeURIComponent("Yes, I want to stay! 🛏️");
    fetch(`https://sheetdb.io/api/v1/z5qcaec937nkq?search=Sleepover=${searchValue}`)
        .then(res => res.json())
        .then(data => {
            const sleeperCount = data.length;

            if (sleepover === "Yes, I want to stay! 🛏️" && sleeperCount >= 5) {
                alert('❌ Sorry! All 5 sleepover spots are taken. No more space available! 😢');
                return;
            }

            // Submit RSVP
            const formData = {
                data: [{
                    Name: name,
                    Attendance: attendance,
                    Allergens: allergens,
                    Song: song,
                    Sleepover: sleepover
                }]
            };

            fetch("https://sheetdb.io/api/v1/z5qcaec937nkq", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })
            .then(res => res.json())
            .then(() => {
                let message = `💗 RSVP SENT! SEE YOU MARCH 13TH 💗`;
                if (sleepover === "Yes, I want to stay! 🛏️") {
                    message += `<br><br>🛏️ You're staying over! Please send Jada £20 via text to confirm your spot! 💰`;
                }
                document.getElementById("responseMsg").innerHTML = message;
                form.reset();
            });
        });
});
