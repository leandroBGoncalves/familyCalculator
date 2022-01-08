import { useEffect, useState } from "react";
import { MenuItem, TextField } from "@material-ui/core";
import Summary from "../Summary/Sumarry";
import TrasactionTable from "../TransactonTable/TrasactionTable";

import styles from './style.module.scss'
import moment from "moment";

export default function Dashboard() {
    const [dateFilterMonth, setDateFilterMonth] = useState();
    const [currentlyMonthFront, setCurrentlyMonthFront] = useState('');


    const optionMonth = [
        {
          value: 'Jan',
          label: 'Janeiro',
        },
        {
          value: 'Feb',
          label: 'Fevereiro',
        },
        {
          value: 'Mar',
          label: 'Março',
        },
        {
          value: 'Apr',
          label: 'Abril',
        },
        {
          value: 'May',
          label: 'Maio',
        },
        {
          value: 'Jun',
          label: 'Junho',
        },
        {
          value: 'Jul',
          label: 'Julho',
        },
        {
          value: 'Aug',
          label: 'Agosto',
        },
        {
          value: 'Sep',
          label: 'Setembro',
        },
        {
          value: 'Oct',
          label: 'Outubro',
        },
        {
          value: 'Nov',
          label: 'Novembro',
        },
        {
          value: 'Dec',
          label: 'Dezembro',
        },
      ];

      const currentlyDate = () => {optionMonth.filter((month) => {
         const actualyMonth = moment().format('MMM')
          if (actualyMonth === month.value) {
              setCurrentlyMonthFront(month.label)
              setDateFilterMonth(month.value)                   
          }
      })}


    useEffect(() => {
        currentlyDate()
    }, [])

    return (
        <div className={styles.ContainerDashBoard}>
            <Summary  monthFilter={dateFilterMonth} />
            <div className={styles.BoxAllFilters}>
            <TextField
              id="outlined-select-currency"
              select
              label="Mês"
              value={dateFilterMonth}
              onChange={(e) => setDateFilterMonth(e.target.value)}
              helperText="Selecione o mês desejado"
            >
              {optionMonth.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            </div>
            <TrasactionTable
                monthFilter={dateFilterMonth} 
                ActualyMonth={currentlyMonthFront}
            />        
        </div>
    );
}