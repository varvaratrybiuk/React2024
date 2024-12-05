import { createActorContext } from "@xstate/react";

import { financeTrackerMachine } from "../machines/financeTracker";

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
