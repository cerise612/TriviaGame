// questions
quiz = [
    {
        question: "The Mona Lisa (1503–06) by Leonardo da Vinci is on display in which Paris museum?",
        option1: "Louvre",
        option2: "Uffizi Gallery",
        option3: "Musée d'Orsay",
        option4: "Metropolitan Museum of Art",
        option5: "Victoria and Albert Museum",
        answer: "The Mona Lisa by Leonardo da Vinci, is housed at the Louvre in Paris France.  At 30 x 20 7/8 in the painting is smaller in person than most vistors expect. Due to this and her imense popularity getting an unobstructed view of the lady can be difficult.",
        image: "../assets/images/mona_lisa.jpg",
    },

    {
        question: "What was the surname of Edvard, the creator of The Scream, a name which also features in a well known brand of English crisps?",
        option1: "Munch",
        option2: "Bacon",
        option3: "Kubin",
        option4: "Buffet",
        option5: "Münter",
        answer: "Edvard Munch (1863-1944). Many of Munch's works depict life and death scenes, love and terror, and the feeling of loneliness. These emotions were depicted by the contrasting lines, the darker colors, blocks of color, somber tones, and a concise and exaggerated form, which depicted the darker side of the art which he was designing.",
        image: "../assets/images/munch.png",
    },
    {
        question: "Which Vincent van Gogh painting was the inspiration for the Don McLean song 'Vincent'?",
        option1: "The Starry Night",
        option2: "Irises",
        option3: "Starry Night Over the Rhône",
        option4: "Vase with Three Sunflowers",
        option5: "The Church at Auvers",
        answer: "The Starry Night (1889). Van Gogh painted the swirling, hyper real Starry Night, after committing himself to an asylum in St Remy in 1889. He wrote to Theo that he often felt the night to be “more richly coloured than the day”. He believed the souls of the dead dwelt in the heavens. “Just as we take the train to go to Tarascon or Rouen, we take death to go to a star.” But while in the asylum, he couldn’t get outside at night and so painted his Starry Night from memory.",
        image: "../assets/images/starry_night.jpg",
    },
    {
        question: "Salvador Dali provided the inspirations for the dream sequence in which Hitchcock film?",
        option1: "Spellbound",
        option2: "Vertigo",
        option3: "Marnie",
        option4: "Notorious",
        option5: "Suspicion",
        answer: "Spellbound (1945). Given the importance of the dream sequence, the director gave the artist free rein to bring to the screen an innovative vision of the way dreams could be represented.",
        image: "../assets/images/dali.png",
    },
    {
        question: "Complete the name of the world famous Greek sculpture completed in approximately 450 BC - The Diskobolus of...",
        option1: "Myron",
        option2: "Delphi",
        option3: "Megara",
        option4: "Nemea",
        option5: "Marathon",
        answer: "The Discobolus or “discus thrower” is one of the most iconic artworks of classical antiquity. Originally sculpted in bronze by an Athenian man called Myron using the lost wax casting technique, the statue has gained fame largely through its many bronze and marble copies made by the Romans. Myron captured the moment when one movement is completed and the athlete pauses for the next - he has just completed his backswing, his arm is outstretched and he is about to commence the forward swing. The work was widely admired for capturing the instability of an instant motion and combining it with a composition of balance and harmony. The statue was designed within a single plane, which means it was only meant to be seen from the sides.",
        image: "../assets/images/diskobolus.jpg",
    },
];

