import { atom, RecoilState } from "recoil";
import { defaultMarkerHeight, defaultMarkerWith } from "config";

type buttonT = {
  [index: string]: string;
};
type modelT = {
  brand: { title: string };
  category: { title: string };
  name: string;
  selectedMarkerType: "marker" | "neiromarker";
  isPreviewLoaded: boolean;
  previewImage: string;
  markerImages: string;
  selectedButtonIndex: number;
  buttons: buttonT[];
};

const initialMarkerImage = {
  croppedImage: null,
  croppPosition: {
    x: 0,
    y: 0,
    height: defaultMarkerHeight,
    width: defaultMarkerWith,
  },
  isImageLoaded: false,
  isCropped: false,
  isCropping: false,
};

const initialModel: modelT = {
  brand: { title: "" },
  category: { title: "" },
  name: "",
  isPreviewLoaded: false,
  previewImage: "",
  selectedMarkerType: "marker",
  markerImages: {
    marker: initialMarkerImage,
    neiromarker: initialMarkerImage,
  },
  selectedButtonIndex: 0,
  buttons: [],
};
const model: RecoilState<modelT> = atom({
  key: "model",
  default: initialModel,
  //@ts-ignore
  persistence_UNSTABLE: { type: "log" },
});

export default model;
