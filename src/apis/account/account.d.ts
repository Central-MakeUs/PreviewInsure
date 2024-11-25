export interface UserInfoResponse {
  accountId: number;
  email: string;
  age: string;
  gender: string;
}

export interface InsueItem {
  accountInsuranceId: number;
  insuranceType: string;
  insuranceCompany: string;
  insuranceImage: String;
}

export interface PatchInsueRequest {
  accountInsuranceId: number;
  insuranceType: string;
  insuranceCompany: string;
}

export interface PostFavoritRequest {
  insuranceType: string;
}
export interface PostFavoritResponse {
  code: number;
  message: string;
}

export interface FavoritItem {
  favoriteInsuranceId: number;
  insuranceType: string;
}

export interface DeleteFavoritRequest {
  favoriteInsuranceId: number;
}
