import './GenericForm.css';
import { useState, useEffect } from "react";
import {
    TextField,
    Button,
    Box,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText
} from "@mui/material";

export default function GenericForm({
    initialValues = {},
    validationSchema,
    onSubmit,
    submitLabel,
    title,
    fetchOptions
}) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setValues(initialValues);
    }, [initialValues]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setValues({ ...values, image: reader.result });
        };
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validate(values, validationSchema);
        if (Object.keys(validationErrors).length === 0) {
            onSubmit(values);
        } else {
            setErrors(validationErrors);
        }
    };

    const validate = (values, validationSchema) => {
        const errors = {};
        for (const fieldName in validationSchema) {
            const fieldValidator = validationSchema[fieldName];
            const fieldValue = values[fieldName];
            const fieldError = fieldValidator(fieldValue);
            if (fieldError) {
                errors[fieldName] = fieldError;
            }
        }
        return errors;
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <Box sx={{ mb: 2 }}>
                <Typography variant="h4">{title}</Typography>
            </Box>
            {Object.keys(initialValues).map((fieldName) => (
                fieldName === "image" ? (
                    <Box key="image" sx={{ mb: 2 }}>
                        <InputLabel className="custom-label">{fieldName}</InputLabel>
                        <input
                            type="file"
                            name="image"
                            onChange={handleImageChange}
                            accept="image/*"
                        />
                        <FormHelperText>{errors[fieldName] || null}</FormHelperText>
                    </Box>
                ) : fieldName === "category" ? (
                    <Box key={fieldName} sx={{ mb: 2 }} className="form-field category-field">
                        <FormControl fullWidth variant="outlined" error={!!errors[fieldName]}>
                            <InputLabel className="custom-label category-label">{fieldName}</InputLabel>
                            <Select
                                name={fieldName}
                                value={values[fieldName]}
                                onChange={handleChange}
                            >
                                {fetchOptions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>{errors[fieldName] || null}</FormHelperText>
                        </FormControl>
                    </Box>
                ) : (
                    <Box key={fieldName} sx={{ mb: 2 }} className="form-field">
                        <InputLabel className="custom-label">{fieldName}</InputLabel>
                        <TextField
                            name={fieldName}
                            value={values[fieldName]}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            error={!!errors[fieldName]}
                            helperText={errors[fieldName] || null}
                        />
                    </Box>
                )
            ))}
            <Box sx={{ mt: 2 }}>
                <Button type="submit" variant="contained" color="primary">
                    {submitLabel}
                </Button>
            </Box>
        </form>
    );
}
