import { selector, ReadOnlySelectorOptions } from "recoil";
import { modelState, markerT } from "models";

export const ADD_BUTTON = "ADD_BUTTON";
export const REMOVE_BUTTON = "REMOVE_BUTTON";
export const SELECT_BUTTON = "SELECT_BUTTON";
export const SELECT_BUTTON_COLOR = "select-color";

type buttonT = {
  name?: string;
  color?: string;
  index?: number;
};

const buttonSelector = selector<buttonT>({
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
    const setMarker = (value: markerT) => set(modelState, value);

    const setButtons = (buttons: buttonT[]) =>
      setMarker({
        ...model,
        buttons,
      });

    const addButton = (button: buttonT) =>
      setMarker({
        ...model,
        buttons: [...buttons, button],
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
          (t: buttonT, i: number): buttonT => {
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
