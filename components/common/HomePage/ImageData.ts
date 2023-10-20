export type ImageObject = {
  src: string;
  id: number;
  alt: string;
};

export const CarouselImageData: ImageObject[] = [
  {
    id: 1,
    src: require("../../../assets/images/coach.png"),
    alt: "Coach",
  },
  {
    id: 2,
    src: require("../../../assets/images/dani.png"),
    alt: "Dani",
  },
  {
    id: 3,
    src: require("../../../assets/images/TeamImage.jpg"),
    alt: "Team Image",
  },
  {
    id: 4,
    src: require("../../../assets/images/training.png"),
    alt: "Training",
  },
];
