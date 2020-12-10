import type { IimageStock, IimageStockFinal } from "./Inventaire.ts";
import Inventaire from "./Inventaire.ts";

const image_initial: IimageStock = {
  stock: {
    priceTotal: 6671124.13,
    entityTotal: 519,
  },
  retraitemants: {
    FNP: [
      { name: "607227 fnp", entities: 81, priceTotal: 1136638.76 },
      { name: "607605 fnp", entities: 0, priceTotal: 0 },
      { name: "607705 fnp", entities: 0, priceTotal: 0 },
    ],
    CCA: [
      { name: "607227 cca", entities: 112, priceTotal: 1562475.39 },
      { name: "607605 cca", entities: 0, priceTotal: 0 },
      { name: "607705 cca", entities: 0, priceTotal: 0 },
    ],
  },
};

const image_final: IimageStockFinal = {
  stock: {
    priceTotal: 6321933.0,
    entityTotal: 506,
  },
  retraitemants: {
    FNP: [
      { name: "607227 fnp", entities: 30, priceTotal: 314775.0 },
      { name: "607605 fnp", entities: 0, priceTotal: 0 },
      { name: "607705 fnp", entities: 0, priceTotal: 0 },
    ],
    CCA: [
      { name: "607227 cca", entities: 219, priceTotal: 2790081.46 },
      { name: "607605 cca", entities: 1, priceTotal: 17100.0 },
      { name: "607705 cca", entities: 0, priceTotal: 0 },
    ],
  },

  achats: [
    {
      name: "607227 vehicules soumis : achats",
      entities: 158,
      priceTotal: 2546944.25,
    },
    {
      name: "607605 vehicules tva / marge : achats",
      entities: 3,
      priceTotal: 29690.0,
    },
    {
      name: "607705 vehicules intra : achats",
      entities: 644,
      priceTotal: 8160649.02,
    },
  ],
  ventes: [
    {
      name: "707605 vehicules tva/marge",
      entities: 2,
      priceTotal: 12590.0,
    },
    {
      name: "707227 vehicules soumis : ventes",
      entities: 643,
      priceTotal: 8664447.57,
    },
    {
      name: "707900 vehicules intra : ventes",
      entities: 0,
      priceTotal: 0,
    },
  ],
};

const inventaire = new Inventaire(image_initial, image_final);

console.log(inventaire.getResults());
