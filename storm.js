var Sand = {
    el: "#sand",
    density: window.innerWidth <= 768 ? 20000 : 8000,
    maxHSpeed: 1.2,
    canvas: null,
    ctx: null,
    particles: [],
    windAngle: 0,
    windForce: 0,
    paused: false,
    colors: [
        "rgba(194, 178, 128, 0.6)",
        "rgba(228, 213, 183, 0.6)",
        "rgba(220, 208, 180, 0.6)",
        "rgba(184, 159, 122, 0.6)"
    ],
    connectionDistance: 50,
    connectionOpacity: 0.1,
    init() {
        this.canvas = document.querySelector(this.el);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext("2d");
        this.reset();
        this.updateWind();
        requestAnimationFrame(this.render.bind(this));
        window.addEventListener("resize", this.reset.bind(this));

        // Pause when not visible (performance)
        document.addEventListener("visibilitychange", () => {
            this.paused = document.hidden;
            if (!this.paused && !this.quit) {
                requestAnimationFrame(this.render.bind(this));
            }
        });

        // Pause when scrolled past hero
        var heroEl = document.querySelector('.hero-sec');
        if (heroEl && 'IntersectionObserver' in window) {
            new IntersectionObserver((entries) => {
                this.paused = !entries[0].isIntersecting;
                if (!this.paused && !this.quit) {
                    requestAnimationFrame(this.render.bind(this));
                }
            }, { threshold: 0 }).observe(heroEl);
        }
    },
    updateWind() {
        setInterval(() => {
            this.windAngle += (Math.random() - 0.5) * 0.05;
            this.windForce = Math.sin(Date.now() / 3000) * 1;
        }, 300);
    },
    reset() {
        this.w = window.innerWidth;
        this.h = window.innerHeight;
        this.canvas.width = this.w;
        this.canvas.height = this.h;
        this.particles = [];
        this.mp = Math.ceil(this.w * this.h / this.density);
        for (var i = 0; i < this.mp; i++) {
            var size = Math.random() * 1.2 + 1.5;
            this.particles.push({
                x: Math.random() * this.w + this.w / 2,
                y: Math.random() * this.h - this.h / 2,
                w: size,
                h: size,
                vy: Math.random() * 0.5 - 0.25,
                vx: (this.maxHSpeed + Math.random()) * 1,
                fill: this.colors[Math.floor(Math.random() * this.colors.length)],
                s: (Math.random() * 0.2) - 0.1
            });
        }
    },
    drawConnections() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                let p1 = this.particles[i];
                let p2 = this.particles[j];
                let dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
                if (dist < this.connectionDistance) {
                    let force = (this.connectionDistance - dist) / this.connectionDistance;
                    this.ctx.strokeStyle = "rgba(255, 255, 255, " + this.connectionOpacity + ")";
                    this.ctx.lineWidth = force * 2;
                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.stroke();
                }
            }
        }
    },
    render() {
        if (this.quit || this.paused) return;

        this.ctx.clearRect(0, 0, this.w, this.h);
        this.particles.forEach((p) => {
            p.y += p.vy;
            p.x += p.vx + this.windForce * Math.cos(this.windAngle);
            this.ctx.fillStyle = p.fill;
            this.ctx.fillRect(p.x, p.y, p.w, p.h);
            if (p.x > this.w + 5 || p.x < -5 || p.y > this.h) {
                p.x = Math.random() * this.w + this.w / 2;
                p.y = Math.random() * this.h - this.h / 2;
            }
        });
        this.drawConnections();
        requestAnimationFrame(this.render.bind(this));
    },
    destroy() {
        this.quit = true;
    }
};

Sand.init();
