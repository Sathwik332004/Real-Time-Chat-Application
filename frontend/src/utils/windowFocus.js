class WindowFocus {
  constructor() {
    this.isWindowFocused = true;
    this.init();
  }

  init() {
    // Simple focus/blur detection
    window.addEventListener('focus', () => {
      this.isWindowFocused = true;
    });

    window.addEventListener('blur', () => {
      this.isWindowFocused = false;
    });

    // Also detect tab visibility changes
    document.addEventListener('visibilitychange', () => {
      this.isWindowFocused = !document.hidden;
    });
  }

  isFocused() {
    return this.isWindowFocused;
  }
}

export default new WindowFocus();