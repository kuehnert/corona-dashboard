import React from "react";
import styles from './NumberCard.module.scss'

interface Props {
  small: string | number;
  large: string | number | undefined;
}

const NumberCard: React.FC<Props> = ({ small, large }) => {
  return (
    <div className="column">
      <div className="ui card">
        <div className="content">
          <div className="description">{small}</div>
          <div className={styles.number}>{large || '-'}</div>
        </div>
      </div>
    </div>
  );
};

export default NumberCard;
