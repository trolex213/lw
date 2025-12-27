document.addEventListener("DOMContentLoaded", () => {
    // 1. Fluid Mesh Gradient Animation (The "Cool" Part)
    // We animate 5 large blobs with different timings and easing to create an ever-changing landscape
    
    const blobs = document.querySelectorAll(".blob");
    
    // Config for randomness
    const config = {
        durationMin: 15,
        durationMax: 25,
        scaleMin: 0.8,
        scaleMax: 1.4,
        moveRange: 20 // Percentage of movement
    };

    blobs.forEach((blob, i) => {
        // Give each blob a unique start position offset to avoid syncing
        const delay = i * 2;
        
        // Start independent animations for position, scale, and rotation
        animateBlob(blob, delay);
    });

    function animateBlob(element, delay) {
        // Random duration for this specific cycle
        const duration = random(config.durationMin, config.durationMax);
        
        gsap.to(element, {
            // Move randomly within a range relative to initial position
            xPercent: random(-config.moveRange, config.moveRange),
            yPercent: random(-config.moveRange, config.moveRange),
            scale: random(config.scaleMin, config.scaleMax),
            rotation: random(-180, 180),
            
            // LIQUID EFFECT: Morph the shape by animating border-radius
            borderRadius: `${random(30, 70)}% ${random(30, 70)}% ${random(30, 70)}% ${random(30, 70)}% / ${random(30, 70)}% ${random(30, 70)}% ${random(30, 70)}% ${random(30, 70)}%`,
            
            duration: duration,
            delay: delay,
            ease: "sine.inOut", // Smooth, wave-like easing
            
            // Loop effectively forever
            onComplete: () => {
                animateBlob(element, 0); // Recurse with 0 delay
            }
        });
    }

    // Interactive Parallax (Subtle)
    // Moves the entire background container slightly opposite to mouse
    document.addEventListener("mousemove", (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;

        gsap.to(".background-animation", {
            x: x,
            y: y,
            duration: 1.5,
            ease: "power2.out"
        });
    });

    // 2. Entrance Animations (Text Reveal)
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from("header", {
        y: -30,
        opacity: 0,
        duration: 1,
        delay: 0.2
    })
    .from(".container h1", {
        y: 30,
        opacity: 0,
        duration: 1,
        clearProps: "all"
    }, "-=0.8")
    .from(".container p", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        clearProps: "all"
    }, "-=0.8")
    .from(".app-store-button", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        clearProps: "all"
    }, "-=0.7")
    .from("footer", {
        opacity: 0,
        duration: 1
    }, "-=0.5");

    // Helper
    function random(min, max) {
        return Math.random() * (max - min) + min;
    }
});
