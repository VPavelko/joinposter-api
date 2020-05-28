type PosterColor =
    | "white"
    | "red"
    | "orange"
    | "yellow"
    | "green"
    | "blue"
    | "navy-blue"
    | "purple"
    | "black"
    | "mint-blue"
    | "lime-green"
    | "pink";
type ProductCategoryHiddenFlag = "0" | "1";

export interface GetCategoryQuery {
    category_id: number;
    "1c"?: boolean;
}

export interface Category {
    category_id: string;
    category_name: string;
    category_photo: string;
    category_photo_origin: string;
    parent_category: string;
    category_color: PosterColor;
    category_hidden: string;
    sort_order: number;
    fiscal: number;
    nodiscount: number;
    tax_id: string;
    left: number;
    right: number;
    level: number;
    category_tag: string;
    visible: { spot_id: number; visible: number }[];
    id_1c: string;
}

export interface CreateCategoryBody {
    category_name: string;
    parent_category: number;
    category_color?: PosterColor;
    category_hidden?: ProductCategoryHiddenFlag;
    tax_id?: number;
}

export interface UpdateCategoryBody {
    category_id: number;
    category_name: string;
    parent_category: number;
    category_color?: PosterColor;
    category_hidden?: ProductCategoryHiddenFlag;
    tax_id?: number;
}

export interface RemoveCategoryBody {
    category_id: number;
}

export interface Product {
    barcode: string;
    category_name: string;
    unit: string;
    cost: string;
    fiscal: string;
    hidden: string;
    menu_category_id: string;
    workshop: string;
    nodiscount: string;
    photo?: string;
    photo_origin?: string;
    price: { [key: string]: string };
    product_code: string;
    product_id: string;
    product_name: string;
    profit: { [key: string]: string };
    sort_order: string;
    tax_id: string;
    product_tax_id: string;
    type: string;
    weight_flag: string;
    color: string;
    spots: Spot[];
    ingredient_id?: string;
    cooking_time?: string;
    different_spots_prices?: string;
    out?: number;
    group_modifications?: ModificationGroup[];
    modifications?: Modificator[];
}

export interface ModificationGroup {
    dish_modification_group_id: number;
    name: string;
    num_min: number;
    num_max: number;
    is_deleted: number;
    modifications: Modification[];
}

export interface Modificator {
    modificator_id: string;
    modificator_name: string;
    modificator_selfprice: number;
    order: string;
    modificator_barcode: string;
    modificator_product_code: string;
    spots: Spot[];
    ingredient_id: string;
    fiscal_code: string;
}

export interface Spot {
    spot_id: string;
    price: string;
    profit: string;
    visible: string;
}

export interface Modification {
    dish_modification_id: number;
    name: string;
    ingredient_id: number;
    type: number;
    brutto: number;
    price: number;
    photo_orig: string;
    photo_large: string;
    photo_small: string;
    last_modified_time: string;
}

export type GetProductType = "products" | "batchtickets";

export interface GetProductsQuery {
    category_id?: number;
    type?: GetProductType;
}

export interface GetProductQuery {
    product_id: number;
}

export interface CreateProductBody {
    product_name: string;
    menu_category_id: number;
    workshop?: number;
    weight_flag: 0 | 1;
    color?: PosterColor;
    different_spots_prices: 0 | 1;
    modifications?: 0 | 1;
    modificator_names?: string[];
    barcode?: string | string[];
    product_code?: string | string[];
    cost?: number | number[];
    price?: number | number[];
    visible?: number | number[];
}

export interface CreateProductResponse {
    product_id: number;
    modifications_id?: number[];
}
