import type { ProductData, ProductCategory } from "../products";
import { productsP1 } from "./_products_p1";
import { productsP2 } from "./_products_p2";
import { productsP3 } from "./_products_p3";

// RU products. Translated in 3 chunks (_products_p1..p3) to avoid single-stream stalls on the
// 1000-line source; assembled here in source order. Legal-operative lines carry // ВЫЧИТКА ОЛЕ:.
export const productsRu: ProductData[] = [...productsP1, ...productsP2, ...productsP3];

// Category display strings. slug + productSlugs are structural (kept from EN); name/tagline localized.
export const categoriesRu: ProductCategory[] = [
  { slug: "banking", name: "Банкинг и капитал", tagline: "Сначала банк — потом движение и защита капитала.", productSlugs: ["open-bank-account", "escrow", "factoring"] },
  { slug: "business-setup", name: "Компания и бизнес", tagline: "Компания в ОАЭ, построенная под банкабельность.", productSlugs: ["open-company"] },
  { slug: "residency-visa", name: "Резидентство и мобильность", tagline: "Резидентство, выстроенное вокруг ваших активов.", productSlugs: ["golden-visa"] },
  { slug: "assets-wealth", name: "Структурирование капитала", tagline: "Защитить, структурировать и передать созданное.", productSlugs: ["foundation", "last-will"] },
];
