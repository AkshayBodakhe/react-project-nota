import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import FormInput from '../../../../../components/common/atom/FormInput';
import { Props } from './privacy';
import { FormInputs } from './patient-form';
import { RelationShips } from '../../../../../components/common/form-enum';

const EmergencyContact = (props: Props) => {

    const {
        formik: {
            values,
            setFieldValue,
            setFieldTouched,
            errors,
            touched
        },
        setIsSubmitting,
        isSubmitting,
        setIsValid
    } = props;

    const {
        emergContactRelation,
        emergContactFirstName,
        emergContactLastName,
        emergContactNumber,
        emergContactEmail
    } = values;

    const fields: any[] = [
        'emergContactRelation',
        'emergContactFirstName',
        'emergContactLastName',
        'emergContactNumber',
        'emergContactEmail'
    ]

    useEffect(() => {
        if (isSubmitting) {
            const array: any[] = fields.map((field) => {
                setFieldTouched(field);
                return checkValidation(field);
            })
            if (!array.includes(false)) setIsValid(true);
            else setIsSubmitting(false);
        }
    }, [isSubmitting])

    const formInputs: FormInputs[] = [
        {
            control: 'select', name: 'emergContactRelation',
            label: 'Relationship With Patient', placeholder: 'Select',
            isRequired: true, value: emergContactRelation, xs: 3,
            options: RelationShips
        },
        {
            name: 'emergContactFirstName', label: 'First Name',
            placeholder: 'Enter First Name', isRequired: true,
            value: emergContactFirstName, xs: 3
        },
        {
            name: 'emergContactLastName', label: 'Last Name',
            placeholder: 'Enter Last Name', isRequired: true,
            value: emergContactLastName, xs: 3
        },
        {
            name: 'emergContactNumber', label: 'Mobile Number',
            placeholder: 'Enter Mobile Number', isRequired: true,
            value: emergContactNumber, xs: 3
        },
        {
            name: 'emergContactEmail', label: 'Email',
            placeholder: 'Enter Email', isRequired: true,
            value: emergContactEmail, xs: 3
        }
    ]

    const handleChange = (event: any) => {
        setFieldValue(event.target.name, event.target.value);
    }

    function checkValidation(field: any) {
        return !errors[field] && values[field];
    }

    return (
        <React.Fragment key={'EmergencyContact'}>
            <Grid container spacing={2}>
                {formInputs.map((input: FormInputs) => {
                    return (
                        <Grid item xs={input.xs}>
                            <FormInput
                                control={input.control}
                                name={input.name}
                                label={input.label}
                                value={input.value}
                                isRequired={input.isRequired}
                                isError={!!(touched[input.name] && errors[input.name])}
                                error={errors[input.name]}
                                placeholder={input.placeholder}
                                options={input.options}
                                onChange={handleChange}
                                onSelectOption={handleChange}
                            />
                        </Grid>
                    )
                })}
            </Grid>
        </React.Fragment>
    )
}

export default EmergencyContact;
