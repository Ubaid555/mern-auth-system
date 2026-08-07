const listeners = new Set();

export const authEvents = {
  subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  emit(event) {
    listeners.forEach((listener) => {
      try {
        listener(event);
      } catch (err) {
        console.error("Error in authEvents listener:", err);
      }
    });
  },
};
