// States & Capitals Tutor - Version 15
// Modern web adaptation of the 1983 VIC-20 educational game

// Game state variables
let gameState = "start";  // Possible states: start, question, feedback, end
let currentQuestion = "";
let correctAnswer = "";
let feedback = "";
let currentItem = null;
let questionType = 0;
let RT = 0; // Right answers
let WR = 0; // Wrong answers
let HE = 0; // Helps used
let remainingStates = [];
let inp, btn;

// Game data - states and capitals
let data = [
  { state: "Alabama", capital: "Montgomery", asked: false },
  { state: "Alaska", capital: "Juneau", asked: false },
  { state: "Arizona", capital: "Phoenix", asked: false },
  { state: "Arkansas", capital: "Little Rock", asked: false },
  { state: "California", capital: "Sacramento", asked: false },
  { state: "Colorado", capital: "Denver", asked: false },
  { state: "Connecticut", capital: "Hartford", asked: false },
  { state: "Delaware", capital: "Dover", asked: false },
  { state: "Florida", capital: "Tallahassee", asked: false },
  { state: "Georgia", capital: "Atlanta", asked: false },
  { state: "Hawaii", capital: "Honolulu", asked: false },
  { state: "Idaho", capital: "Boise", asked: false },
  { state: "Illinois", capital: "Springfield", asked: false },
  { state: "Indiana", capital: "Indianapolis", asked: false },
  { state: "Iowa", capital: "Des Moines", asked: false },
  { state: "Kansas", capital: "Topeka", asked: false },
  { state: "Kentucky", capital: "Frankfort", asked: false },
  { state: "Louisiana", capital: "Baton Rouge", asked: false },
  { state: "Maine", capital: "Augusta", asked: false },
  { state: "Maryland", capital: "Annapolis", asked: false },
  { state: "Massachusetts", capital: "Boston", asked: false },
  { state: "Michigan", capital: "Lansing", asked: false },
  { state: "Minnesota", capital: "Saint Paul", asked: false },
  { state: "Mississippi", capital: "Jackson", asked: false },
  { state: "Missouri", capital: "Jefferson City", asked: false },
  { state: "Montana", capital: "Helena", asked: false },
  { state: "Nebraska", capital: "Lincoln", asked: false },
  { state: "Nevada", capital: "Carson City", asked: false },
  { state: "New Hampshire", capital: "Concord", asked: false },
  { state: "New Jersey", capital: "Trenton", asked: false },
  { state: "New Mexico", capital: "Santa Fe", asked: false },
  { state: "New York", capital: "Albany", asked: false },
  { state: "North Carolina", capital: "Raleigh", asked: false },
  { state: "North Dakota", capital: "Bismarck", asked: false },
  { state: "Ohio", capital: "Columbus", asked: false },
  { state: "Oklahoma", capital: "Oklahoma City", asked: false },
  { state: "Oregon", capital: "Salem", asked: false },
  { state: "Pennsylvania", capital: "Harrisburg", asked: false },
  { state: "Rhode Island", capital: "Providence", asked: false },
  { state: "South Carolina", capital: "Columbia", asked: false },
  { state: "South Dakota", capital: "Pierre", asked: false },
  { state: "Tennessee", capital: "Nashville", asked: false },
  { state: "Texas", capital: "Austin", asked: false },
  { state: "Utah", capital: "Salt Lake City", asked: false },
  { state: "Vermont", capital: "Montpelier", asked: false },
  { state: "Virginia", capital: "Richmond", asked: false },
  { state: "Washington", capital: "Olympia", asked: false },
  { state: "West Virginia", capital: "Charleston", asked: false },
  { state: "Wisconsin", capital: "Madison", asked: false },
  { state: "Wyoming", capital: "Cheyenne", asked: false }
];

