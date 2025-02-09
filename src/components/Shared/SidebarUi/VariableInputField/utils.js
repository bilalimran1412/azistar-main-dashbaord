export const filterOptionsByType = (
  type,
  groupedOptions,
  excludeReadOnly = false
) => {
  return groupedOptions
    .map((group) => {
      const filteredOptions =
        type === 'all'
          ? group.options?.filter((item) => !item.isDeleted)
          : group.options.filter(
              (option) =>
                option.type === type &&
                (!excludeReadOnly || !option.readOnly) &&
                !option?.isDeleted
            );

      return {
        ...group,
        options: filteredOptions,
      };
    })
    .filter((group) => group.options.length > 0);
};

export function searchGroupedOptions(groupedOptions, searchValue) {
  const lowercasedSearchValue = searchValue.toLowerCase();
  return groupedOptions
    .map((group) => {
      const filteredOptions = group.options.filter((option) =>
        option.value.toLowerCase().includes(lowercasedSearchValue)
      );

      if (filteredOptions.length > 0) {
        return {
          ...group,
          options: filteredOptions,
        };
      }

      return null;
    })
    .filter((group) => group !== null);
}

export function hasExactMatch(filteredOptions, searchValue) {
  const lowercasedSearchValue = searchValue.toLowerCase();

  for (const group of filteredOptions) {
    for (const option of group.options) {
      if (option.value.toLowerCase() === lowercasedSearchValue) {
        return true;
      }
    }
  }

  return false;
}

export const variableDropdownManager = (
  allowedType,
  inputValue,
  initialGroupedOptions
) => {
  const groupedOptions = filterOptionsByType(
    allowedType,
    initialGroupedOptions
  );
  const filteredOptions = searchGroupedOptions(groupedOptions, inputValue);

  const hasExtractValue =
    inputValue?.length < 3 ? false : hasExactMatch(filteredOptions, inputValue);

  const isEmpty = !filteredOptions?.flatMap((group) => group.options)?.length;

  const enableCreate = (isEmpty || !hasExtractValue) && inputValue?.length > 2;

  return {
    isEmpty,
    hasExtractValue,
    filteredOptions,
    enableCreate,
    inputValue,
  };
};
