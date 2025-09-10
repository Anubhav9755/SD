/* ==============================
   Language Popup & Login Logic
   ============================== */

// Show language popup when page loads
window.onload = function () {
  // Show popup only on index.html
  if (window.location.pathname.includes("index.html")) {
    document.getElementById("languagePopup").style.display = "flex";
  }

  // If result page, display quiz result
  if (window.location.pathname.includes("result.html")) {
    const resultData = JSON.parse(localStorage.getItem("quizResult"));
    if (resultData) {
      document.getElementById("resultsBox").innerHTML = resultData.recommendation;
    } else {
      document.getElementById("resultsBox").innerHTML =
        "<p>No quiz data found. Please take the quiz first.</p>";
    }
  }

  // If quiz page, dynamically load questions
  if (window.location.pathname.includes("quiz.html")) {
    loadQuizQuestions();
  }
};

// Handle language selection
function selectLanguage() {
  const selectedLang = document.getElementById("languageSelector").value;
  localStorage.setItem("selectedLanguage", selectedLang);
  document.getElementById("languagePopup").style.display = "none";
  alert("Language selected: " + selectedLang);
}

// Toggle password visibility
function togglePassword() {
  const passwordInput = document.getElementById("password");
  passwordInput.type =
    passwordInput.type === "password" ? "text" : "password";
}

// Page navigation
function navigate(page) {
  window.location.href = page;
}

/* ==============================
   Career Assessment Quiz Logic
   ============================== */

// 25 Questions: 10 Math, 10 Science, 5 Aptitude
const questions = [
  // MATH - 10
  { q: "What is 15 + 28?", options: ["43", "44", "45", "46"], answer: "43" },
  { q: "Square root of 144?", options: ["10", "12", "14", "16"], answer: "12" },
  { q: "If a train runs at 60km/hr for 2 hours, distance covered?", options: ["100km", "120km", "110km", "90km"], answer: "120km" },
  { q: "Simplify: 12 × 8 ÷ 4", options: ["22", "20", "24", "18"], answer: "24" },
  { q: "Solve: (25% of 200)", options: ["25", "50", "75", "100"], answer: "50" },
  { q: "The perimeter of a square with side 8cm?", options: ["16cm", "24cm", "32cm", "36cm"], answer: "32cm" },
  { q: "The average of 10, 20, 30 is?", options: ["15", "20", "25", "30"], answer: "20" },
  { q: "Ratio of 2:3 is equivalent to?", options: ["4:6", "6:8", "3:5", "5:7"], answer: "4:6" },
  { q: "HCF of 12 and 18?", options: ["4", "6", "8", "12"], answer: "6" },
  { q: "LCM of 5 and 15?", options: ["10", "15", "20", "30"], answer: "15" },

  // SCIENCE - 10
  { q: "What is the chemical symbol of water?", options: ["H2", "O2", "H2O", "CO2"], answer: "H2O" },
  { q: "Earth revolves around?", options: ["Moon", "Sun", "Mars", "Venus"], answer: "Sun" },
  { q: "The gas used by plants for photosynthesis?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], answer: "Carbon Dioxide" },
  { q: "Which vitamin is known as 'Sunshine Vitamin'?", options: ["A", "B", "C", "D"], answer: "D" },
  { q: "Which planet is called the Red Planet?", options: ["Earth", "Mars", "Venus", "Jupiter"], answer: "Mars" },
  { q: "Boiling point of water at sea level?", options: ["90°C", "100°C", "110°C", "120°C"], answer: "100°C" },
  { q: "Which organ purifies blood in humans?", options: ["Heart", "Kidney", "Lungs", "Liver"], answer: "Kidney" },
  { q: "Smallest unit of life?", options: ["Cell", "Atom", "Molecule", "Tissue"], answer: "Cell" },
  { q: "Study of plants is called?", options: ["Zoology", "Botany", "Biology", "Physics"], answer: "Botany" },
  { q: "Electric current is measured in?", options: ["Volt", "Ampere", "Ohm", "Watt"], answer: "Ampere" },

  // APTITUDE - 5
  { q: "If CAT = 24, DOG = ?", options: ["22", "26", "28", "30"], answer: "26" },
  { q: "Find the odd one out: Apple, Mango, Banana, Potato", options: ["Apple", "Banana", "Potato", "Mango"], answer: "Potato" },
  { q: "If 8 workers finish work in 12 days, 4 workers will finish in?", options: ["24", "22", "20", "18"], answer: "24" },
  { q: "Opposite of 'Expand'?", options: ["Enlarge", "Compress", "Increase", "Extend"], answer: "Compress" },
  { q: "Next number in series: 2, 4, 8, 16, ?", options: ["18", "24", "32", "20"], answer: "32" }
];

/* Load Quiz Dynamically */
function loadQuizQuestions() {
  const quizContainer = document.getElementById("quizContainer");
  quizContainer.innerHTML = "";

  questions.forEach((q, index) => {
    let block = `
      <div class="question-block">
        <p>Q${index + 1}. ${q.q}</p>
        ${q.options
          .map(
            (opt) => `
          <label>
            <input type="radio" name="q${index}" value="${opt}"> ${opt}
          </label>
        `
          )
          .join("")}
      </div>
    `;
    quizContainer.innerHTML += block;
  });
}

/* Submit Quiz & Calculate Result */
function submitQuiz() {
  let score = 0;

  questions.forEach((q, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    if (selected && selected.value === q.answer) {
      score++;
    }
  });

  let recommendation = "";

  if (score >= 20) {
    recommendation = `
      <h3>Recommended Stream: Science</h3>
      <p>You scored ${score}/25. Strong logical and scientific skills.</p>
      <p>Consider degrees like B.Tech, MBBS, or B.Sc.</p>
    `;
  } else if (score >= 15) {
    recommendation = `
      <h3>Recommended Stream: Commerce</h3>
      <p>You scored ${score}/25. Good analytical and business-oriented thinking.</p>
      <p>Consider B.Com, BBA, CA, or Management courses.</p>
    `;
  } else {
    recommendation = `
      <h3>Recommended Stream: Arts</h3>
      <p>You scored ${score}/25. Creative and social aptitude detected.</p>
      <p>Consider BA, Mass Communication, or Fine Arts.</p>
    `;
  }

  // Store result in localStorage
  localStorage.setItem("quizResult", JSON.stringify({ score, recommendation }));

  // Redirect to result page
  navigate("result.html");
}
