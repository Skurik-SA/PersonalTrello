import {DateField, DatePicker, LocalizationProvider, StaticDatePicker, usePickerLayout} from "@mui/x-date-pickers";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo/index.js";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {createTheme, FilledInput, Stack, ThemeProvider} from "@mui/material";
import 'dayjs/locale/ru';
import dayjs from "dayjs";
import {useState} from "react";

const CustomDatePicker = (props) => {

    const {
        value,
        setValue,
    } = props
    // const [value, setValue] = useState(dayjs())
    const theme = createTheme({
        palette: {
            ochre: {
                main: '#E3D026',
                light: '#E9DB5D',
                dark: '#A29415',
                contrastText: '#242105',
            },
            lightPurple: {
                main: '#dd9ef6',
                light: '#dd9ef6',
                dark: '#dd9ef6',
                contrastText: '#dd9ef6',
            },
            primary: {
                main: "#dd9ef6",
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"ru"}>
                    <StaticDatePicker
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue)
                        }}
                        slotProps={{
                            toolbar: {
                                hidden: true
                            },
                            actionBar: {
                                actions: []
                            }
                        }}
                        sx={{
                            color: 'white',
                            backgroundColor: 'transparent',
                            '& .MuiButtonBase-root': {
                                color: 'white',
                            },
                            '& .MuiTypography-root': {
                                color: 'white',
                            },
                        }}
                        defaultValue={dayjs()}
                    />
                    {/*<DateField*/}
                    {/*    value={value}*/}
                    {/*    onChange={(newValue) => {*/}
                    {/*        setValue(newValue)*/}
                    {/*    }}*/}

                    {/*    label="Дата"*/}
                    {/*    variant="filled"*/}
                    {/*    slotProps={{*/}
                    {/*        textField: {*/}
                    {/*            color: 'lightPurple',*/}
                    {/*        }*/}
                    {/*    }}*/}

                    {/*    sx={{*/}
                    {/*        color: 'lightPurple',*/}
                    {/*        width: "50%",*/}
                    {/*        "& .MuiFilledInput-root": {*/}
                    {/*            "&:hover > fieldset": { borderColor: "#C7C8CD" },*/}
                    {/*            height: "48px",*/}
                    {/*            borderRadius: "6px",*/}
                    {/*            backgroundColor: 'transparent',*/}
                    {/*            color: 'white',*/}
                    {/*        },*/}

                    {/*        "& .MuiInputLabel-root": { color: 'white' }*/}
                    {/*    }}*/}
                    {/*/>*/}
            </LocalizationProvider>
        </ThemeProvider>
    )
}

export default CustomDatePicker;