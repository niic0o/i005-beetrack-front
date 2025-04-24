import { QueryParams } from "@/types/utilsAppTypes";

export const buildUrl = (baseUrl: string, params: QueryParams): string => {
  const url = new URL(baseUrl);
  
  const normalizedPathname = url.pathname.replace(/\/+$/, ''); // Elimina barras finales
  
  if (params.resource) {
    url.pathname = `${normalizedPathname}/${params.resource}`;
  } else {
    url.pathname = normalizedPathname; // Mantiene el pathname sin barras duplicadas
  }

  Object.entries(params)
    .filter(([key, value]) => value !== undefined && value !== '' && key !== 'resource')
    .forEach(([key, value]) => {
      url.searchParams.set(key, value.toString());
    });

  return url.toString();
};