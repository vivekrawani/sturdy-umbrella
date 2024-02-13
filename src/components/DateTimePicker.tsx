import React from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default function DateTimePicker({ date, setDate }: { date: Date, setDate: React.Dispatch<React.SetStateAction<Date>> }) {

    
    // const [startDate, setStartDate] = React.useState(new Date());
    return (
        <DatePicker selected={date} showTimeSelect

            timeCaption="time"
            dateFormat="dd/MM/yyyy hh:mm:ss"

            onChange={(date: Date) => {
                setDate(date); console.log(date);
            }} />
    )
}
