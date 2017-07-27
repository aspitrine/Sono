import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Loader from '../../components/loader'
import { push } from 'react-router-redux'
import { RaisedButton, Card, CardActions, CardHeader, CardText, TextField, SelectField, MenuItem } from 'material-ui'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import { getData, addInstrument, removeInstrument, onChangeName, save, remove } from '../../modules/stage/edit'
import { Row, Col } from 'react-flexbox-grid'

class StageEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      instrument: {
        value: '',
        label: ''
      }
    };
    if(props.match.params.id) {
      props.getData(props.match.params.id);
    }
  }

  handleChangeInstrument = (event, index, value) => {
    this.setState({ instrument: this.props.instruments[index] });
  }
  handleChangeName = (event) => this.setState({ name: event.target.value });

  onClickAddInstrument = () => {
    this.props.addInstrument(this.state);
    this.setState({ name: '', instrument: '' });
  }

  render() {
    const { data, isLoading, instruments } = this.props;
    const { name, instrument } = this.state;
    const style = {
      margin: 12,
    };

    return (
      <div>
        <Loader loading={isLoading} />
        <Row style={{ marginTop: '10px' }}>
          <Col xs={6}>
            <RaisedButton label="Sauvegarder" disabled={data.name === ''} primary fullWidth onTouchTap={this.props.save} />
          </Col>
          <Col xs={6}>
            { this.props.match.params.id && <RaisedButton label="Supprimer" secondary fullWidth onTouchTap={this.props.remove} /> }
          </Col>
        </Row>
        <TextField
          fullWidth
          hintText="Louange du dimanche"
          floatingLabelText="Nom de la scène"
          value={data.name}
          onChange={(e) => this.props.onChangeName(e.target.value)}
        />
        <Card>
          <CardHeader
            title="Ajouter un instrument"
          />
          <CardText>
            <Row>
              <Col xs={4}>
                <TextField
                  fullWidth
                  hintText="Voc 1"
                  floatingLabelText="Nom"
                  value={name}
                  onChange={this.handleChangeName}
                />
              </Col>
              <Col xs={4}>
                <SelectField floatingLabelText="Instrument" value={instrument.value} onChange={this.handleChangeInstrument} fullWidth>
                  {instruments.map((instru, indexInstru) => (<MenuItem value={instru.value} primaryText={instru.label} key={`${indexInstru}${instru.value}`} />))}
                </SelectField>
              </Col>
              <Col xs={4} style={{ display: 'flex' }}>
                <div style={{ margin: 'auto', width: '100%' }}>
                  <RaisedButton label="Ajouter" disabled={name === '' || instrument === ''} primary fullWidth onTouchTap={this.onClickAddInstrument} />
                </div>
              </Col>
            </Row>
          </CardText>
        </Card>
        <div style={{ marginTop: '20px' }}>
          <Table>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>Nom</TableHeaderColumn>
                <TableHeaderColumn>Instrument</TableHeaderColumn>
                <TableHeaderColumn>Action</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} showRowHover>
              {
                data.instruments.map((d, index) => (
                  <TableRow key={`${index}${d.name}`}>
                    <TableRowColumn>{d.name}</TableRowColumn>
                    <TableRowColumn>{d.instrument.label}</TableRowColumn>
                    <TableRowColumn>
                      <RaisedButton label="Supprimer" secondary style={style} onTouchTap={() => this.props.removeInstrument(index)} />
                    </TableRowColumn>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  data: state.stageEdit.get('data').toJS(),
  instruments: state.instrument.get('data').toJS(),
  isLoading: state.stageEdit.get('isLoading')
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getData,
  addInstrument,
  removeInstrument,
  onChangeName,
  save,
  remove,
  changePage: (page) => push(page)
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StageEdit)
