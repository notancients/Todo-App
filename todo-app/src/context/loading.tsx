import { createContext } from "react";

type LoadingContextType = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const loadingContext = createContext<LoadingContextType>({
  loading: false,
  setLoading: () => {}
})