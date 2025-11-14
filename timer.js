export default class GameTimer {
    constructor(duration, element, onEnd) {
        this.duration = duration * 1000; // Convert to ms
        this.element = element;
        this.onEnd = onEnd;

        this.startTime = 0;
        this.pauseTime = 0;
        this.isPaused = false;
        this.animationFrameId = null;
    }

    start() {
        this.startTime = performance.now();
        this.pauseTime = 0;
        this.isPaused = false;
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
        this.animationFrameId = requestAnimationFrame(this.tick.bind(this));
    }

    tick(now) {
        if (this.isPaused) return;

        const elapsed = now - this.startTime;
        const progress = Math.min(elapsed / this.duration, 1);
        
        this.element.style.transform = `scale(${progress})`;

        if (progress >= 1) {
            this.onEnd();
            // start() will be called by reset() to continue the loop
        } else {
            this.animationFrameId = requestAnimationFrame(this.tick.bind(this));
        }
    }

    reset() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
        this.element.style.transition = 'transform 0s';
        this.element.style.transform = 'scale(0)';
        // Force reflow
        this.element.offsetHeight; 
        this.element.style.transition = '';
        this.element.style.visibility = 'visible';
        this.start();
    }

    pause() {
        if (this.isPaused) return;
        this.isPaused = true;
        this.pauseTime = performance.now();
        cancelAnimationFrame(this.animationFrameId);
    }

    resume() {
        if (!this.isPaused) return;
        this.isPaused = false;
        const pauseDuration = performance.now() - this.pauseTime;
        this.startTime += pauseDuration;
        this.animationFrameId = requestAnimationFrame(this.tick.bind(this));
    }

    stop() {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
    }
}