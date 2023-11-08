import BottomSheet from "@gorhom/bottom-sheet";
import { useCallback, useMemo, useRef, useState } from "react";

export const useBottomSheet = (initialSnap = -1) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["20%", "99%"], []);
  const [ContentComponent, setContentComponent] =
    useState<React.ReactNode | null>(null);

  const openBottomSheetWithContent = useCallback(
    (Component: React.ReactNode | null) => {
      setContentComponent(Component);
      bottomSheetRef.current?.expand();
    },
    []
  );

  const closeBottomSheet = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const afterCloseResetContent = () => {
    setContentComponent(null);
  };
  return {
    bottomSheetRef,
    snapPoints,
    openBottomSheetWithContent,
    closeBottomSheet,
    afterCloseResetContent,
    ContentComponent,
  };
};
