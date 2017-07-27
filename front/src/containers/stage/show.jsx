import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Loader from '../../components/loader';
import { push } from 'react-router-redux';
import { RaisedButton, Card, CardActions, CardHeader, CardText, TextField, SelectField, MenuItem, Subheader, List, ListItem, Avatar, Divider } from 'material-ui';
import { getData, changeCurrentInstrument, addAction, setActions } from '../../modules/stage/show';
import { Row, Col } from 'react-flexbox-grid';
import RemoveIcon from 'material-ui/svg-icons/content/remove';
import AddIcon from 'material-ui/svg-icons/content/add';
import { red500, green500, white } from 'material-ui/styles/colors';
import SvgIcon from '../../components/svgIcon';
import io from 'socket.io-client';
import _ from 'lodash';
const socket = io();

class StageShow extends Component {
  constructor(props) {
    super(props);
    if(props.match.params.id) {
      props.getData(props.match.params.id);
    }
  }

  componentDidMount() {
    socket.on('actionDone', actions => {
      this.props.setActions(actions);
    });
  }

  componentWillUnmount() {
    socket.removeListener('actionDone');
  }

  onClickTurnVolume(up, d) {
    const action = { up: up, for: d, from: {
      ...this.props.currentInstrument,
      name: this.props.data.instruments[this.props.currentInstrument.index].name
    }, _id: this.props.match.params.id };
    socket.emit('actionTurnVolume', action);
    this.props.addAction(action);
  }

  onChangeCurrentInstrument(i) {
    socket.emit('joinRoom', `${this.props.match.params.id}${this.props.data.instruments[i].name}`);
    this.props.changeCurrentInstrument(i);
    this.props.getData(this.props.match.params.id);
  }

  render() {
    const { data, isLoading, currentInstrument } = this.props;
    const style = {
      margin: 12,
    };
    const styleCenter = {
      textAlign: 'center'
    };

    return (
      <div>
        <Loader loading={isLoading} />
        <h2 style={styleCenter}>{data.name}</h2>
        <SelectField floatingLabelText="Instrument" value={currentInstrument.index} onChange={(e, i, v) => this.onChangeCurrentInstrument(i)} fullWidth>
          {data.instruments.map((instru, indexInstru) => (<MenuItem value={indexInstru} primaryText={`${instru.name} - ${instru.instrument.label}`} key={`${indexInstru}${instru.value}`} />))}
        </SelectField>
        <div style={{ marginTop: '20px' }}>
          <Row>
            {
              data.instruments.map((d, index) => (
                <Col xs={12} md={6} key={`${index}${d.name}`} style={{ marginBottom: '15px' }}>
                  <Card>
                    <CardText style={styleCenter} >
                      {d.name} - {d.instrument.label}
                    </CardText>
                    <CardText>
                      <SvgIcon src={`/${d.instrument.value}.svg`} />
                    </CardText>
                    <CardText>
                      <Row>
                        <Col xs={6}>
                          <RaisedButton
                            backgroundColor={red500}
                            labelColor={white}
                            icon={<RemoveIcon />}
                            disabled={currentInstrument.index === false}
                            onTouchTap={() => this.onClickTurnVolume(false, d)}
                            fullWidth
                          />
                        </Col>
                        <Col xs={6}>
                          <RaisedButton
                            backgroundColor={green500}
                            labelColor={white}
                            icon={<AddIcon />}
                            disabled={currentInstrument.index === false}
                            onTouchTap={() => this.onClickTurnVolume(true, d)}
                            fullWidth
                          />
                        </Col>
                      </Row>
                    </CardText>
                  </Card>
                </Col>
              ))
            }
          </Row>
        </div>
        <div style={{ marginTop: '20px' }}>
          <List>
            <Subheader>Actions</Subheader>
            {
              _.filter(data.actions, a => {
                return (
                  data.instruments[currentInstrument.index]
                  && a.from.name === data.instruments[currentInstrument.index].name
                  && a.from.value === currentInstrument.value
                );
              }).map((a, indexAction) => (
                <div key={`${indexAction}action`}>
                  <ListItem
                    primaryText={a.up ? `Augmenter ${a.for.name} - ${a.for.instrument.label}` : `Réduire ${a.for.name} - ${a.for.instrument.label}`}
                    rightAvatar={<Avatar src={`/${a.for.instrument.value}.svg`} />}
                    leftIcon={a.up ? <AddIcon /> : <RemoveIcon />}
                    style={{ color: a.up ? green500 : red500 }}
                  />
                  <Divider />
                </div>
              ))
            }
          </List>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  data: state.stageShow.get('data').toJS(),
  instruments: state.instrument.get('data').toJS(),
  isLoading: state.stageShow.get('isLoading'),
  currentInstrument: state.stageShow.get('currentInstrument').toJS()
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getData,
  changeCurrentInstrument,
  addAction,
  setActions,
  changePage: (page) => push(page)
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StageShow)
