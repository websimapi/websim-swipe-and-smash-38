// ... existing code ...
        this.element.style.transform = `scale(${progress})`;

        if (progress >= 1) {
            this.onEnd();
            // start() will be called by reset() to continue the loop
// ... existing code ...
        }
    }

    hide() {
        this.element.style.visibility = 'hidden';
    }

    reset() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
// ... existing code ...

// ... existing code ...
    onTimerEnd() {
        // This now triggers the orientation change
        this.timer.hide(); // Explicitly hide the indicator first
        this.changeRequiredOrientation();
        
        // Use a microtask delay to ensure the DOM has updated before restarting the timer animation
        Promise.resolve().then(() => {
            this.timer.reset();
        });
    }

    pauseTimer() {
        this.timer.pause();
// ... existing code ...

