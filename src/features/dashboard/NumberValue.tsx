import React from "react";
import classnames from "classnames";
import { formatPercentage } from "../../utils/formatHelpers";

interface Props {
  value: number | null | undefined;
  positiveGood?: boolean;
  withSign?: boolean;
  withColor?: boolean;
  percentage?: boolean;
}

const NumberValue: React.FC<Props> = ({
  value,
  positiveGood = false,
  withSign = false,
  withColor = false,
  percentage = false,
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let good =
    withColor &&
    ((positiveGood && sign === "+") || (!positiveGood && sign === ""));
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let bad =
    withColor &&
    ((positiveGood && sign === "") || (!positiveGood && sign === "+"));

  return (
    <span className={classnames({good: good, bad: bad})}>
      {sign}
      {valueStr}
    </span>
  );
};

export default NumberValue;
