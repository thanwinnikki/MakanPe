const Images = [
  { image: require("../assets/banners/steamed-chicken-rice.jpg") },
  { image: require("../assets/banners/roasted-chicken-rice.jpg") },
  { image: require("../assets/banners/white-carrot-cake.jpg") },
  { image: require("../assets/banners/black-carrot-cake.jpg") },
];

export const data = [
  {
    id: "1",
    name: "Famous Chicken Rice",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut ipsum nec lectus viverra suscipit. Cras sed mi risus. Etiam blandit justo posuere venenatis efficitur. ",
    rating: 4,
    location: {
      latitude: 1.375111791695908,
      longtitude: 103.88283908661897,
    },
    image: require("../assets/banners/famous-chicken-rice.jpg"),
    menu: [
      {
        id: "1.1",
        dish: "Steamed Chicken Rice",
        image: require("../assets/banners/steamed-chicken-rice.jpg"),
      },
      {
        id: "1.2",
        dish: "Roasted Chicken Rice",
        image: require("../assets/banners/roasted-chicken-rice.jpg"),
      },
      {
        id: "1.3",
        dish: "Half Chicken",
        image: require("../assets/banners/half-chicken.jpg"),
      },
      {
        id: "1.4",
        dish: "Chicken Rice Set",
        image: require("../assets/banners/chicken-rice-set.jpg"),
      },
    ],
  },
  {
    id: "2",
    name: "Famous Fried Carrot Cake",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut ipsum nec lectus viverra suscipit. Cras sed mi risus. Etiam blandit justo posuere venenatis efficitur.",
    rating: 4,
    location: {
      latitude: 1.3133946727105132,
      longtitude: 103.76441747710886,
    },
    image: require("../assets/banners/famous-carrot-cake.jpg"),
    menu: [
      {
        id: "2.1",
        dish: "White Carrot Cake",
        image: require("../assets/banners/white-carrot-cake.jpg"),
      },
      {
        id: "2.2",
        dish: "Black Carrot Cake",
        image: require("../assets/banners/black-carrot-cake.jpg"),
      },
      {
        id: "2.3",
        dish: "Oyster Omellete",
        image: require("../assets/banners/fried-oyster-omellete.jpg"),
      },
    ],
  },
  {
    id: "3",
    name: "Famous Western",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut ipsum nec lectus viverra suscipit. Cras sed mi risus. Etiam blandit justo posuere venenatis efficitur.",
    rating: 3,
    location: {
      latitude: 1.3342244490832438,
      longtitude: 103.73966857944478,
    },
    image: require("../assets/banners/famous-western-food.jpg"),
    menu: [
      {
        id: "3.1",
        dish: "Chicken Chop",
        image: require("../assets/banners/western-chicken-chop.jpg"),
      },
      {
        id: "3.2",
        dish: "Pork Chop",
        image: require("../assets/banners/western-pork-chop.jpg"),
      },
      {
        id: "3.3",
        dish: "Chicken Burger",
        image: require("../assets/banners/western-chicken-burger.jpg"),
      },
      {
        id: "3.4",
        dish: "Fish n Chips",
        image: require("../assets/banners/western-fish-n-chips.jpg"),
      },
      {
        id: "3.5",
        dish: "Sirloin Steak",
        image: require("../assets/banners/western-steak.jpg"),
      },
    ],
  },
  {
    id: "4",
    name: "Famous Thai",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut ipsum nec lectus viverra suscipit. Cras sed mi risus. Etiam blandit justo posuere venenatis efficitur.",
    rating: 5,
    location: {
      latitude: 1.3104186673258607,
      longtitude: 103.7948491660933,
    },
    image: require("../assets/banners/famous-thai.jpg"),
    menu: [
      {
        id: "4.1",
        dish: "Basil Fried Rice",
        image: require("../assets/banners/basil-fried-rice.jpg"),
      },
      {
        id: "4.2",
        dish: "Pad Thai Noodle",
        image: require("../assets/banners/pad-thai-noodle.jpg"),
      },
      {
        id: "4.3",
        dish: "Pineapple Fried Rice",
        image: require("../assets/banners/pineapple-fried-rice.jpg"),
      },
      {
        id: "4.4",
        dish: "Thai Chicken Basil Rice",
        image: require("../assets/banners/thai-chicken-basil-rice.jpg"),
      },
    ],
  },
  {
    id: "5",
    name: "Famous Korean",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut ipsum nec lectus viverra suscipit. Cras sed mi risus. Etiam blandit justo posuere venenatis efficitur.",
    rating: 5,
    location: {
      latitude: 1.303411809319603,
      longtitude: 103.76582482712045,
    },
    image: require("../assets/banners/korean-cuisine.jpg"),
    menu: [
      {
        id: "5.1",
        dish: "Hotplate Chicken",
        image: require("../assets/banners/korean-hotplate.jpg"),
      },
      {
        id: "5.2",
        dish: "Hotplate Saba Fish",
        image: require("../assets/banners/korean-saba-fish.jpg"),
      },
      {
        id: "5.3",
        dish: "Kimchi Fried Rice",
        image: require("../assets/banners/korean-kimchi-fried-rice.jpg"),
      },
    ],
  },
];
