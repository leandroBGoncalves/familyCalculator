import React, { useEffect, useState } from "react";
import {
  Dialog,
  FormControl,
  FormControlLabel,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
  Switch,
  TextField,
  FormHelperText
} from "@material-ui/core";

import styles from "./styleModal.module.scss";
import { supabase } from "../../services/supraClient";
import moment from "moment";


export default function ModalTransactions({ open, handleClose, getData }) {
  const [amount, setAmount] = useState(0);
  const [checked, setChecked] = useState(false);
  const [titleAmount, setTitleAmount] = useState('');
  const [type, setType] = useState('entrada');

 
  async function InsertData() {
    const { data, error } = await supabase
    .from('despesasmes')
    .insert([
      {
        'inserted_at': moment(), 
        'title': titleAmount, 
        'amount': amount,
        'category': type,
      }
    ])
      Fedback(data, error)
      setTimeout(() => {
        getData()
        handleClose() 
      }, 2500);
  }
  

  function Fedback(susses, erro) {
    if (susses[0]) {
      return window.alert(`Informação salva com sucesso`)
    } else if (erro[0]) {
      return window.alert(`Erro ao enviar informação ${erro}`)
    }
  }

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
        <div className={styles.TitleModal}>
        <h4>Inserir dados</h4>
        <h3 onClick={handleClose}>X</h3>
      </div>
      <div className={styles.ContainerModal}>
        <TextField
          className={styles.inputTitle}
          fullWidth
          value={titleAmount}
          onChange={(e) => {
            setTitleAmount(e.target.value)
          }}
          id="outlined-basic"
          label="Titulo"
          variant="outlined"
        />
        <FormControl fullWidth>
          <InputLabel htmlFor="outlined-adornment-amount">Valor</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
            startAdornment={
              <InputAdornment position="start">R$</InputAdornment>
            }
            label="Amount"
          />
          <FormHelperText id="filled-weight-helper-text">Separe as casas decimais por '.' (Ponto)</FormHelperText>
        </FormControl>
        <div className={styles.interruptors}>
          <FormControlLabel
            control={<Switch defaultChecked color="secondary" />}
            label="Incluir parcelas"
            checked={checked}
            onChange={handleChange}
          />
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="gender"
              defaultValue="female"
              name="radio-buttons-group"
              value={type}
              onChange={(e) => {
                setType(e.target.value)
              }}
            >
              <FormControlLabel value="entrada" control={<Radio />} label="Entrada" />
              <FormControlLabel value="saida" control={<Radio />} label="Saida" />
            </RadioGroup>
          </FormControl>
        </div>
        <div className={styles.boxBTN}>
          <button onClick={() => {
            InsertData()
          }}
          className={styles.BTN_SaveTransaction}>
            Salvar
          </button>
        </div>
      </div>
    </Dialog>
  );
}
