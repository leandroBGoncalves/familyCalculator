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
  FormHelperText,
  Alert
} from "@material-ui/core";

import { AuthContext } from "../../Contexts/AuthContext";
import moment from "moment";
import styles from "./styleModal.module.scss";
import { supabase } from "../../services/supraClient";


export default function ModalTransactions({ open, handleClose }) {
  const { getData } = useContext(AuthContext);
  const [amount, setAmount] = useState(0);
  const [checked, setChecked] = useState(false);
  const [titleAmount, setTitleAmount] = useState('');
  const [type, setType] = useState('entrada');
  const [errorInnerData ,setErrorInnerData] = useState(false);
  const [succesInnerData ,setSuccesInnerData] = useState(false);

  async function InsertData( ) {
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
      if(error) {
        setErrorInnerData(true);
      } else {
        setErrorInnerData(false);
        setSuccesInnerData(true);
        getData()
        handleClose()
        setTimeout(() => {
          setSuccesInnerData(false);
        }, 3000);
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
      {errorInnerData && (
        <Alert variant="filled" severity="error">
          Erro ao Cadastrar! Verifique as informações e tente novamente!
        </Alert>
      )}
      {succesInnerData && (
        <Alert variant="filled" severity="success">
          Cadastro realizado com sucesso...
        </Alert>
      )}
      <div className={styles.ContainerModal}>
        <TextField
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
          <button onClick={InsertData}
          className={styles.BTN_SaveTransaction}>
            Salvar
          </button>
        </div>
      </div>
    </Dialog>
  );
}
