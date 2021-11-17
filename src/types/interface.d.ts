interface TSwiper {
  id: number;
  image: string;
}

interface TCategory {
  code: number;
  sort: number;
  name: string;
  icon: string;
  titleImage: string;
  children: Array<TSubCategory>;
}

interface TSubCategory {
  code: number;
  sort: number;
  name: string;
  parentCode: number;
}

interface TProductList {
  code: string;
  name: string;
  image: string;
  price: number;
  originPrice: number;
  label: string;
  inventory: number;
  soldNum: number;
  promotion: string;
  promotionTag: string;
  promotionTitle: string;
  sort: number;
}

interface TProductDetail {
  code: string;
  name: string;
  shopImages: Array<string>;
  price: number;
  originPrice: number;
  label: string;
  inventory: number;
  soldNum: number;
  promotion: string;
  promotionTag: string;
  promotionTitle: string;
  properties: Record<string, any>;
  detailImages: Array<string>;
  pintuanmsg: string;
  cartMsg: string;
}

interface TCartData extends TProductList{
  count: number;
  checked: boolean;
}
