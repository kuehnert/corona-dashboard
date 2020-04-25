import React from "react";
import classnames from "classnames";
import { formatPercentage } from "../../utils/formatHelpers";

interface Props {
  percentage?: boolean;
  positiveGood?: boolean;
  value: number | null | undefined;
  withColor?: boolean;
  withSign?: boolean;
}

const NumberValue: React.FC<Props> = ({
  percentage = false,
  positiveGood = false,
  value,
  withColor = false,
  withSign = false,
}) => {
  let sign = "";
  if (withSign && value && value >= 0) {
    sign = "+";
  }

  let valueStr;
  if (value == null) {
    valueStr = "-";
  } else if (percentage) {
    valueStr = formatPercentage(value);
  } else {
    valueStr = value.toLocaleString();
  }

  let good =
    withColor &&
    ((positiveGood && sign === "+") || (!positiveGood && sign === ""));

  let bad =
    withColor &&
    ((positiveGood && sign === "") || (!positiveGood && sign === "+"));

  return (
    <span className={classnames({ good: good, bad: bad })}>
      {sign}
      {valueStr}
    </span>
  );
};

export default NumberValue;
