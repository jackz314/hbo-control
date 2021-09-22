import uiReady from './ui-ready.js';

export function main() {
  if (document.readyState === "complete" || document.readyState === "interactive") {
      setTimeout(uiReady, 1);
  } else {
      document.addEventListener("DOMContentLoaded", uiReady);
  }
};
