import React, { useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../form/Controls";
import { useForm, Form } from '../../components/form/useForm';
import * as policyService from "../services/services";


const incomeRange = [
    { id: '0- $25K', title: '0- $25K' },
    { id: '$25-$70K', title: '$25-$70K' },
    { id: '>$70K', title: '>$70K' },
]

const initialFValues = {
    id: 0,
    Policy_id: '',
    Date_of_Purchase: '',
    Customer_id: '',
    Premium: '',
    Customer_Income_group: 'male',
    Customer_Region: '',
}

export default function EditPolicyForm(props) {
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('Policy_id' in fieldValues)
            temp.Policy_id = fieldValues.Policy_id ? "" : "This field is required."
        if ('Customer_id' in fieldValues)
            temp.Customer_id = fieldValues.Customer_id ? "" : "This field is required."
        if ('Premium' in fieldValues)
            temp.Premium = fieldValues.Premium < 1000000 ? "" : "Premium should be less than 1 million."
        if ('Customer_Region' in fieldValues)
            temp.Customer_Region = fieldValues.Customer_Region.length !== 0 ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            addOrEdit(values, resetForm);
        }
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit]);

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        name="Policy_id"
                        label="Policy ID"
                        type="number"
                        value={values.Policy_id}
                        onChange={handleInputChange}
                        error={errors.Policy_id}
                    />
                    <Controls.Input
                        label="Date of Purchase"
                        name="Date_of_Purchase"
                        value={values.Date_of_Purchase}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <Controls.Input
                        label="Customer ID"
                        name="Customer_id"
                        type="number"
                        value={values.Customer_id}
                        onChange={handleInputChange}
                        error={errors.Customer_id}
                    />
                    <Controls.Input
                        label="Premium"
                        name="Premium"
                        type="number"
                        value={values.Premium}
                        onChange={handleInputChange}
                        error={errors.Premium}
                    />

                </Grid>
                <Grid item xs={6}>
                    <Controls.RadioGroup
                        name="Customer_Income_group"
                        label="Customer Income group"
                        value={values.Customer_Income_group}
                        onChange={handleInputChange}
                        items={incomeRange}
                    />
                    <Controls.Select
                        name="Customer_Region"
                        label="Region"
                        value={values.Customer_Region}
                        onChange={handleInputChange}
                        options={policyService.getRegions()}
                        error={errors.Customer_Region}
                    />
                    <div>
                        <Controls.Button
                            type="submit"
                            text="Submit" />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}