// State facts database without the inappropriate jokes.
const stateFacts = {
  "Alabama": "Alabama was the birthplace of the Civil Rights movement and is home to the US Space & Rocket Center.",
  "Alaska": "The largest state by area, Alaska has more coastline than all other US states combined and experiences 24 hours of daylight in summer in some areas.",
  "Arizona": "Home to the Grand Canyon, Arizona has more mountains taller than 10,000 feet than Switzerland.",
  "Arkansas": "The Natural State is the only place in North America where diamonds are actively mined, at Crater of Diamonds State Park.",
  "California": "Home to both the highest point (Mt. Whitney) and lowest point (Death Valley) in the contiguous United States.",
  "Colorado": "Colorado has the highest mean elevation of any state, with more than 1,000 peaks over 10,000 feet high.",
  "Connecticut": "The first American cookbook was published here in 1796, and the state is home to the first public library in America.",
  "Delaware": "The first state to ratify the Constitution, Delaware has no sales tax and more businesses are incorporated here than people who live here.",
  "Florida": "No point in Florida is more than 60 miles from the ocean, and it's the only state with two rivers both named \"Withlacoochee.\"",
  "Georgia": "The state was named after King George II of England and is the largest producer of peanuts, pecans, and peaches in the country.",
  "Hawaii": "The only US state made up entirely of islands, Hawaii grows 80% of the world's macadamia nuts and has the most isolated population center on Earth.",
  "Idaho": "Famous for potatoes, Idaho also produces 72 types of precious and semi-precious stones, earning its nickname \"The Gem State.\"",
  "Illinois": "Home to the world's first skyscraper built in Chicago in 1885, and the tallest building in North America, Willis Tower.",
  "Indiana": "The Indianapolis Motor Speedway is the largest sports venue in the world, with seating for more than 250,000 spectators.",
  "Iowa": "The state produces more corn, pork, and eggs than any other state and has the highest literacy rate at 99%.",
  "Kansas": "The exact center of the contiguous United States is in Lebanon, Kansas, marked by a small monument.",
  "Kentucky": "Home to the world's longest cave system (Mammoth Cave) and produces 95% of the world's bourbon whiskey.",
  "Louisiana": "The state has the longest continuous bridge over water in the world (Lake Pontchartrain Causeway) at nearly 24 miles long.",
  "Maine": "Has 3,500 miles of coastline, more than California, and 90% of the country's lobster supply comes from Maine waters.",
  "Maryland": "The state's flag is the only US state flag based on English heraldry, and Fort McHenry inspired Francis Scott Key to write \"The Star-Spangled Banner.\"",
  "Massachusetts": "Home to the first public beach, public park, and subway system in the United States, all in Boston.",
  "Michigan": "Surrounded by four of the five Great Lakes, Michigan has the longest freshwater coastline in the world.",
  "Minnesota": "Known as the \"Land of 10,000 Lakes,\" Minnesota actually has 11,842 lakes over 10 acres in size.",
  "Mississippi": "The state is the birthplace of the blues, and was the first state to have a planned system of junior colleges.",
  "Missouri": "The ice cream cone was invented at the 1904 World's Fair in St. Louis, and the state is known as the \"Cave State\" with over 6,000 recorded caves.",
  "Montana": "Montana has more species of mammals than any other state and has the largest migratory elk herd in the nation.",
  "Nebraska": "Home to the largest hand-planted forest in the world (Nebraska National Forest) and the Ogallala Aquifer, the largest underground water reserve in the US.",
  "Nevada": "Contains the driest place in North America and is the largest gold-producing state in the nation, generating 75% of all US gold.",
  "New Hampshire": "The first free public library in the United States was established in Peterborough in 1833, and the state has no general sales tax or income tax.",
  "New Jersey": "The light bulb, phonograph, and motion picture projector were all invented by Thomas Edison in his Menlo Park laboratory.",
  "New Mexico": "Home to the oldest capital city in the US (Santa Fe, 1610), and has the highest percentage of PhD holders in the country.",
  "New York": "The Empire State is home to the largest subway system in the world with 472 stations, and New York City's Federal Reserve Bank holds $90 billion in gold reserves.",
  "North Carolina": "The state was the site of the Wright brothers' first successful airplane flight at Kitty Hawk in 1903.",
  "North Dakota": "The geographic center of North America is near Rugby, ND, and the state has the most churches per capita of any state.",
  "Ohio": "The state is the birthplace of seven US presidents and was the first to adopt a state flag that isn't rectangular.",
  "Oklahoma": "Oklahoma has the largest Native American population of any state and more man-made lakes than any other state.",
  "Oregon": "Home to the deepest lake in the US (Crater Lake at 1,943 feet deep) and the world's smallest park (Mills End Park in Portland at 2 feet across).",
  "Pennsylvania": "The state is home to the first baseball stadium, zoo, and business school in America, all established in Philadelphia.",
  "Rhode Island": "The smallest state has the longest official name: \"State of Rhode Island and Providence Plantations,\" and was the first colony to declare independence from Britain.",
  "South Carolina": "The state grows more peaches than Georgia and was the first to grow tea commercially in America.",
  "South Dakota": "Home to Mount Rushmore and Badlands National Park, the state has the world's largest indoor mountain trout fishery.",
  "Tennessee": "Has more species of trees than any other state, and Nashville's Centennial Park features the world's only full-scale replica of the Greek Parthenon.",
  "Texas": "The King Ranch is larger than the state of Rhode Island, and if Texas were a country, it would have the 10th largest economy in the world.",
  "Utah": "Has the greatest snow on earth with perfect powder for skiing, and contains five national parks, more than any state except California and Alaska.",
  "Vermont": "The state produces more maple syrup than any other state in the country and was the first state admitted to the Union after the original 13 colonies.",
  "Virginia": "Eight US presidents were born in Virginia, more than any other state, and about half of all Americans live within a 500-mile radius of the state capital.",
  "Washington": "Home to many innovative technology companies, and the state produces more apples than any other state in the country.",
  "West Virginia": "The state has the most bridges per mile of any state and was created by seceding from Virginia during the Civil War.",
  "Wisconsin": "The state produces more milk than any other and has more lakes than Minnesota with over 15,000.",
  "Wyoming": "Home to Yellowstone, the world's first national park, and has the lowest population of any state despite being the 10th largest by area."
};

