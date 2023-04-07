export interface SimpleCarEntity {
  id: string;
}

export interface CarEntity extends SimpleCarEntity {
  brand?: string;
  model?: string;
  year_of_production?: number;
}

export interface AddCarResponse {
  id: string;
  brand: string;
  model: string;
  year_of_production: number;
}
