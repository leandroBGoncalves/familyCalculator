import React, { useContext, useEffect, useState } from "react";
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

import { supabase } from "../../services/supraClient";
import { AuthContext } from "../../Contexts/AuthContext";
import { useForm } from "react-hook-form";
import moment from "moment";
import styles from "./styleModal.module.scss";


export default function ModalTransactions({ open, handleClose, getData }) {
  const { InsertData, succesInnerData, errorInnerData } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const [amount, setAmount] = useState(0);
  const [checked, setChecked] = useState(false);
  const [titleAmount, setTitleAmount] = useState('');
  const [type, setType] = useState('entrada');

  async function setData(data) {
    console.log(data)
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
      <form onSubmit={handleSubmit(setData)} className={styles.ContainerModal}>
        <TextField
          {...register('title')}
          className={styles.inputTitle}
          fullWidth
          value={titleAmount}
          onChange={(e) => {
            setTitleAmount(e.target.value)
          }}
          name="title"
          id="outlined-basic"
          label="Titulo"
          variant="outlined"
        />
        <FormControl fullWidth>
          <InputLabel htmlFor="outlined-adornment-amount">Valor</InputLabel>
          <OutlinedInput
            {...register('amount')}
            id="outlined-adornment-amount"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
            startAdornment={
              <InputAdornment position="start">R$</InputAdornment>
            }
            label="Amount"
            name="amount"
          />
          <FormHelperText id="filled-weight-helper-text">Separe as casas decimais por '&#46;' (Ponto)</FormHelperText>
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
              {...register('type')}
              aria-label="gender"
              defaultValue="female"
              
              name="type"
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
          <button onSubmit={handleSubmit}
          className={styles.BTN_SaveTransaction}>
            Salvar
          </button>
        </div>
      </form>
    </Dialog>
  );
}
