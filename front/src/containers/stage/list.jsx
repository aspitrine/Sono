import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Loader from '../../components/loader'
import { push } from 'react-router-redux'
import {
  getData
} from '../../modules/stage/list'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import { RaisedButton, FloatingActionButton } from 'material-ui'
import ContentAdd from 'material-ui/svg-icons/content/add';
import { Row, Col } from 'react-flexbox-grid';
import { blue500, orange500, red500, white } from 'material-ui/styles/colors';

class StageList extends Component {
  constructor(props) {
    super(props);
    props.getData();
  }
  render() {
    const { data, isLoading, changePage } = this.props;
    const style = {
      margin: 12,
    };
    return (
      <Row>
        <Loader loading={isLoading} />
        <h1>
          Liste des scènes
          <FloatingActionButton style={style} onTouchTap={() => changePage('/stage/edit')}>
            <ContentAdd />
          </FloatingActionButton>
        </h1>
        <Col xs={12}>
          <Table onCellClick={(rowIndex) => changePage(`/stage/${data[rowIndex]._id}`)}>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>Nom</TableHeaderColumn>
                <TableHeaderColumn>Instruments</TableHeaderColumn>
                <TableHeaderColumn>Actions</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} showRowHover>
              {
                data.map((d, i) => (
                  <TableRow key={`${i}${d.name}`}>
                    <TableRowColumn>{d.name}</TableRowColumn>
                    <TableRowColumn>{d.instruments.map(instrument => instrument.name).join(', ')}</TableRowColumn>
                    <TableRowColumn>
                      <div>
                        <RaisedButton
                          label="Musicien"
                          backgroundColor={blue500}
                          labelColor={white}
                          style={style}
                          onTouchTap={() => changePage(`/stage/show/${d._id}`)}
                          fullWidth
                        />
                      </div>
                      <div>
                        <RaisedButton
                          label="Sono"
                          backgroundColor={orange500}
                          labelColor={white}
                          style={style}
                          onTouchTap={() => changePage(`/stage/showSono/${d._id}`)}
                          fullWidth
                        />
                      </div>
                      <div>
                        <RaisedButton
                          label="Modifier"
                          backgroundColor={red500}
                          labelColor={white}
                          style={style}
                          onTouchTap={() => changePage(`/stage/edit/${d._id}`)}
                          fullWidth
                        />
                      </div>
                    </TableRowColumn>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = state => ({
  data: state.stageList.get('data').toJS(),
  isLoading: state.stageList.get('isLoading')
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getData,
  changePage: (page) => push(page)
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StageList)
