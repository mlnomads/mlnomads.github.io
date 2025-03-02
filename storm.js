var Sand = {
    el: "#sand",
    density: 8000, // Increased particle density
    maxHSpeed: 1.2, // Enhanced horizontal speed
    minFallSpeed: 0.4, // Enhanced falling speed
    canvas: null,
    ctx: null,
    particles: [],
    windAngle: 0,
    windForce: 0,
    colors: [
        "rgba(194, 178, 128, 0.6)", // Semi-transparent sand colors
        "rgba(228, 213, 183, 0.6)",
        "rgba(220, 208, 180, 0.6)",
        "rgba(184, 159, 122, 0.6)"
    ],
    connectionDistance: 50, // Maximum distance for particles to connect
    connectionOpacity: 0.1, // Opacity of connection lines
    gravityWaveFrequency: 0.05, // Frequency of gravity waves
    gravityWaveAmplitude: 5, // Amplitude of gravity waves
    quantumEffects: {
        superpositionChance: 0.02, // Increased chance for superposition
        maxGhosts: 5, // More ghost particles
        mergeSpeed: 0.03, // Faster merging speed
        glitchIntensity: 0.4, // Increased glitch intensity
        glitchInterval: 80, // More frequent glitches
        entanglementRadius: 40 // Larger entanglement radius
    },
    init() {
        this.canvas = document.querySelector(this.el);
        this.ctx = this.canvas.getContext("2d");
        this.reset();
        this.updateWind();
        requestAnimationFrame(this.render.bind(this));
        window.addEventListener("resize", this.reset.bind(this));
        this.entangledPairs = []; // Store pairs of entangled particles
    },
    updateWind() {
        setInterval(() => {
            // More dynamic wind changes
            this.windAngle += (Math.random() - 0.5) * 0.05;
            this.windForce = Math.sin(Date.now() / 3000) * 1; // Faster wind oscillation
        }, 300); // Reduced interval for more dynamic changes
    },
    reset() {
        this.w = window.innerWidth;
        this.h = window.innerHeight;
        this.canvas.width = this.w;
        this.canvas.height = this.h;
        this.particles = [];
        this.mp = Math.ceil(this.w * this.h / this.density);
        for (var i = 0; i < this.mp; i++) {
            var size = Math.random() * 1.2 + 1.5; // Slightly larger particles
            this.particles.push({
                x: Math.random() * this.w + this.w / 2, // x-coordinate
                y: Math.random() * this.h - this.h / 2, // y-coordinate
                w: size,
                h: size,
                vy: Math.random() * 0.5 - 0.25, // Enhanced vertical movement
                vx: (this.maxHSpeed + Math.random()) * 1, // Enhanced horizontal speed
                fill: this.colors[Math.floor(Math.random() * this.colors.length)], // random sandy color
                s: (Math.random() * 0.2) - 0.1 // Enhanced spin
            });
        }
    },
    updateQuantumState(p) {
        // Check for entanglement with nearby particles
        this.particles.forEach(other => {
            if (other !== p) {
                let dist = Math.hypot(p.x - other.x, p.y - other.y);
            }
        });
    },
    applyGlitchEffect(particle) {
        // Apply glitch effect to particle
    },
    drawConnections() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                let p1 = this.particles[i];
                let p2 = this.particles[j];
                let dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
                if (dist < this.connectionDistance) {
                    this.ctx.strokeStyle = `rgba(255, 255, 255, ${this.connectionOpacity})`;
                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    // Represent forces with varying line thickness
                    let force = (this.connectionDistance - dist) / this.connectionDistance;
                    this.ctx.lineWidth = force * 2; // Line width proportional to force
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.stroke();
                }
            }
        }
    },
    render() {
        this.ctx.clearRect(0, 0, this.w, this.h);
        this.particles.forEach((p, i) => {
            p.y += p.vy;
            p.x += p.vx + this.windForce * Math.cos(this.windAngle);
            this.ctx.fillStyle = p.fill;
            this.ctx.fillRect(p.x, p.y, p.w, p.h);
            if (p.x > this.w + 5 || p.x < -5 || p.y > this.h) {
                p.x = Math.random() * this.w + this.w / 2;
                p.y = Math.random() * this.h - this.h / 2;
            }
            // Apply glitch effect if in superposition
            if (p.inSuperposition) {
                this.applyGlitchEffect(p);
            }
        });
        this.drawConnections();
        if (this.quit) {
            return;
        }
        requestAnimationFrame(this.render.bind(this));
    },
    destroy() {
        this.quit = true;
    }
};

var confetti = Sand.init();