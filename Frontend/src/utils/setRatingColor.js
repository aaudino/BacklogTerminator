function setRatingColor(rating) {
  switch (true) {
    case rating <= 50:
      return "#ff6874";
    case rating <= 75:
      return "#ffbd3f";
    case rating <= 100:
      return "#00ce7a";
    default:
  }
}

export default setRatingColor;
