import { financeTrackerMachine } from "../machines/financeTracker";
import { createActorContext } from "@xstate/react";

export const FinanceTrackerMachineContext = createActorContext(
  financeTrackerMachine
);

export const FinanceTrackerProvider = ({ children }) => {
  return (
    <FinanceTrackerMachineContext.Provider>
      {children}
    </FinanceTrackerMachineContext.Provider>
  );
};
