import Summary from "../Summary/Sumarry";
import TrasactionTable from "../TransactonTable/TrasactionTable";

import styles from './style.module.scss'

export default function Dashboard({data}) {
    return (
        <div className={styles.ContainerDashBoard}>
            <Summary data={data}/>
            <TrasactionTable data={data}/>
          
        </div>
    );
}