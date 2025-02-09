import { create } from 'zustand';
import { initialGroupedOptions as initialValue } from 'config/constant';

export const useDropdownStore = create((set, get) => ({
  groupedOptions: initialValue,

  setGroupedVariables: (customVariable) => {
    const groupedOptions = get().groupedOptions;
    groupedOptions[3].options = customVariable;
    set({ groupedOptions: groupedOptions });
  },

  addCustomVariable: (value, variableType) => {
    const groupedOptions = get().groupedOptions;
    const newCustomOption = {
      value: value,
      label: value,
      type: variableType,
      sample: '',
      readOnly: false,
      category: 'CUSTOM_VARIABLES',
    };
    groupedOptions[3].options.push(newCustomOption);
    set({ groupedOptions: groupedOptions });
    return newCustomOption;
  },
  removeCustomVariable: (value) => {
    const groupedOptions = get().groupedOptions;

    const updatedOptions = groupedOptions[3].options.filter(
      (option) => option.value !== value
    );

    groupedOptions[3].options = updatedOptions;
    set({ groupedOptions: groupedOptions });
  },
}));
