/**
 * Filter Utilities - Helper functions để build API filters
 */

export interface FilterCondition {
  field: string;
  operator: string;
  value: any;
}

export interface FilterGroup {
  logic: 'and' | 'or';
  filters: (FilterCondition | FilterGroup)[];
}

/**
 * Build search filter với nhiều fields (OR condition)
 * @param searchValue - Giá trị search
 * @param fields - Danh sách fields để search
 * @param operator - Operator (mặc định: 'contains')
 * @returns FilterGroup với logic OR
 */
export function buildSearchFilter(
  searchValue: string,
  fields: string[],
  operator: string = 'contains'
): FilterGroup {
  return {
    logic: 'or',
    filters: fields.map(field => ({
      field,
      operator,
      value: searchValue
    }))
  };
}

/**
 * Build search filter với nhiều giá trị và nhiều fields (OR condition)
 * Mỗi giá trị sẽ được search trong tất cả các fields
 * 
 * @param searchValues - Mảng các giá trị search
 * @param fields - Danh sách fields để search
 * @param operator - Operator (mặc định: 'contains')
 * @returns FilterGroup với logic OR
 * 
 * @example
 * buildMultiValueSearchFilter(['phong', 'ban'], ['TenToChuc', 'MaToChuc'])
 * // Result:
 * // {
 * //   logic: 'or',
 * //   filters: [
 * //     { logic: 'or', filters: [
 * //       { field: 'TenToChuc', operator: 'contains', value: 'phong' },
 * //       { field: 'MaToChuc', operator: 'contains', value: 'phong' }
 * //     ]},
 * //     { logic: 'or', filters: [
 * //       { field: 'TenToChuc', operator: 'contains', value: 'ban' },
 * //       { field: 'MaToChuc', operator: 'contains', value: 'ban' }
 * //     ]}
 * //   ]
 * // }
 */
export function buildMultiValueSearchFilter(
  searchValues: string[],
  fields: string[],
  operator: string = 'contains'
): FilterGroup {
  if (searchValues.length === 0) {
    return { logic: 'or', filters: [] };
  }

  if (searchValues.length === 1) {
    return buildSearchFilter(searchValues[0], fields, operator);
  }

  return {
    logic: 'or',
    filters: searchValues.map(value => buildSearchFilter(value, fields, operator))
  };
}

/**
 * Build filter với base conditions và search
 * @param baseFilters - Base filters (ví dụ: TrangThai filter)
 * @param searchValue - Giá trị search
 * @param searchFields - Danh sách fields để search
 * @returns Complete filter object
 */
export function buildFilterWithSearch(
  baseFilters: FilterGroup,
  searchValue?: string,
  searchFields?: string[]
): FilterGroup {
  if (!searchValue || !searchValue.trim() || !searchFields || searchFields.length === 0) {
    return baseFilters;
  }

  const searchFilter = buildSearchFilter(searchValue.trim(), searchFields);

  return {
    logic: 'and',
    filters: [baseFilters, searchFilter]
  };
}

/**
 * Build complete API filter request
 * @param searchValue - Giá trị search (single value)
 * @param searchFields - Danh sách fields để search
 * @param baseConditions - Base conditions (ví dụ: TrangThai filter)
 * @returns Complete filter object ready for API
 */
export function buildApiFilter(
  searchValue?: string,
  searchFields?: string[],
  baseConditions?: FilterCondition[]
): FilterGroup | undefined {
  const hasSearch = searchValue && searchValue.trim() && searchFields && searchFields.length > 0;
  const hasBaseConditions = baseConditions && baseConditions.length > 0;

  if (!hasSearch && !hasBaseConditions) {
    return undefined;
  }

  const filters: (FilterCondition | FilterGroup)[] = [];

  // Add base conditions
  if (hasBaseConditions) {
    filters.push({
      logic: 'and',
      filters: baseConditions
    });
  }

  // Add search filter
  if (hasSearch) {
    filters.push(buildSearchFilter(searchValue!.trim(), searchFields!));
  }

  return {
    logic: 'and',
    filters
  };
}

/**
 * Build complete API filter request với nhiều giá trị search
 * @param searchValues - Mảng các giá trị search
 * @param searchFields - Danh sách fields để search
 * @param baseConditions - Base conditions (ví dụ: TrangThai filter)
 * @returns Complete filter object ready for API
 * 
 * @example
 * buildApiFilterMultiValue(['phong', 'ban'], ['TenToChuc', 'MaToChuc'], [...])
 * // Sẽ tìm records có:
 * // (TenToChuc contains "phong" OR MaToChuc contains "phong")
 * // OR (TenToChuc contains "ban" OR MaToChuc contains "ban")
 */
export function buildApiFilterMultiValue(
  searchValues?: string[],
  searchFields?: string[],
  baseConditions?: FilterCondition[]
): FilterGroup | undefined {
  const hasSearch = searchValues && searchValues.length > 0 && searchFields && searchFields.length > 0;
  const hasBaseConditions = baseConditions && baseConditions.length > 0;

  if (!hasSearch && !hasBaseConditions) {
    return undefined;
  }

  const filters: (FilterCondition | FilterGroup)[] = [];

  // Add base conditions
  if (hasBaseConditions) {
    filters.push({
      logic: 'and',
      filters: baseConditions
    });
  }

  // Add multi-value search filter
  if (hasSearch) {
    filters.push(buildMultiValueSearchFilter(searchValues!, searchFields!));
  }

  return {
    logic: 'and',
    filters
  };
}
