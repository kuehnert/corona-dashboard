import React from "react";
import classnames from "classnames";
import { formatPercentage } from "../../utils/formatHelpers";

interface Props {
  value: number | null | undefined;
  positiveGood?: boolean;
  withSign?: boolean;
  percentage?: boolean;
}

const NumberValue: React.FC<Props> = ({
  value,
  positiveGood = false,
  withSign = false,
  percentage = false,
}) => {
  let sign = "";
  if (withSign) {
    sign = value && value >= 0 ? "+" : "-";
  }

  let valueStr;
  if (value == null) {
    valueStr = "-";
  } else if (percentage) {
    valueStr = formatPercentage(value);
  } else {
    valueStr = value.toLocaleString();
  }

  return (
    <span className={classnames({ red: sign === "-", green: sign === "+" })}>
      {sign}
      {valueStr}
    </span>
  );
};

export default NumberValue;
