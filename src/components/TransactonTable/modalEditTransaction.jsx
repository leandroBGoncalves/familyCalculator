import { useContext, useState } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import { supabase } from "../../services/supraClient";
import { FaRegTrashAlt, FaRegWindowClose } from 'react-icons/fa';
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
    Button,
    CircularProgress,
    Alert
  } from "@material-ui/core";
import { IconButton } from 'rsuite';


import styles from './styleTransaction.module.scss';

export default function ModalEditTransaction({open, handleClose, body }) {
  const { getData } = useContext(AuthContext);
    const [amount, setAmount] = useState(body.amount);
    const [itemId, setItemId] = useState(body.id);
    const [checked, setChecked] = useState(false);
    const [titleAmount, setTitleAmount] = useState(body.title);
    const [type, setType] = useState(body.category);
    const [alertError, setAlertError] = useState(false);
    const [alertSucces, setAlertSucces] = useState(false);
    const [confirmDel, setConfirmDel] = useState(false);
    const [loadingDel, setLoadingDel] = useState(false);


    const handleChange = (event) => {
        setChecked(event.target.checked);
      };

      async function updateTransaction() {
        const { data, error } = await supabase
        .from('despesasmes')
        .update({ 
          title: titleAmount,
          amount: amount,
          category: type,
         })
        .match({ id: itemId })
        if (error) {
          setAlertError(true)
        } else {
          setAlertError(false)
          setAlertSucces(true)
          getData()
          handleClose()
          setAlertSucces(false)
        }
      }
      
      async function DeletItem() {
        setLoadingDel(true)
        const { data, error } = await supabase
        .from('despesasmes')
        .delete()
        .match({ id: itemId })
        if (error) {
          setLoadingDel(false)
        } else {
          setLoadingDel(false)
          setConfirmDel(false)
          getData()
          handleClose()
        }
      }

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
      <div className={styles.TitleModal}>
        <h4>Editar informações</h4>
        <h3 onClick={handleClose}>X</h3>
      </div>
      <div className={styles.boxBTNDelete}>
      {confirmDel && 
      <Alert
      style={{width: "100%"}}
      severity="error"
      action={
        <>
        {!loadingDel ? 
        <Button onClick={DeletItem} color="inherit" size="small">
          Excluir 
        </Button> : 
        <CircularProgress />
        }
        <FaRegWindowClose className={styles.IconClose} onClick={() => {setConfirmDel(false)}}/>
        </>
      }
      >
        Deseja realmente excluir <span>de forma permanente esta transação?</span>
      </Alert>
      }
      {!confirmDel && 
      <IconButton
      color="red"
      onClick={() => setConfirmDel(true)}
      >
        Excluir 
        {<FaRegTrashAlt />}
      </IconButton>}
      </div>
      {alertError && (
        <Alert variant="filled" severity="error">
          Erro ao Cadastrar! Verifique as informações e tente novamente!
        </Alert>
      )}
      {alertSucces && (
        <Alert variant="filled" severity="success">
          Cadastro atualizado com sucesso...
        </Alert>
      )}
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
            onClick={updateTransaction}
            className={styles.BTN_SaveTransaction}
          >
            Salvar
          </button>
        </div>
      </div>
    </Dialog>
  );
}
