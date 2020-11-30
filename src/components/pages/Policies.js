import React, { useState, useEffect } from 'react';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import TableView from "../../components/TableView";
import * as policyService from "../services/services";
import Input from '../form/Input';
import { Search } from "@material-ui/icons";
import Popup from "../Popup";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Controls from '../form/Controls';
import EditPolicyForm from './EditPolicyForm';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '100%'
    }
}))


const headCells = [
    { id: 'Policy_id', label: 'Policy ID' },
    { id: 'Date_of_Purchase', label: 'Date of Purchace' },
    { id: 'Customer_id', label: 'Customer ID' },
    { id: 'Premium', label: 'Premium' },
    { id: 'Customer_Income_group', label: 'Customer Income group' },
    { id: 'Customer_Region', label: 'Customer Region' },
    { id: 'Edit', label: 'Edit' },
]

export default function Policies() {

    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState([]);
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
    const [openPopup, setOpenPopup] = useState(false);

    useEffect(() => {
        policyService.fetchAllPolicies().then((data) => {
            setRecords(data.data);
        }).catch((error) => {
            console.error(error);
        })
    }, [])

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = TableView(records, headCells, filterFn);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items;
                else
                    return items.filter(x => x.Policy_id.toString().includes(target.value) || x.Customer_id.toString().includes(target.value))
            }
        })
    }

    const addOrEdit = (policy, resetForm) => {
        const index = policy.index;
        const edit = Object.assign(policy);
        delete edit[index];
        policyService.updatePolicy(index, edit).then(() => {
            policyService.fetchAllPolicies().then((data) => {
                setRecords(data.data);
            }).catch((error) => {
                console.error(error);
            })
        }).catch((error) => {
            console.error(error);
        });
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
    }

    const openInPopup = (index, item) => {
        const edit = Object.assign(item);
        edit["index"] = index;
        setRecordForEdit(edit)
        setOpenPopup(true)
    }

    return (<>
        <Paper className={classes.pageContent}>
            <Toolbar>
                <Input
                    label="Search Policy ID or Customer ID"
                    className={classes.searchInput}
                    InputProps={{
                        startAdornment: (<InputAdornment position="start">
                            <Search />
                        </InputAdornment>)
                    }}
                    onChange={handleSearch}
                />
            </Toolbar>
            <TblContainer>
                <TblHead />
                <TableBody>
                    {
                        recordsAfterPagingAndSorting().map((item, index) =>
                            (<TableRow key={index}>
                                <TableCell>{item.Policy_id}</TableCell>
                                <TableCell>{item.Date_of_Purchase}</TableCell>
                                <TableCell>{item.Customer_id}</TableCell>
                                <TableCell>{item.Premium}</TableCell>
                                <TableCell>{item.Customer_Income_group}</TableCell>
                                <TableCell>{item.Customer_Region}</TableCell>
                                <TableCell>
                                    <Controls.ActionButton
                                        color="primary"
                                        onClick={() => { openInPopup(index, item) }}>
                                        <EditOutlinedIcon fontSize="small" />
                                    </Controls.ActionButton>
                                </TableCell>
                            </TableRow>)
                        )
                    }
                </TableBody>
            </TblContainer>
            <TblPagination />
        </Paper>
        <Popup
            title="Edit Policy details"
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
        >
            <EditPolicyForm
                recordForEdit={recordForEdit}
                addOrEdit={addOrEdit} />
        </Popup>
    </>
    );
}