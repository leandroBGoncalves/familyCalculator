
import styles from './style.module.scss'

export default function TrasactionTable() {

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
                    <tr>
                        <td>Luz</td>
                        <td className={styles.withdraw}>{new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(17000)}
                        </td>
                        <td>Saidas</td>
                        <td>
                            02/12/2021
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}