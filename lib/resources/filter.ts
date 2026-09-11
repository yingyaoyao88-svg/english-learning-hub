import type { PriceType, Resource, ResourceCategory, ResourceLevel } from "./types";

export type ResourceFilters = { query: string; category: ResourceCategory | "all"; level: ResourceLevel | "all"; price: PriceType | "all" };

export function filterResources(resources: Resource[], filters: ResourceFilters) {
  const query = filters.query.trim().toLocaleLowerCase();
  return resources.filter((resource) => {
    const haystack = [resource.name, resource.description, ...resource.skills].join(" ").toLocaleLowerCase();
    return (!query || haystack.includes(query)) && (filters.category === "all" || resource.category === filters.category) && (filters.level === "all" || resource.level === filters.level) && (filters.price === "all" || resource.priceType === filters.price);
  });
}
