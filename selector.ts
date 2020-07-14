import { selector, ReadOnlySelectorOptions } from "recoil";
import { modelState } from "models";

export const ADD_BUTTON = "ADD_BUTTON";
export const REMOVE_BUTTON = "REMOVE_BUTTON";
export const SELECT_BUTTON = "SELECT_BUTTON";
export const SELECT_BUTTON_COLOR = "select-color";

type buttonSelectorSetT = {
  name?: string;
  color?: string;
  index?: number;
};

const buttonSelector = selector<buttonSelectorSetT>({
  key: "markerSelector",
  get: ({ get }) => {
    const { buttons, selectedButtonIndex } = get(modelState);
    return {
      buttons,
      selectedButtonIndex,
      selectedButton: buttons[selectedButtonIndex],
    };
  },
  set: ({ set, get }, payload) => {
    const model = get(modelState);
    const buttons = model.buttons;
    const setMarker = (value: any) => set(modelState, value);

    const setButtons = (value: any) =>
      setMarker({
        ...model,
        buttons: value,
      });

    const addButton = (value: any) =>
      setMarker({
        ...model,
        buttons: [...buttons, value],
      });

    const { actionType } = payload;
    switch (actionType) {
      case ADD_BUTTON:
        const { color, name } = payload;
        return addButton({ color, name, index: buttons.length });
      case REMOVE_BUTTON:
        return setButtons([...buttons.filter((_, i) => i !== payload.index)]);
      case SELECT_BUTTON:
        return setMarker({
          ...model,
          selectedButtonIndex: payload.index,
        });
      case SELECT_BUTTON_COLOR:
        const newButton = buttons.map(
          (t: buttonSelectorSetT, i: number): buttonSelectorSetT => {
            if (payload.index === i) {
              return { ...t, index: i, color: payload.color };
            }
            return { ...t, index: i };
          }
        );
        return setButtons([...newButton]);
      default:
    }
  },
});
export default buttonSelector;
