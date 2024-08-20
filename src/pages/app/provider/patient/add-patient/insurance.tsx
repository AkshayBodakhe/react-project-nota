import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import FormInput from '../../../../../components/common/atom/FormInput';
import Label from '../../../../../components/common/atom/Label';
import { DropzoneArea } from 'material-ui-dropzone';
import { uploadStyle } from '../../../admin/new-master/data-import/upload-data-import';
import { FormInputs } from './patient-form';
import { Props } from './privacy';
import { Gender, InsuranceTypeOpts, RelationToInsured, States } from '../../../../../components/common/form-enum';

const Insurance = (props: Props) => {

    const {
        formik: {
            values,
            setFieldValue,
            errors,
            setFieldTouched,
            touched,
            handleBlur
        },
        isSubmitting,
        setIsValid,
        insurancePayerList,
        setIsSubmitting
    } = props;

    const {
        insuranceType,
        insurancePayer,
        groupName,
        memberId,
        planName,
        planType,
        groupId,
        expiryDate,
        relationshipWithPolicyHolder,
        firstName,
        lastName,
        gender,
        dob,
        line1,
        line2,
        city,
        state,
        country,
        zipcode
    } = values?.insurance;

    const uploadClasses = uploadStyle();

    useEffect(() => {

        if (isSubmitting) {
            const array: any[] = Object.keys(values?.insurance).map((val: string) => {
                setFieldTouched(`insurance.${val}`);
                return checkValidation(val);
            })
            if (!array.includes(false)) setIsValid(true);
            else setIsSubmitting(false);
        }
    }, [isSubmitting, errors])

    const formInputs: FormInputs[] = [
        {
            control: 'select', name: 'insuranceType',
            label: 'Insurance Type', placeholder: 'Select',
            isRequired: false, value: insuranceType, xs: 3, options: InsuranceTypeOpts,
            // isError: !!(touched?.insurance?.insuranceType && errors?.insurance?.insuranceType),
            // errorMsg: errors?.insurance?.insuranceType || ''
        },
        {
            control: 'dropdown', name: 'insurancePayer',
            label: 'Insurance Name', placeholder: 'Select',
            isRequired: false, value: insurancePayer, xs: 3, options: insurancePayerList,
            mapName: 'payerName', mapBy: 'id',
            // isError: !!(touched?.insurance?.insurancePayer && errors?.insurance?.insurancePayer),
            // errorMsg: errors?.insurance?.insurancePayer || ''
        },
        {
            control: '', name: 'memberId',
            label: 'Member ID', placeholder: 'Enter Member ID',
            isRequired: false, value: memberId, xs: 3,
            // isError: !!(touched?.insurance?.memberId && errors?.insurance?.memberId),
            // errorMsg: errors?.insurance?.memberId || ''
        },
        {
            name: 'planName', label: 'Plan Name', placeholder: 'Enter Plan Name',
            isRequired: false, value: planName, xs: 3,
            // isError: !!(touched?.insurance?.planName && errors?.insurance?.planName),
            // errorMsg: errors?.insurance?.planName || ''
        },
        {
            name: 'planType', label: 'Plan Type', placeholder: 'Enter Plan Type',
            isRequired: false, value: planType, xs: 3,
            // isError: !!(touched?.insurance?.planType && errors?.insurance?.planType),
            // errorMsg: errors?.insurance?.planType || ''
        },
        {
            control: '', name: 'groupId',
            label: 'Group ID', placeholder: 'Enter Group ID',
            isRequired: false, value: groupId, xs: 3,
            // isError: !!(touched?.insurance?.groupId && errors?.insurance?.groupId),
            // errorMsg: errors?.insurance?.groupId || ''
        },
        {
            control: '', name: 'groupName',
            label: 'Group Name', placeholder: 'Enter Group Name',
            isRequired: false, value: groupName, xs: 3,
            // isError: !!(touched?.insurance?.groupName && errors?.insurance?.groupName),
            // errorMsg: errors?.insurance?.groupName || ''
        },
        {
            control: 'calendar', name: 'expiryDate',
            label: 'Expiry Date', placeholder: '',
            isRequired: false, value: expiryDate, xs: 3, format: 'ISO',
            isError: !!(touched?.insurance?.expiryDate && errors?.insurance?.expiryDate),
            errorMsg: errors?.insurance?.expiryDate || '',
        },
        {
            control: 'radio', name: 'relationshipWithPolicyHolder',
            label: 'Patient Relationship To Insured', placeholder: '',
            isRequired: false, value: relationshipWithPolicyHolder, xs: 12,
            options: RelationToInsured
        }
    ]

    const patientRelationShipInputs: FormInputs[] = [
        {
            control: '', name: 'firstName',
            label: 'First Name', placeholder: 'Enter First Name',
            isRequired: true, value: firstName, xs: 3,
            isError: !!(touched?.insurance?.firstName && errors?.insurance?.firstName),
            errorMsg: errors?.insurance?.firstName || ''
        },
        {
            control: '', name: 'lastName',
            label: 'Last Name', placeholder: 'Enter Last Name',
            isRequired: true, value: lastName, xs: 3,
            isError: !!(touched?.insurance?.lastName && errors?.insurance?.lastName),
            errorMsg: errors?.insurance?.lastName || ''
        },
        {
            control: 'calendar', name: 'dob',
            label: 'Date Of Birth', placeholder: '',
            isRequired: true, value: dob, xs: 3,
            isError: !!(touched?.insurance?.dob && errors?.insurance?.dob),
            errorMsg: errors?.insurance?.dob || ''
        },
        {
            control: 'select', name: 'gender',
            label: 'Gender', placeholder: 'Select Gender',
            isRequired: true, value: gender, xs: 3,
            options: Gender, errorMsg: errors?.insurance?.gender || '',
            isError: !!(touched?.insurance?.gender && errors?.insurance?.gender)
        },
        {
            control: '', name: 'line1',
            label: 'Address Line 1', placeholder: 'Enter Address Line 1',
            isRequired: true, value: line1, xs: 6,
            isError: !!(touched?.insurance?.line1 && errors?.insurance?.line1),
            errorMsg: errors?.insurance?.line1 || ''
        },
        {
            control: '', name: 'line2',
            label: 'Address Line 2', placeholder: 'Enter Address Line 2',
            isRequired: false, value: line2, xs: 6
        },
        {
            control: '', name: 'city',
            label: 'City', placeholder: 'Enter City',
            isRequired: true, value: city, xs: 3,
            isError: !!(touched?.insurance?.city && errors?.insurance?.city),
            errorMsg: errors?.insurance?.city || ''
        },
        {
            control: 'select', name: 'state',
            label: 'State', placeholder: 'Select State',
            isRequired: true, value: state, xs: 3,
            isError: !!(touched?.insurance?.state && errors?.insurance?.state),
            errorMsg: errors?.insurance?.state || '', options: States
        },
        {
            control: '', name: 'country',
            label: 'Country', placeholder: 'Select Country',
            isRequired: true, value: country, xs: 3,
            isError: !!(touched?.insurance?.country && errors?.insurance?.country),
            errorMsg: errors?.insurance?.country || ''
        },
        {
            control: '', name: 'zipcode',
            label: 'Zip Code', placeholder: 'Enter Zip Code',
            isRequired: false, value: zipcode, xs: 3,
            isError: !!(touched?.insurance?.zipcode && errors?.insurance?.zipcode),
            errorMsg: errors?.insurance?.zipcode || ''
        }
    ]

    const handleChange = (event: any) => {
        setFieldValue(`insurance.${event.target.name}`, event.target.value);
    }

    function checkValidation(field: any) {
        if (!errors.insurance) return;
        return !errors.insurance[field] && values.insurance[field];
    }

    return (
        <React.Fragment>
            <Grid container rowSpacing={2}>
                <Grid item container spacing={2}>
                    {formInputs.map((input: FormInputs, index) => {
                        return (
                            <Grid item xs={input.xs}>
                                <FormInput
                                    key={index}
                                    control={input.control}
                                    name={input.name}
                                    label={input.label}
                                    value={input.value}
                                    mapBy={input.mapBy}
                                    disablePast={true}
                                    isRequired={input.isRequired}
                                    mapName={input.mapName}
                                    isError={input.isError}
                                    error={input.errorMsg}
                                    placeholder={input.placeholder}
                                    options={input.options}
                                    onChange={handleChange}
                                    format={input.format}
                                />
                            </Grid>
                        )
                    })}
                </Grid>
                {relationshipWithPolicyHolder !== 'SELF' && <Grid item container spacing={2}>
                    {patientRelationShipInputs.map((input: FormInputs, index) => {
                        return (
                            <Grid item xs={input.xs}>
                                <FormInput
                                    key={index}
                                    control={input.control}
                                    name={input.name}
                                    label={input.label}
                                    isRequired={input.isRequired}
                                    isError={input.isError}
                                    error={input.errorMsg}
                                    value={input.value}
                                    placeholder={input.placeholder}
                                    options={input.options}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Grid>
                        )
                    })}
                </Grid>}
                <Grid item container>
                    <Grid item>
                        <Label label={'Upload Insurance Card'} />
                    </Grid>
                    <Grid item container spacing={2}>
                        <Grid item xs={2}>
                            <DropzoneArea
                                dropzoneText="Click here to upload Front Side"
                                showFileNames
                                // maxFileSize={1048576} // 1 MB in bytes
                                filesLimit={1}
                                acceptedFiles={[".csv", "text/csv","image/jpeg","image/png",".pdf"]}
                                // showAlerts={formik.touched.formData?.file && Boolean(formik.errors.formData?.file)}
                                // onDropRejected={() => {
                                //     formik.setFieldError('formData.file', 'Required');
                                // }}
                                // onDropRejected={(e) => { formik.setFieldError('formData.file', 'Required') }}
                                // onChange={(files: any) => UploadFile(files)}
                                classes={{
                                    root: uploadClasses.dropZone,
                                    icon: uploadClasses.uploadIcon,
                                    text: uploadClasses.textUploadZone,
                                }}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <DropzoneArea
                                dropzoneText="Click here to upload Back Side"
                                showFileNames
                                // maxFileSize={1048576} // 1 MB in bytes
                                filesLimit={1}
                                acceptedFiles={[".csv", "text/csv","image/jpeg","image/png",".pdf"]}
                                // showAlerts={formik.touched.formData?.file && Boolean(formik.errors.formData?.file)}
                                // onDropRejected={() => {
                                //     formik.setFieldError('formData.file', 'Required');
                                // }}
                                // onDropRejected={(e) => { formik.setFieldError('formData.file', 'Required') }}
                                // onChange={(files: any) => UploadFile(files)}
                                classes={{
                                    root: uploadClasses.dropZone,
                                    icon: uploadClasses.uploadIcon,
                                    text: uploadClasses.textUploadZone,
                                }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default Insurance;
