import { useState } from "react";
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
} from "@material-ui/core";

import styles from "./styleModal.module.scss";
import { supabase } from "../../services/supraClient";


export default function ModalTransactions({ open, handleClose }) {
  const [amount, setAmount] = useState('');
  const [checked, setChecked] = useState(false);
  const [titleAmount, setTitleAmount] = useState('');
  const [type, setType] = useState('entrada')
  const [dateCreated, setDateCreated] = useState()

  const dateTime = new Date()
  
  async function InsertData() {
    await supabase
    .from('despesasmes')
    .insert([
      {
        inserted_at: dateCreated, 
        title: titleAmount, 
        amount: amount,
        category: type,
      }
    ]).then(() => {
      window.alert('sucesso')
    })
  }
  
  function insertDateTime() {
    setDateCreated(dateTime)
    setTimeout(() => {
      InsertData()
    }, 2000);
  }



  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
      <div className={styles.TitleModal}>
        <h4>
          Inserir dados
        </h4>
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
          <button onClick={insertDateTime}
          className={styles.BTN_SaveTransaction}>
            Salvar
          </button>
        </div>
      </div>
    </Dialog>
  );
}
