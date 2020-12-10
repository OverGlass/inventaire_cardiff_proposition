export interface IimageStock {
  stock: priceAndEntities;
  retraitemants: {
    FNP: elementData[];
    CCA: elementData[];
  };
}

export interface IimageStockFinal extends IimageStock {
  achats: elementData[];
  ventes: elementData[];
}

interface elementData {
  name: string;
  entities: number;
  priceTotal: number;
}

interface priceAndEntities {
  priceTotal: number;
  entityTotal: number;
}

export default class Inventaire {
  private image_initial: IimageStock;
  private image_final: IimageStockFinal;

  constructor(image_initial: IimageStock, image_final: IimageStockFinal) {
    this.image_initial = image_initial;
    this.image_final = image_final;
  }

  public getResults() {
    return {
      stocks: {
        initial: this.image_initial.stock,
        final: this.image_final.stock,
      },
      variationPrixStock: this.getVariationPrixStock(),
      retraitements: {
        initial: this.image_initial.retraitemants,
        final: this.image_final.retraitemants,
        result: this.getRetraitement_c(),
      },
      achats: {
        data: this.image_final.achats,
        result: this.getSumOfElements(this.image_final.achats),
      },
      ventes: {
        data: this.image_final.ventes,
        result: this.getSumOfElements(this.image_final.ventes),
      },
      finalStockValues: this.getStockFinalValues(),
      diffStockFinalCardiff: this.getDiffStockFinalCardiff(),
    };
  }

  private getVariationPrixStock(): number {
    return (
      this.image_initial.stock.priceTotal - this.image_final.stock.priceTotal
    );
  }

  private getRetraitement_c(): priceAndEntities {
    const FNP_initial = this.image_initial.retraitemants.FNP;
    const CCA_initial = this.image_initial.retraitemants.CCA;

    const FNP_final = this.image_final.retraitemants.FNP;
    const CCA_final = this.image_final.retraitemants.CCA;

    return {
      priceTotal:
        this.sumElementsPrice(CCA_initial) +
        this.sumElementsPrice(FNP_final) -
        this.sumElementsPrice(FNP_initial) -
        this.sumElementsPrice(CCA_final),
      entityTotal:
        this.sumElementsEntities(CCA_initial) +
        this.sumElementsEntities(FNP_final) -
        this.sumElementsEntities(FNP_initial) -
        this.sumElementsEntities(CCA_final),
    };
  }

  private getAchats_c(): priceAndEntities {
    return {
      priceTotal:
        this.sumElementsPrice(this.image_final.achats) +
        this.getRetraitement_c().priceTotal,
      entityTotal:
        this.sumElementsEntities(this.image_final.achats) +
        this.getRetraitement_c().entityTotal,
    };
  }

  private getStockFinalValues(): priceAndEntities {
    return {
      priceTotal:
        this.getAchats_c().priceTotal -
        this.sumElementsPrice(this.image_final.ventes) +
        this.image_initial.stock.priceTotal,
      entityTotal:
        this.getAchats_c().entityTotal -
        this.sumElementsEntities(this.image_final.ventes) +
        this.image_initial.stock.entityTotal,
    };
  }

  private getDiffStockFinalCardiff(): priceAndEntities {
    const stockFinalValues = this.getStockFinalValues();
    return {
      priceTotal:
        this.image_final.stock.priceTotal - stockFinalValues.priceTotal,
      entityTotal:
        this.image_final.stock.entityTotal - stockFinalValues.entityTotal,
    };
  }

  private getSumOfElements(data: elementData[]): priceAndEntities {
    return {
      priceTotal: this.sumElementsPrice(data),
      entityTotal: this.sumElementsEntities(data),
    };
  }

  private sumElementsPrice(data: elementData[]): number {
    return data.reduce((x, n) => x + n.priceTotal, 0);
  }

  private sumElementsEntities(data: elementData[]): number {
    return data.reduce((x, n) => x + n.entities, 0);
  }
}
