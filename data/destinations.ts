export type Destination = {
  slug: string;
  name: string;
  tagline: string;
  heroImage: string;
  cardImage: string;
};

export const destinations: Destination[] = [
  {
    slug: "beijing",
    name: "北京",
    tagline: "千年古都，现代脉搏",
    heroImage: "/images/destinations/beijing/hero.jpg",
    cardImage: "/images/destinations/beijing/card.jpg",
  },
  {
    slug: "shanghai",
    name: "上海",
    tagline: "东方明珠，摩登之城",
    heroImage: "/images/destinations/shanghai/hero.jpg",
    cardImage: "/images/destinations/shanghai/card.jpg",
  },
  {
    slug: "chengdu",
    name: "成都",
    tagline: "美食天堂，慢生活",
    heroImage: "/images/destinations/chengdu/hero.jpg",
    cardImage: "/images/destinations/chengdu/card.jpg",
  },
  {
    slug: "chongqing",
    name: "重庆",
    tagline: "山城夜景，火锅飘香",
    heroImage: "/images/destinations/chongqing/hero.jpg",
    cardImage: "/images/destinations/chongqing/card.jpg",
  },
  {
    slug: "xian",
    name: "西安",
    tagline: "兵马俑，古城墙",
    heroImage: "/images/destinations/xian/hero.jpg",
    cardImage: "/images/destinations/xian/card.jpg",
  },
  {
    slug: "hangzhou",
    name: "杭州",
    tagline: "西湖美景，龙井茶香",
    heroImage: "/images/destinations/hangzhou/hero.jpg",
    cardImage: "/images/destinations/hangzhou/card.jpg",
  },
  {
    slug: "guangzhou",
    name: "广州",
    tagline: "粤菜之乡，岭南风情",
    heroImage: "/images/destinations/guangzhou/hero.jpg",
    cardImage: "/images/destinations/guangzhou/card.jpg",
  },
  {
    slug: "xiamen",
    name: "厦门",
    tagline: "海岛风光，文艺气息",
    heroImage: "/images/destinations/xiamen/hero.jpg",
    cardImage: "/images/destinations/xiamen/card.jpg",
  },
];

export function getDestinationBySlug(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug);
}

export function getDestinationByName(name: string): Destination | undefined {
  return destinations.find((d) => d.name === name);
}
