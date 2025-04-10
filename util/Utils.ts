export class Utils {

  linkNameFormatter(name: string) {

    const clearedName = name.replace(/[ &/?!,()]/g, match => ({
      ' ': '-',
      '/': '-',
      '&': 'and'
    }[match] || ''));

    return transliterate(clearedName);
  }

  getPriceWithCurrency(price: number, currency: string) {
    let curr = 'so\'m';
    // if (currency === 'USD') {
    //   curr = 'y.e';
    // } else if (currency === 'UZS') {
    //   curr = 'so\'m';
    // }
    return `${price} ${curr}`;
  }

  generateCategoryLink(category: any) {
    const name = this.linkNameFormatter(category.title);
    return `/category/${name}--${category.id}`
  }

  getCategoryInheritance(category: any) {
    let inheritance = [category];
    if (category.parent) {
      inheritance.push(...this.getCategoryInheritance(category.parent));
    }
    return inheritance.reverse();
  }

  sortImages(images: any[]) {
    return {
      SMALL: images.filter((media: any) => media.size == 'SMALL')
      .sort((a: any, b: any) => a.orderNumber - b.orderNumber),
      MEDIUM: images.filter((media: any) => media.size == 'MEDIUM')
      .sort((a: any, b: any) => a.orderNumber - b.orderNumber),
      LARGE: images.filter((media: any) => media.size == 'LARGE')
      .sort((a: any, b: any) => a.orderNumber - b.orderNumber),
      ORIGINAL: images
      .filter((media: any) => media.size == 'ORIGINAL')
      .sort((a: any, b: any) => a.orderNumber - b.orderNumber)
    };
  }


  sortSpecifications(specifications: any) {
    let cotegoriedSpecifications: any[] = []
    specifications.forEach((spec: any) => {
      let category: any = {
        id: spec.categoryId,
        title: spec.categoryTitle,
        description: spec.categoryDescription,
        specifications: []
      }
      let index = cotegoriedSpecifications.findIndex((item: any) => item?.id == category.id)
      if (index == -1) {
        category.specifications.push(spec)
        cotegoriedSpecifications.push(category)
      } else {
        cotegoriedSpecifications[index].specifications.push(spec)
      }
    })

    return cotegoriedSpecifications
  }

  getProductOptions(specifications: any) {
    return this.sortSpecifications(specifications).filter((spec: any) => spec.specifications.length > 1)
  }

  getSingleProductOptions(specifications: any) {
    return this.sortSpecifications(specifications).filter((spec: any) => spec.specifications.length == 1)
  }
}

export const utilsInstance = new Utils();

export function useUtils() {
  return utilsInstance;
}

function transliterate(text: string): string {
  const cyrillicToLatinMap: { [key: string]: string } = {
    А: "A", Б: "B", В: "V", Г: "G", Д: "D", Е: "E", Ё: "Yo", Ж: "Zh", З: "Z",
    И: "I", Й: "Y", К: "K", Л: "L", М: "M", Н: "N", О: "O", П: "P", Р: "R",
    С: "S", Т: "T", У: "U", Ф: "F", Х: "Kh", Ц: "Ts", Ч: "Ch", Ш: "Sh", Щ: "Shch",
    Ъ: "", Ы: "Y", Ь: "", Э: "E", Ю: "Yu", Я: "Ya",
    а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "yo", ж: "zh", з: "z",
    и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r",
    с: "s", т: "t", у: "u", ф: "f", х: "kh", ц: "ts", ч: "ch", ш: "sh", щ: "shch",
    ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya"
  };

  return text.split('').map(char => cyrillicToLatinMap[char] || char).join('');
}
