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

import moment from "moment";
import { useState } from "react";

  import styles from './styleTransaction.module.scss';

export default function ModalEditTransaction({open, handleClose, data}) {
    const [amount, setAmount] = useState(data.amount);
    const [checked, setChecked] = useState(false);
    const [titleAmount, setTitleAmount] = useState(data.title);
    const [type, setType] = useState(data.category);

    console.log(data.amount)

    const handleChange = (event) => {
        setChecked(event.target.checked);
      };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
      <div className={styles.TitleModal}>
        <h4>Editar informações</h4>
        <h3 onClick={handleClose}>X</h3>
      </div>
      <div className={styles.ContainerModal}>
        <TextField
          className={styles.inputTitle}
          fullWidth
          value={titleAmount}
          onChange={(e) => {
            setTitleAmount(e.target.value);
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
          <FormHelperText id="filled-weight-helper-text">
            Separe as casas decimais por '.' (Ponto)
          </FormHelperText>
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
                setType(e.target.value);
              }}
            >
              <FormControlLabel
                value="entrada"
                control={<Radio />}
                label="Entrada"
              />
              <FormControlLabel
                value="saida"
                control={<Radio />}
                label="Saida"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div className={styles.boxBTN}>
          <button
            className={styles.BTN_SaveTransaction}
          >
            Salvar
          </button>
        </div>
      </div>
    </Dialog>
  );
}
