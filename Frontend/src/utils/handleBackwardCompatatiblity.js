const handleBackwardCompatatiblity = (platforms) => {
  platforms.forEach((platform) => {
    if (
      platform.includes("Xbox") &&
      platform !== "Xbox Series X/S" &&
      platforms.includes("Xbox Series X/S") === false
    ) {
      platforms.push("Xbox Series X/S");
    }
    if (
      platform.includes("PlayStation") &&
      platform === "PlayStation 4" &&
      platforms.includes("PlayStation 5") === false
    ) {
      platforms.push("PlayStation 5");
    }

    if (platform.includes("PC")) {
      platforms.push("Steam Deck");
      platforms.push("ROG Ally");
    }
  });
};

export default handleBackwardCompatatiblity;
