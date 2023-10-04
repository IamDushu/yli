import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Box, Stack } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { getConnectionGoals } from "../constants";
import Image from "next/image";

const ConnectionGoalsSelector = ({ goals = [], onChange }) => {
  const [lang] = useTranslation("language");
  const connectionGoalOptions = useMemo(() => getConnectionGoals(lang), [lang]);
  return (
    <Stack direction="row">
      <div className="growth-connection-selection-wrapper">
        <ToggleButtonGroup
          value={goals}
          onChange={onChange}
          aria-label="device"
        >
          {connectionGoalOptions.map((goalOption, index) => (
            <ToggleButton
              key={index}
              value={goalOption.value}
              aria-label={goalOption.value}
            >
              {goals.includes(goalOption.value) && (
                <Image
                  src="/assets/images/tick-icon.svg"
                  height={18}
                  width={18}
                />
              )}
              {goalOption.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>
    </Stack>
  );
};

export default ConnectionGoalsSelector;
