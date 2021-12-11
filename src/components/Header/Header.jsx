import { useState } from 'react';
import ModalTransactions from '../ModalInnerTransactions';
import styles from './style.module.scss';

export default function Header ({ getData }) {
    const [openModalTransaction, setOpenModalTransaction] = useState(false);

    return (
        <header className={styles.ContainerHEader}>
            <div className={styles.ContentHeader}>
            <img src="/images/logo.svg" alt="dt money"/>
            <button type="button" onClick={() => setOpenModalTransaction(true)}>
                Nova Transação
            </button>
            <ModalTransactions open={openModalTransaction} handleClose={() => setOpenModalTransaction(false)} getData={getData}/>
            </div>
        </header>
    )
}