function setup() {
  // Create canvas with 9:16 aspect ratio
  // If we want width = 360, then height = 360 * (16/9) = 640
  createCanvas(360, 640);
  textAlign(LEFT, TOP);
  
  // Create input field and button with proper styling
  inp = createInput('');
  inp.position(20, height - 80);
  inp.size(width - 140, 30);
  inp.style('font-size', '16px');
  inp.style('padding', '5px');
  
  btn = createButton('Start Game');
  btn.position(width/2 - 50, 320);
  btn.size(100, 40);
  btn.style('font-size', '16px');
  btn.style('cursor', 'pointer');
  btn.mousePressed(handleButton);
  
  // Initialize the game
  resetGame();
}

function draw() {
  // Light gray background with border
  background(220);
  fill(0);
  noFill();
  stroke(180);
  strokeWeight(2);
  rect(0, 0, width, height);
  fill(0);
  noStroke();
  
  // Draw different content based on game state
  if (gameState === "start") {
    drawStartScreen();
  } else if (gameState === "question") {
    drawQuestionScreen();
  } else if (gameState === "feedback") {
    drawFeedbackScreen();
  } else if (gameState === "end") {
    drawEndScreen();
  }
}

function drawStartScreen() {
  // Title - make sure it fits within the width
  textSize(34);
  textAlign(LEFT, TOP);
  text("States & Capitals", 20, 40);
  text("Tutor", 20, 90);
  
  // Instructions
  textSize(20);
  text("Learn all 50 US state capitals with this educational game.", 20, 170, width - 40);
  text("Type your answer or 'help' if you don't know.", 20, 260);
  text("Press the button below to begin.", 20, 340);
  
  // Button is positioned in setup
  inp.hide();
}

function drawQuestionScreen() {
  // Clear spacing at the top
  let yPosition = 40;
  
  // Question display with plenty of space
  textSize(32);
  text(currentQuestion, 20, yPosition, width - 40);
  
  // Empty space in the middle for user to focus on question
  
  // Score display - positioned at bottom with good spacing
  textSize(18);
  text(`Score: ${RT} Right, ${WR} Wrong, ${HE} Helps`, 20, height - 120);
  
  // Show input and button
  inp.show();
  btn.html('Submit');
  btn.position(inp.x + inp.width + 10, inp.y);
}

function drawFeedbackScreen() {
  // Question display at top
  textSize(28);
  text(currentQuestion, 20, 40, width - 40);
  
  // Spacing between sections - take advantage of taller screen
  let yPosition = 180;
  
  // Feedback message with good spacing
  textSize(24);
  text(feedback.split('\n')[0], 20, yPosition, width - 40); // "Computer says yes/no"
  yPosition += 60;
  text(feedback.split('\n')[1], 20, yPosition, width - 40); // "That's Correct!" message
  yPosition += 100;
  
  // State fact (if answer was correct)
  if (feedback.includes("Computer says yes")) {
    textSize(18);
    text("State Fact:", 20, yPosition, width - 40);
    yPosition += 40;
    // Use the taller screen for better text wrapping
    text(stateFacts[currentItem.state], 20, yPosition, width - 40, 220);
  }
  
  // Score display at bottom
  textSize(18);
  text(`Score: ${RT} Right, ${WR} Wrong, ${HE} Helps`, 20, height - 120);
  
  // Show button, hide input
  inp.hide();
  btn.html('Continue');
  btn.position(width/2 - 50, height - 80);
}

