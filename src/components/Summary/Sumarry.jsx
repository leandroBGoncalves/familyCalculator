
import { useEffect, useState } from 'react'
import styles from './style.module.scss'

export default function Summary({data}) {

    const cardsValues = data.reduce((acc, transaction) => {
        if(transaction.category === 'entrada') {
            acc.deposits += transaction.amount;
            acc.total += transaction.amount;
        } else {
            acc.withdraws += transaction.amount;
            acc.total -= transaction.amount; 
        }
        return acc;
        }, {
            deposits: 0,
            withdraws: 0,
            total: 0,
        })



    return (
        <div className={styles.ConatinerSummary}>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src="/images/income.svg" alt="Entradas"/>
                </header>
                <strong>
                    {new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(cardsValues.deposits)}
                </strong>
            </div>
            <div>
                <header>
                    <p>Saidas</p>
                    <img src="/images/outcome.svg" alt="Saidas"/>
                </header>
                <strong>
                    -500
                </strong>
            </div>
            <div className="highlight-background">
                <header>
                    <p>Total</p>
                    <img src="/images/total.svg" alt="Total"/>
                </header>
                <strong>
                    1000
                </strong>
            </div>
        </div>
    )
}