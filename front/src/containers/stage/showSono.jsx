import _ from 'lodash';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Loader from '../../components/loader'
import { push } from 'react-router-redux'
import { RaisedButton, Card, CardActions, CardHeader, CardText, TextField, SelectField, MenuItem, List, ListItem, Avatar, Subheader, Divider } from 'material-ui'
import { getData, addAction, actionDone } from '../../modules/stage/showSono'
import { Row, Col } from 'react-flexbox-grid'
import RemoveIcon from 'material-ui/svg-icons/content/remove';
import AddIcon from 'material-ui/svg-icons/content/add';
import { red500, green500, white } from 'material-ui/styles/colors';
import SvgIcon from '../../components/svgIcon';
import io from 'socket.io-client'
const socket = io();

class StageShowSono extends Component {
  constructor(props) {
    super(props);
    if(props.match.params.id) {
      props.getData(props.match.params.id);
    }
  }

  componentDidMount() {
    socket.emit('joinRoom', this.props.match.params.id);
    socket.on('actionTodo', action => {
      console.log(action);
      this.props.addAction(action);
    });
  }

  componentWillUnmount() {
    socket.removeListener('actionTodo');
  }

  onClickAction(action) {
    this.props.actionDone(action);
    socket.emit('actionDone', { _id: this.props.match.params.id, action: action });
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
                      <List>
                        <Subheader>Actions</Subheader>
                        {
                          _.filter(data.actions, a => {
                            return (a.from.name === d.name && a.from.value === d.instrument.value);
                          }).map((a, indexAction) => (
                            <div key={`${index}${indexAction}action`}>
                              <ListItem
                                primaryText={a.up ? `Augmenter ${a.for.name} - ${a.for.instrument.label}` : `Réduire ${a.for.name} - ${a.for.instrument.label}`}
                                rightAvatar={<Avatar src={`/${a.for.instrument.value}.svg`} />}
                                leftIcon={a.up ? <AddIcon /> : <RemoveIcon />}
                                style={{ color: a.up ? green500 : red500 }}
                                onTouchTap={() => this.onClickAction(a)}
                              />
                              <Divider />
                            </div>
                          ))
                        }
                      </List>
                    </CardText>
                  </Card>
                </Col>
              ))
            }
          </Row>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  data: state.stageShowSono.get('data').toJS(),
  isLoading: state.stageShowSono.get('isLoading'),
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getData,
  addAction,
  actionDone,
  changePage: (page) => push(page)
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StageShowSono)
