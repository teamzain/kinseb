"use client";

// Ultra-light page transition component
// No animations, no delays, just immediate content display
export default function PageWithTransition({ children }) {
  return (
    <>
      {children}
    </>
  );
}