import { useEffect, useState } from 'react';


import moment from 'moment';
import styles from './styleTransaction.module.scss';
import RowTransaction from './RowTransaction';

export default function TrasactionTable({data}) {

    return (
        <div className={styles.ContainerTransactionTable}>
            <table>
                <thead>
                    <tr>
                        <th>Titulo</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Data</th>
                        <th>Detalhes</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((dados) => {
                    return (
                    <RowTransaction dados={dados}/>
                    )
                    })}
                </tbody>
            </table>
        </div>
    )
}