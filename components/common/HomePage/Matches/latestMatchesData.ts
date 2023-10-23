import { ImageSourcePropType } from "react-native";

export interface MatchResults {
  id: number;
  date: string;
  homeTeam: {
    name: string;
    src: ImageSourcePropType;
  };
  awayTeam: {
    name: string;
    src: ImageSourcePropType;
  };
  result: string;
}
export const LatestMatchesData: MatchResults[] = [
  {
    id: 1,
    date: "10/01",
    homeTeam: {
      name: "FC Aura",
      src: require("../../../../assets/images/FCAURA-Logo.png"),
    },
    awayTeam: {
      name: "Stockholm United FC",
      src: require("../../../../assets/images/stockholmunited.jpg"),
    },
    result: "1-4",
  },
  {
    id: 2,
    date: "09/24",
    homeTeam: {
      name: "FC Aura",
      src: require("../../../../assets/images/FCAURA-Logo.png"),
    },
    awayTeam: {
      name: "Autobahn FC",
      src: require("../../../../assets/images/AutobahnFC.jpg"),
    },
    result: "4-5",
  },
  {
    id: 3,
    date: "09/17",
    homeTeam: {
      name: "FC Aura",
      src: require("../../../../assets/images/FCAURA-Logo.png"),
    },
    awayTeam: {
      name: "Pro Clubs United",
      src: require("../../../../assets/images/ProClubsUnited.jpg"),
    },
    result: "3-2",
  },
  {
    id: 4,
    date: "09/10",
    homeTeam: {
      name: "FC Aura",
      src: require("../../../../assets/images/FCAURA-Logo.png"),
    },
    awayTeam: {
      name: "Skummis FC",
      src: require("../../../../assets/images/SkummisFC.jpg"),
    },
    result: "2-1",
  },
  {
    id: 5,
    date: "08/27",
    homeTeam: {
      name: "FC Aura",
      src: require("../../../../assets/images/FCAURA-Logo.png"),
    },
    awayTeam: {
      name: "Stockholm United",
      src: require("../../../../assets/images/stockholmunited.jpg"),
    },
    result: "3-1",
  },
  {
    id: 6,
    date: "08/20",
    homeTeam: {
      name: "FC Aura",
      src: require("../../../../assets/images/FCAURA-Logo.png"),
    },
    awayTeam: {
      name: "Autobahn FC",
      src: require("../../../../assets/images/AutobahnFC.jpg"),
    },
    result: "1-5",
  },
  {
    id: 7,
    date: "08/13",
    homeTeam: {
      name: "FC Aura",
      src: require("../../../../assets/images/FCAURA-Logo.png"),
    },
    awayTeam: {
      name: "Pro Clubs United",
      src: require("../../../../assets/images/ProClubsUnited.jpg"),
    },
    result: "0-2",
  },
  {
    id: 8,
    date: "06/18",
    homeTeam: {
      name: "FC Aura",
      src: require("../../../../assets/images/FCAURA-Logo.png"),
    },
    awayTeam: {
      name: "Stockholm United",
      src: require("../../../../assets/images/stockholmunited.jpg"),
    },
    result: "0-1",
  },
  {
    id: 9,
    date: "06/11",
    homeTeam: {
      name: "FC Aura",
      src: require("../../../../assets/images/FCAURA-Logo.png"),
    },
    awayTeam: {
      name: "Skummis FC",
      src: require("../../../../assets/images/SkummisFC.jpg"),
    },
    result: "1-3",
  },
  {
    id: 10,
    date: "06/04",
    homeTeam: {
      name: "FC Aura",
      src: require("../../../../assets/images/FCAURA-Logo.png"),
    },
    awayTeam: {
      name: "Stockholm United FC",
      src: require("../../../../assets/images/stockholmunited.jpg"),
    },
    result: "1-2",
  },
  {
    id: 11,
    date: "05/28",
    homeTeam: {
      name: "FC Aura",
      src: require("../../../../assets/images/FCAURA-Logo.png"),
    },
    awayTeam: {
      name: "Autobahn FC",
      src: require("../../../../assets/images/AutobahnFC.jpg"),
    },
    result: "1-3",
  },
  {
    id: 12,
    date: "05/21",
    homeTeam: {
      name: "FC Aura",
      src: require("../../../../assets/images/FCAURA-Logo.png"),
    },
    awayTeam: {
      name: "Pro Clubs United",
      src: require("../../../../assets/images/ProClubsUnited.jpg"),
    },
    result: "5-0",
  },
  {
    id: 13,
    date: "05/14",
    homeTeam: {
      name: "FC Aura",
      src: require("../../../../assets/images/FCAURA-Logo.png"),
    },
    awayTeam: {
      name: "IFK MATADORERNA",
      src: require("../../../../assets/images/IFKMATADORERNA.jpg"),
    },
    result: "1-1",
  },
  {
    id: 14,
    date: "05/14",
    homeTeam: {
      name: "FC Aura",
      src: require("../../../../assets/images/FCAURA-Logo.png"),
    },
    awayTeam: {
      name: "Skummis FC",
      src: require("../../../../assets/images/SkummisFC.jpg"),
    },
    result: "1-2",
  },
];
