import {createTheme, ThemeProvider} from "@mui/material";
import {DateField, LocalizationProvider, TimeField} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

const CustomTimeField = (props) => {
    const {
        value,
        setValue,
    } = props

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
                <div style={{width: '105px'}}>
                    <TimeField
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue)
                        }}

                        label="Время"
                        variant="filled"
                        slotProps={{
                            textField: {
                                color: 'lightPurple',
                                size: 'small'
                            }
                        }}

                        sx={{
                            m: 0,
                            p: 0,
                            color: 'lightPurple',
                            "& .MuiFilledInput-root": {
                                "&:hover > fieldset": { borderColor: "#C7C8CD" },
                                height: "48px",
                                borderRadius: "6px",
                                backgroundColor: 'transparent',
                                color: 'white',
                            },

                            "& .MuiInputLabel-root": { color: 'white' }
                        }}
                    />
                </div>

            </LocalizationProvider>
        </ThemeProvider>
    )
}

export default CustomTimeField;