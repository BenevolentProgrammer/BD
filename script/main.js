/* ============================================================
   GLOBAL TIMELINE
============================================================ */
let tl;


/* ============================================================
   INTRO: Text sequence + Bulb reveal
============================================================ */
document.addEventListener("DOMContentLoaded", () => {

    const overlay = document.getElementById("lights-overlay");
    const introMsg = document.getElementById("intro-msg");
    const bulbBtn = document.getElementById("bulbBtn");

    // Text steps
    const steps = [
        { text: "Hey Jina...", at: 500 },
        { text: "Why is it so dark here?", at: 2500 },
        { text: "Let's turn on the lights...", at: 4500 }
    ];

    // Sequential messages
    steps.forEach((step, i) => {
        setTimeout(() => {
            introMsg.style.opacity = 0;
            introMsg.style.transform = "translateY(6px)";

            setTimeout(() => {
                introMsg.innerText = step.text;
                introMsg.style.opacity = 1;
                introMsg.style.transform = "translateY(0)";
            }, 150);

            // Show bulb after last line
            if (i === steps.length - 1) {
    setTimeout(() => {
        bulbBtn.style.display = "block";
        document.getElementById("bulb-hint").style.display = "block";
        setTimeout(() => {
            document.getElementById("bulb-hint").classList.add("show-hint");
        }, 100);
      }, 1200);
    }

        }, step.at);
    });

    // Bulb click = lights ON → show music screen
    bulbBtn.addEventListener("click", () => {

    document.getElementById("bulb-sound").play();

    bulbBtn.src = "bulb_on.png";

    // Start with hidden page for smoother fade-in
    document.body.classList.add("bg-hidden");

    // wallpapers applied
    document.body.classList.add("final-bg");
    document.documentElement.classList.add("final-bg");

    // fade overlay
    document.body.classList.add("lights-on");

    // Delay removing overlay & reveal wallpaper slowly
    setTimeout(() => {
        overlay.style.display = "none";
        document.body.classList.remove("bg-hidden");   // ← FADE IN NOW
        showMusicScreen();
    }, 1200);   // increased delay to avoid bulb overlap
   });

});



/* ============================================================
   MUSIC SCREEN
============================================================ */
function showMusicScreen() {
    const screen = document.getElementById("music-screen");
    const musicBtn = document.getElementById("musicBtn");
    const audio = document.querySelector(".song");

    screen.style.display = "flex";

    //  Show "Tap to play" text smoothly
    setTimeout(() => {
        document.getElementById("music-hint").classList.add("show-hint");
    }, 200);


    musicBtn.addEventListener("click", () => {

        audio.play().catch(() => {});

        screen.classList.add("music-hide");

        setTimeout(() => {
            screen.style.display = "none";
            animationTimeline();
        }, 700);
    });
}