function drawEndScreen() {
  // Title with good spacing
  textSize(36);
  text("Game Complete!", 20, 40);
  
  // Add space between sections - take advantage of taller screen
  let yPosition = 140;
  
  textSize(24);
  if (WR + HE === 0) {
    text("YOU DID IT!!!!!", 20, yPosition);
    yPosition += 60;
    text("A PERFECT SCORE", 20, yPosition, width - 40);
    yPosition += 50;
    text("AND I DIDN'T", 20, yPosition, width - 40);
    yPosition += 50;
    text("HELP YOU.", 20, yPosition, width - 40);
  } else {
    text(`Final Score:`, 20, yPosition, width - 40);
    yPosition += 60;
    text(`${RT} Right`, 20, yPosition, width - 40);
    yPosition += 50;
    text(`${WR} Wrong`, 20, yPosition, width - 40);
    yPosition += 50;
    text(`${HE} Helps`, 20, yPosition, width - 40);
    yPosition += 80;
    text("THAT'S ALL. BUT NOT ALL", 20, yPosition, width - 40);
    yPosition += 50;
    text("YOUR ANSWERS WERE", 20, yPosition, width - 40);
    yPosition += 50;
    text("CORRECT OR I HAD TO", 20, yPosition, width - 40);
    yPosition += 50;
    text("HELP YOU.", 20, yPosition, width - 40);
  }
  
  // Position and show the button with good spacing
  btn.html('Play Again');
  btn.position(width/2 - 50, height - 80);
  inp.hide();
}

function handleButton() {
  if (gameState === "start") {
    // Start the game when button is clicked on start screen
    gameState = "question";
    nextQuestion();
  } else if (gameState === "question") {
    // Process the answer when button is clicked on question screen
    checkAnswer();
  } else if (gameState === "feedback") {
    // Move to next question after feedback
    if (remainingStates.length > 0) {
      gameState = "question";
      nextQuestion();
    } else {
      gameState = "end";
    }
  } else if (gameState === "end") {
    // Reset the game when button is clicked on end screen
    resetGame();
    gameState = "start";
  }
}

function checkAnswer() {
  // Get the trimmed, case-insensitive answer
  let userAnswer = inp.value().trim();
  
  // Check if answer is empty
  if (userAnswer === "") return;
  
  if (userAnswer.toLowerCase() === "help") {
    // Player asked for help
    HE++;
    feedback = `The answer is:\n${correctAnswer}`;
    gameState = "feedback";
  } else if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
    // Correct answer
    RT++;
    
    // Customize feedback based on question type
    if (questionType === 0) {
      // "What is the capital of [State]?" question
      feedback = `Computer says yes\nThat's Correct! The capital of ${currentItem.state} is ${currentItem.capital}`;
    } else {
      // "[Capital] is the capital of what state?" question
      feedback = `Computer says yes\nThat's Correct! ${currentItem.capital} is the capital of ${currentItem.state}`;
    }
    
    gameState = "feedback";
    
    // Remove the correctly answered item from remaining states
    const index = remainingStates.findIndex(item => 
      item.state === currentItem.state && item.capital === currentItem.capital);
    if (index !== -1) {
      remainingStates.splice(index, 1);
    }
  } else {
    // Wrong answer
    WR++;
    feedback = `Computer says no\nSorry, the correct answer is: ${correctAnswer}`;
    gameState = "feedback";
  }
  
  // Clear the input field
  inp.value('');
}

function nextQuestion() {
  // Choose a random state from the remaining ones
  let index = floor(random(remainingStates.length));
  currentItem = remainingStates[index];
  
  // Randomly pick question type
  questionType = floor(random(2));
  
  if (questionType === 0) {
    // Ask for the capital
    currentQuestion = `What is the capital of ${currentItem.state}?`;
    correctAnswer = currentItem.capital;
  } else {
    // Ask for the state
    currentQuestion = `${currentItem.capital} is the capital of what state?`;
    correctAnswer = currentItem.state;
  }
}

function resetGame() {
  // Reset score counters
  RT = 0;
  WR = 0;
  HE = 0;
  
  // Reset all states to not asked
  for (let i = 0; i < data.length; i++) {
    data[i].asked = false;
  }
  
  // Create a fresh pool of states to ask about
  remainingStates = data.slice();
  
  // Set initial game state
  gameState = "start";
  feedback = "";
}

function keyPressed() {
  // When Enter key is pressed, act as if button was clicked
  if (keyCode === ENTER) {
    if (gameState === "question") {
      checkAnswer();
    } else if (gameState === "feedback") {
      if (remainingStates.length > 0) {
        gameState = "question";
        nextQuestion();
      } else {
        gameState = "end";
      }
    }
  }
}
