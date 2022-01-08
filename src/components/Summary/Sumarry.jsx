
import moment from 'moment';
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Contexts/AuthContext';
import styles from './style.module.scss'

export default function Summary({monthFilter}) {
    const { body } = useContext(AuthContext);

    const filterDateMonth = body.filter((data) => {
        return moment(data.inserted_at).format('MMM') === monthFilter
    }) 

    const cardsValues = filterDateMonth.reduce((acc, transaction) => {
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
                    -{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(cardsValues.withdraws)}
                </strong>
            </div>
            <div className="highlight-background">
                <header>
                    <p>Total</p>
                    <img src="/images/total.svg" alt="Total"/>
                </header>
                <strong>
                {new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(cardsValues.total)}
                </strong>
            </div>
        </div>
    )
}