/* ============================================================
   MAIN ANIMATION TIMELINE
============================================================ */
function animationTimeline() {

    const container = document.querySelector(".container");
    container.style.display = "block";

    /* Split text for typing effect */
    const textBox = document.querySelector(".hbd-chatbox");
    textBox.innerHTML = `<span>${textBox.innerText.split("").join("</span><span>")}</span>`;

    // Text transitions
    const ideaTextIn = { opacity: 0, y: -20, rotationX: 5, skewX: "15deg" };
    const ideaTextOut = { opacity: 0, y: 20, rotationY: 5, skewX: "-15deg" };

    tl = new TimelineMax();


    /* ============================
       TIMELINE FLOW
    ============================ */
    tl.to(".container", 0.6, { opacity: 1 })

      .from(".one", 0.7, { opacity: 0, y: 10 })
      .from(".two", 0.4, { opacity: 0, y: 10 })
      .to(".one", 0.7, { opacity: 0, y: 10 }, "+=3.5")
      .to(".two", 0.7, { opacity: 0, y: 10 }, "-=1")

      .from(".three", 0.7, { opacity: 0, y: 10 })
      .to(".three", 0.7, { opacity: 0, y: 10 }, "+=3")

      .from(".four", 0.7, { scale: 0.2, opacity: 0 })
      .from(".fake-btn", 0.3, { scale: 0.2, opacity: 0 })
      .staggerTo(".hbd-chatbox span", 0.5, { visibility: "visible" }, 0.1)
      .to(".fake-btn", 0.1, { backgroundColor: "rgb(127,206,248)" }, "+=1")
      .to(".four", 0.5, { scale: 0.2, opacity: 0, y: -150 }, "+=1")

      .from(".idea-1", 0.7, ideaTextIn)
      .to(".idea-1", 0.7, ideaTextOut, "+=2.5")

      .from(".idea-2", 0.7, ideaTextIn)
      .to(".idea-2", 0.7, ideaTextOut, "+=2.5")

      .from(".idea-3", 0.7, ideaTextIn)
      .to(".idea-3 strong", 0.5, {
          scale: 1.2,
          x: 10,
          backgroundColor: "rgb(21,161,237)",
          color: "#fff"
      })
      .to(".idea-3", 0.7, ideaTextOut, "+=2.5")

      .from(".idea-4", 0.7, ideaTextIn)
      .to(".idea-4", 0.7, ideaTextOut, "+=2.5")

      .from(".idea-5", 0.7, {
          rotationX: 15,
          rotationZ: -10,
          skewY: "-5deg",
          y: 50,
          opacity: 0,
      }, "+=1.5")
      .to(".idea-5 span", 0.7, { rotation: 90, x: 8 }, "+=1.4")
      .to(".idea-5", 0.7, { scale: 0.2, opacity: 0 }, "+=2")

      .staggerFrom(".idea-6 span", 0.8, {
          scale: 3,
          opacity: 0,
          rotation: 15,
      }, 0.2)
      .staggerTo(".idea-6 span", 0.8, {
          scale: 3,
          opacity: 0,
          rotation: -15,
      }, 0.2, "+=1.5")


      /* ---------------------------
         GIFT SCREEN PAUSE
      --------------------------- */
      .to({}, 0.1, {
          onComplete: () => {
              tl.pause();
              document.getElementById("gift-screen").classList.remove("hidden");
          }
      })


      /* ---------------------------
         BALLOONS
      --------------------------- */
      .staggerFromTo(".baloons img", 2.5,
        { opacity: 0.9, y: 1400 },
        { opacity: 1, y: -1000 },
      0.2)

      /* ---------------------------
         Jina Image (big)
      --------------------------- */
      .from(".profile-picture", 0.8, {
    scale: 2,
    opacity: 0,
    y: -40
     }, "-=1.5")

      /* show huge side balloons */
      .add(() => {
          document.getElementById("side-balloons").style.display = "block";
      })

      .add(() => {
    tl.pause();   // stop AFTER balloons appear

    const box = document.getElementById("cat-button-box");
    box.classList.remove("hidden");

    // fade-in cat button slowly
    setTimeout(() => box.classList.add("show"), 300);
    })

      /* ---------------------------
         End text
      --------------------------- */
      .to(".six", 0.5, { opacity: 0, y: 30 })
      .from("#end-text", 1, {
    opacity: 0,
    y: 20,
    scale: 0.9
    })

 // show guy.png AFTER the text appears
  .add(() => {
    const guy = document.getElementById("guyPic");
    guy.classList.remove("hidden");

    // small delay then fade in
    setTimeout(() => {
        guy.classList.add("show");
    }, 100);
  });


    /* ============================================================
       GIFT CLICK HANDLER
    ============================================================= */
    const giftBox = document.getElementById("giftBox");
    const flash = document.getElementById("flashbang");
    const giftScreen = document.getElementById("gift-screen");

    giftBox.addEventListener("click", () => {
        
        document.getElementById("poof-sound").play();

        flash.style.opacity = 1;

        setTimeout(() => {
            flash.style.opacity = 0;
            giftScreen.classList.add("hidden");
            tl.resume();
        }, 300);
    });

    document.getElementById("catButton").addEventListener("click", () => {

    document.getElementById("cat-button-box").classList.remove("show");

    setTimeout(() => {
        document.getElementById("cat-button-box").classList.add("hidden");
        tl.resume(); // continue to final texts
    }, 400);
   });


}
