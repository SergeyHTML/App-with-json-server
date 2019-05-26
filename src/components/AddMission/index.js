import React, {Component} from 'react';
import './style.scss';
import 'react-datepicker/dist/react-datepicker.css'
import Loading from '../Loading'
import moment from 'moment'
import {addMission} from '../../AC'
import {connect} from 'react-redux'
import DatePicker from 'react-datepicker'

class AddMission extends Component {

    constructor(props) {
        super(props);

        this.state = {
            agent: '',
            country: '',
            address: '',
            startDate: '',
            date: ''
        }

    }
    
    render() {
        const {isLoading} = this.props;

        return (
            <form onSubmit = {this.handleSubmit}>
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label htmlFor="agent" className="">Agent ID</label>
                        <input id="agent" value = {this.state.agent} className='form-control' onChange = {this.handleChange('agent')} />
                    </div>

                    <div className="form-group col-md-4">
                        <label htmlFor="country" className="">Country</label>
                        <input id="country" value = {this.state.country} className='form-control' onChange = {this.handleChange('country')} />
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="date" className="">Date</label>

                        <div>
                            <DatePicker
                                selected={this.state.startDate}
                                onChange={this.handleChangeDate}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                dateFormat="MMMM d, yyyy h:mm aa"
                                timeCaption="time"
                                className="form-control container-fluid"
                            />
                        </div>
                    </div>

                </div>
                <div className="form-row">
                    <div className="form-group col-md-12">
                        <label htmlFor="address" className="">Address</label>
                        <input id="address"  value = {this.state.address} className='form-control' onChange = {this.handleChange('address')} />
                    </div>

                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">

                        <input disabled={this.setDisabled()} className='btn btn-primary' type = "submit" value = "Add Mission"/>

                    </div>
                </div>

                {isLoading ? <Loading/> : null}
            </form>
        )
    }

    handleSubmit = ev => {
        ev.preventDefault();
        const {addMission} = this.props;

        let dataSend = {
            agent: this.state.agent,
            country: this.state.country,
            address: this.state.address,
            date: this.state.date
        };

        addMission(dataSend);

        this.setState({
            agent: '',
            country: '',
            address: '',
            startDate: '',
            date: ''
        })

    };

    setDisabled = () => {
        return (this.state.agent.length === 0 || this.state.country.length === 0 || this.state.address.length === 0 || !this.state.date) ? 'disabled' : null
    };

    handleChangeDate = (date) => {
        this.setState({
            startDate: date,
            date: moment(date).format('MMM D, YYYY, h:mm:ss A')
        });
    };

    handleChange = type => ev => {
        let {value} = ev.target;

        this.setState({
            [type]: value
        });
    };

}

export default connect((state) =>({
    isLoading: state.missions.loading
}), {addMission})(AddMission)
