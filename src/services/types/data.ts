export type TIngredient = {
    _id: string;
    name: string;
    type: string;
    proteins:number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
    key: string;
};

export type TOrder = {
    createdAt: string;
    ingredients: string[];
    name: string;
    number: number;
    owner: string;
    status: string;
    updatedAt: string;
    _id: string;
    __v: number;
};

export type TImages = {
    images: string;
    name: string;
};

export type TIngredientsData = {
    ingredientsData: TIngredient[];
    _id: string;
    image: string;
    name: string;
    price: number;
};

export type TOrders = {
    orders: TOrder[];
    success: boolean;
    total: number;
    totalToday: number;
};

export type TUser = {
    accessToken: string;
    refreshToken: string;
    user: {
        email: string;
        name: string;
        password: string;
    };
};

export type TUserUpdate = {
    success: boolean;
    user: {
        email: string;
        name: string;
    };
};

export type TForm = {
    name?: string,
    password: string,
    email: string,
    token?: string
};