// load document
$(document).ready(function () {
    $("#question-page").hide();
    console.log("working");

    // title page with start button to load game
    $('#start').click(function () {
        $("#title-page").hide();
        $("#question-page").show();
    });
    
    // declared variables
    var questionNumber = 0;
    var questionBank = new Array();
    var stage = "#game1";
    var stage2 = new Object;
    var questionLock = false;
    var numberOfQuestions;
    var score = 0

    // current question array with choices answer and image
    for (i = 0; i < quiz.length; i++) {
        questionBank[i] = new Array;
        questionBank[i][0] = quiz[i].question;
        questionBank[i][1] = quiz[i].option1;
        questionBank[i][2] = quiz[i].option2;
        questionBank[i][3] = quiz[i].option3;
        questionBank[i][4] = quiz[i].option4;
        questionBank[i][5] = quiz[i].option5;
        questionBank[i][6] = quiz[i].answer;
        questionBank[i][7] = quiz[i].image;
    }
    numberOfQuestions = questionBank.length;
    console.log(questionBank + "hello")

    // dispay Question
    displayQuestion();

    // display choices in random order
    function displayQuestion() {
        var rnd = Math.random() * 5;
        rnd = Math.ceil(rnd);
        var q1;
        var q2;
        var q3;
        var q4;
        var q5;

        if (rnd == 1) { q1 = questionBank[questionNumber][1]; q2 = questionBank[questionNumber][2]; q3 = questionBank[questionNumber][3]; q4 = questionBank[questionNumber][4]; q5 = questionBank[questionNumber][5] }
        if (rnd == 2) { q2 = questionBank[questionNumber][1]; q3 = questionBank[questionNumber][2]; q4 = questionBank[questionNumber][3]; q5 = questionBank[questionNumber][4]; q1 = questionBank[questionNumber][5] }
        if (rnd == 3) { q3 = questionBank[questionNumber][1]; q4 = questionBank[questionNumber][2]; q5 = questionBank[questionNumber][3]; q1 = questionBank[questionNumber][4]; q2 = questionBank[questionNumber][5] }
        if (rnd == 4) { q4 = questionBank[questionNumber][1]; q5 = questionBank[questionNumber][2]; q1 = questionBank[questionNumber][3]; q2 = questionBank[questionNumber][4]; q3 = questionBank[questionNumber][5] }
        if (rnd == 5) { q5 = questionBank[questionNumber][1]; q1 = questionBank[questionNumber][2]; q2 = questionBank[questionNumber][3]; q3 = questionBank[questionNumber][4]; q4 = questionBank[questionNumber][5] }

        // push question and choives into html
        $(stage).append('<div class="questionText">' + questionBank[questionNumber][0] + '</div><div id="1" class="option">' + q1 + '</div><div id="2" class="option">' + q2 + '</div><div id="3" class="option">' + q3 + '</div><div id="4" class="option">' + q4 + '</div><div id="5" class="option">' + q5 + '</div>');

        // question timer 30 sec show answer if no response
        timer();

        // on click determine if answer is correct dispay response
        $('.option').click(function () {
            if (questionLock == false) {
                questionLock = true;

                //correct answer
                if (this.id == rnd) {
                    // $(stage).append('<div id="6" class="feedback1">Correct</div>');
                    $(stage).append('</div><div id="6" class="answer">' + questionBank[questionNumber][6] + '</div><div id="7" class="image">' + questionBank[questionNumber][7] + '</div>');
                    score++;
                };

                //wrong answer	
                if (this.id != rnd) {
                    // $(stage).append('<div id="6" class="feedback2">Wrong</div>');
                    $(stage).append('</div><div id="6" class="answer">' + questionBank[questionNumber][6] + '</div><div id="7" class="image">' + questionBank[questionNumber][7] + '</div>');
                };
                setTimeout(function () { changeQuestion() }, 10000);
            };
        });
    };

    //change question
    function changeQuestion() {
        questionNumber++;
        if (stage == "#game1") { stage2 = "#game1"; stage = "#game2"; }
        else { stage2 = "#game2"; stage = "#game1"; }
        if (questionNumber < numberOfQuestions) { displayQuestion(); } else { displayFinalSlide(); }
        $(stage2).animate({ "right": "+=800px" }, "slow", function () { $(stage2).css('right', '-800px'); $(stage2).empty(); });
        $(stage).animate({ "right": "+=800px" }, "slow", function () { questionLock = false; });
    };

    // timer countdown for each question auto changes to answer page when time is up 30 sec
    var count = 30;
    var counter = setInterval(timer, 1000);
    function timer() {
        count = count - 1;
        if (count <= 0) {
            clearInterval(counter);
            // if timer runs out with no selection change to answer page think this needs <img src="images/106.jpg"> to make the image appear
            $(stage).append('</div><div id="answer6" class="answer">' + questionBank[questionNumber][6] + '</div><div id="image7" class="image">' + questionBank[questionNumber][7] + '</div>');
            return;
        }
        document.getElementById("timer-box").innerHTML = "Time Remaining: " + count + " secs";
        console.log("count: " + count)
    };

    //display final slide
    function displayFinalSlide() {
        $(stage).append('<div class="questionText">You have finished the quiz!<br><br>Total questions: ' + numberOfQuestions + '<br>Correct answers: ' + score + '</div>');
    };
});