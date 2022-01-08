import { useContext, useEffect, useState } from 'react';

import styles from './styleTransaction.module.scss';
import RowTransaction from './RowTransaction';
import { AuthContext } from '../../Contexts/AuthContext';
import moment from 'moment';

export default function TrasactionTable({ monthFilter }) {
    const { getData, body, errorData, succesData } = useContext(AuthContext);
    const [numberItens, setNumberItens] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const filterDateMonth = body.filter((data) => {
        return moment(data.inserted_at).format('MMM') === monthFilter
    }) 

    const teste = moment(body.created_at).format('MMM')

    function HandleNumberItens() {
        setNumberItens(body.length)
    }

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        HandleNumberItens()
    })


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
                    {filterDateMonth.slice(0, rowsPerPage).map((data) => {
                    return (
                    <RowTransaction key={data.id} dados={data}/>
                    )
                    }).reverse()}
                </tbody>
            </table>
            <div className={styles.BTNChengePlus}>
                <button onClick={() => setRowsPerPage(rowsPerPage + 5)}>{numberItens > rowsPerPage ? "Carregar mais" : "Nada mais para carregar..."}</button>
            </div>
        </div>
    )
}