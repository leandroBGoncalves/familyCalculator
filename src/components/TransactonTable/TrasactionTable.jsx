
import moment from 'moment';
import styles from './style.module.scss'

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
                    </tr>
                </thead>

                <tbody>
                    {data.map((dados) => {
                    return (
                    <tr key={dados.id}>
                        <td>{dados.title}</td>
                        <td className={styles.withdraw}>{new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(dados.amount)}
                        </td>
                        <td>{dados.category}</td>
                        <td>
                        {moment(dados.inserted_at).format("DD/MM/YYYY")}
                        </td>
                    </tr>
                    )
                    })}
                </tbody>
            </table>
        </div>
    )
}