import { useState } from "react";

import GearIcon from "@rsuite/icons/Gear";
import moment from "moment";

import styles from "./styleTransaction.module.scss";

import ModalEditTransaction from './modalEditTransaction';

export default function RowTransaction({dados}) {
  const [openModalTransaction, setOpenModalTransaction] = useState(false);
  const [rotation, setRotation] = useState(false);

  function IsRotation() {
      setRotation(true)
  }

  return (
    <tr key={dados.id}>
      <td>{dados.title}</td>
      <td
        className={
          dados.category === "entrada" ? styles.deposit : styles.withdraw
        }
      >
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(dados.amount)}
      </td>
      <td>{dados.category}</td>
      <td>{moment(dados.inserted_at).format("DD/MM/YYYY")}</td>
      <td onClick={() => setOpenModalTransaction(true)}>
        <GearIcon
          onMouseLeave={() => setRotation(false)}
          onMouseEnter={IsRotation}
          spin={rotation}
          style={{ fontSize: "2em", cursor: "pointer" }}
        />
      </td>
      <ModalEditTransaction
        open={openModalTransaction}
        handleClose={() => setOpenModalTransaction(false)}
        data={dados}
      />
    </tr>
  );
}
