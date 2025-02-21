module.exports = {
  // ... existing config ...
  extend: {
    animation: {
      blob: "blob 7s infinite",
      float: "float 6s ease-in-out infinite",
      fadeIn: "fadeIn 1s ease-in forwards",
    },
    keyframes: {
      blob: {
        "0%": {
          transform: "translate(0px, 0px) scale(1)",
        },
        "33%": {
          transform: "translate(30px, -50px) scale(1.1)",
        },
        "66%": {
          transform: "translate(-20px, 20px) scale(0.9)",
        },
        "100%": {
          transform: "translate(0px, 0px) scale(1)",
        },
      },
      float: {
        "0%, 100%": {
          transform: "translateY(0)",
        },
        "50%": {
          transform: "translateY(-20px)",
        },
      },
      fadeIn: {
        "0%": {
          opacity: "0",
          transform: "translateY(20px)",
        },
        "100%": {
          opacity: "1",
          transform: "translateY(0)",
        },
      },
    },
  },
  // ... existing config ...
};
