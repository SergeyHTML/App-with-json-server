import React, {Component} from 'react';
import PropTypes from "prop-types";
import './style.scss';
import {connect} from 'react-redux'
import {loadMissions, saveArchive} from '../../AC'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import Loading from '../Loading'
import AddMission from '../AddMission'

class TableMissions extends Component {
    static propTypes = {
        missions: PropTypes.array.isRequired
    };

    constructor(props) {
        super(props);

        this.options = {
            defaultSortName: 'degree',
            defaultSortOrder: 'desc',
            noDataText: 'There is no data to display. Please to add new mission'
        };
    }

    componentDidMount() {
        const {loadMissions, isLoading, isLoaded} = this.props;
        if (!isLoading && !isLoaded) loadMissions();
    }

    render() {
        const {missions, isLoading} = this.props;

        if (!isLoading) this.additionDegree(missions);

        return (
            <div className="container">
                <AddMission />
                <div className="form-row">
                    <div className="col">
                        <button className='btn btn-danger' onClick={this.handleDelete()}>Archive Missions</button>

                    </div>
                </div>
                <div className="table-wrap">
                    {isLoading ? <Loading /> : <BootstrapTable data={missions} striped options={ this.options } version='4'>
                        <TableHeaderColumn isKey dataField='id' hidden>ID</TableHeaderColumn>
                        <TableHeaderColumn dataField='degree' hidden>Degree</TableHeaderColumn>
                        <TableHeaderColumn dataField='agent' dataSort >Agent ID</TableHeaderColumn>
                        <TableHeaderColumn dataField='country' dataSort>Country</TableHeaderColumn>
                        <TableHeaderColumn dataField='address' >Address</TableHeaderColumn>
                        <TableHeaderColumn dataField='date' dataSort>Date</TableHeaderColumn>
                    </BootstrapTable>}
                </div>

            </div>

        )

    }

    handleDelete = () => () => {
        const {saveArchive} = this.props;

        saveArchive();
    };

    additionDegree = (missions) => {
        let countriesObj = {},
            agentsObj = {};

        missions.forEach((item) => {
            agentsObj[item.agent]
                ? agentsObj[item.agent] = agentsObj[item.agent].concat(item.country)
                : agentsObj[item.agent] = [].concat(item.country);
        });

        missions.forEach((item) => {
            if (agentsObj[item.agent].length === 1) {
                countriesObj[item.country]
                    ? countriesObj[item.country] = countriesObj[item.country].concat(item.agent)
                    : countriesObj[item.country] = [].concat(item.agent);
            }

        });

        missions.map((item) => {
            return item['degree'] = countriesObj[item.country] ? countriesObj[item.country].length : 0
        })
    }
}

export default connect((state) =>({
    missions: state.missions.entities.valueSeq().toArray(),
    isLoading: state.missions.loading,
    isLoaded: state.missions.loaded,
    isError: state.missions.error
}), {loadMissions, saveArchive})(TableMissions) ;
