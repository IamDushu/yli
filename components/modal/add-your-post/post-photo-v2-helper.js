export const defaultFilters = {
  "brightnessSlider": 100,
  "contrastSlider": 100,
  "grayscaleSlider": 0,
  "saturationSlider": 100,
  "sepiaSlider": 0,
  "hueRotateSlider": 0,
};

export const filtersList = [
  {
    name: "Original",
    id: "original",
    filters: {
      ...defaultFilters,
    }
  },
  {
    name: "Studio",
    id: "studio",
    filters: {
      ...defaultFilters,
      brightnessSlider: 100,
      grayscaleSlider: 100,
    }
  },
  {
    name: "Fever",
    id: "fever",
    filters: {
      ...defaultFilters,
      contrastSlider: 97,
      hueRotateSlider: 330,
      saturationSlider: 111,
    }
  },
  {
    name: "Old Wood",
    id: "old-wood",
    filters: {
      ...defaultFilters,
      brightnessSlider: 105,
      contrastSlider: 105,
      grayscaleSlider: 105,
      saturationSlider: 140,
    }
  },
  {
    name: "Black&White",
    id: "filter-black-and-white",
    filters: {
      ...defaultFilters,
      grayscaleSlider: 100,
      brightnessSlider: 120,
      contrastSlider: 100,
    }
  },
  {
    name: "Funky",
    id: "filter-funky",
    filters: {
      ...defaultFilters,
      hueRotateSlider:
        Math.floor(Math.random() * 360) + 1,
      contrastSlider: 120,
    }
  },
  {
    name: "Vintage",
    id: "filter-vintage",
    filters: {
      ...defaultFilters,
      brightnessSlider: 120,
      saturateSlider: 120,
      sepiaSlider: 150,
    }
  },
];
