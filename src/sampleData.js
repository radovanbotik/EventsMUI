import dayjs from "dayjs";
export const sampleData = [
  {
    id: "1",
    title: "Trip to Prague",
    date: dayjs().toISOString(),
    tags: ["active"],
    location: {
      description: "Bratislava - Hlavná stanica, Bratislava, Slovensko",
      place_id: "ChIJiWpb2lOJbEcRyNN3sz1OPtg",
      latLng: {
        lat: 48.1586132,
        lng: 17.1060975,
      },
    },
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.",
    eventPhotoURL: "https://upload.wikimedia.org/wikipedia/commons/a/a7/Prague_%286365119737%29.jpg",
    hostedBy: "Bob",
    hostPhotoURL: "https://randomuser.me/api/portraits/men/2.jpg",
    attendees: [
      {
        id: "a",
        name: "Jeff",
        photoURL: "https://randomuser.me/api/portraits/men/10.jpg",
      },
      {
        id: "b",
        name: "Tom",
        photoURL: "https://randomuser.me/api/portraits/men/22.jpg",
      },
      {
        id: "c",
        name: "Jake",
        photoURL: "https://randomuser.me/api/portraits/men/19.jpg",
      },
    ],
  },
  {
    id: "2",
    title: "Trip to Szeged",
    date: dayjs().toISOString(),
    tags: ["family,active"],
    location: {
      description: "Trnava, Slovensko",
      place_id: "ChIJzco95mKgbEcRsPqWxtH3AAQ",
      latLng: {
        lat: 48.3709108,
        lng: 17.5833218,
      },
    },
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.",
    eventPhotoURL: "https://szegedtourism.hu/wp-content/uploads/2021/10/D%C3%B3m-t%C3%A9r-Bort%C3%A9r-_2.jpg",
    hostedBy: "Tom",
    hostPhotoURL: "https://randomuser.me/api/portraits/men/22.jpg",
    attendees: [
      {
        id: "a",
        name: "Bob",
        photoURL: "https://randomuser.me/api/portraits/men/2.jpg",
      },
      {
        id: "b",
        name: "Tom",
        photoURL: "https://randomuser.me/api/portraits/men/22.jpg",
      },
    ],
  },
];
