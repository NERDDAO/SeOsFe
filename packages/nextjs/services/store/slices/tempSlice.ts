import { TAppSliceCreator, TAppStore } from "~~/services/store/storeTypes";

export type TExampleStuff = {
  tempStuff: Array<string>;
  setup: Array<string>;
};

export const defaultExampleStuff = (): TExampleStuff => {
  return {
    tempStuff: [],
    setup: [],
  };
};

export type TempSlice = {
  tempState: TExampleStuff;
  address: string;
  setTempState: (newTempState: TExampleStuff) => void;
  setAddress: (newAddress: string) => void;
};

export const createTempSlice: TAppSliceCreator<TempSlice> = set => ({
  tempState: defaultExampleStuff(),
  address: "",
  setTempState: (newValue: TExampleStuff): void =>
    set((state): TAppStore => {
      state.tempSlice.tempState = newValue;
      return state;
    }),
  setAddress: (newAddress: string): void =>
    set((state): TAppStore => {
      state.tempSlice.address = newAddress;
      return state;
    }),
});
