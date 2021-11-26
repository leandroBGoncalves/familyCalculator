import styles from './style.module.scss';

export default function Header ({ onOpenNewTransactionModal }) {
    return (
        <header className={styles.ContainerHEader}>
            <div className={styles.ContentHeader}>
            <img src="/images/logo.svg" alt="dt money"/>
            <button type="button" onClick={onOpenNewTransactionModal}>
                Nova Transação
            </button>

            </div>
        </header>
    )
}