import React, { Component } from 'react';
import { Table as AntTable } from 'antd';
import PropTypes from 'prop-types';
import './Table.css';

class Table extends Component {
  render() {
    let { data, pagination, loading, columnNames, rowKey, fixedColumns, actionButtons, emptyText } = this.props;
    let columns = [];
    let scroll = {
      x: 0
    };
    if (data.length || columnNames) {
      let keys = [];
      if (data.length) {
        let firstItem = data[0];
        keys = Object.keys(firstItem);
      }
      keys.forEach(key => {
        let title = columnNames[key];
        let columnObject = {
          title,
          dataIndex: key,
          render: text => {
            let className = '';
            if (typeof text === 'boolean') {
              text = '' + text;
            }
            if (text && typeof text === 'object') {
              if (text.updated) {
                className = 'updatedValue';
              }
              text = text.value;
            }
            return {
              props: {
                className: className // there it is!
              },
              children: text
            };
          }
        };
        if (fixedColumns && Array.isArray(fixedColumns) && fixedColumns.indexOf(key) > -1) {
          columnObject['fixed'] = 'left';
          scroll = { x: 1300 };
        }
        columns.push(columnObject);
      });
    }

    if (actionButtons) {
      columns = columns.concat(actionButtons);
    }

    let paginationOptions = false;
    if (pagination) {
      paginationOptions = Object.assign(
        {},
        {
          total: pagination.num_records,
          pageSize: 100,
          value: pagination.current_page,
          current: pagination.current_page,
          onChange: pagination.onChange
        }
      );
    }
    emptyText = emptyText || 'No data found';
    let onRow = null;
    if (this.props.onClick) {
      onRow = record => ({
        onClick: () => this.props.onClick(record)
      });
    }
    return (
      <div className='data-table'>
        <AntTable
          rowKey={rowKey}
          locale={{ emptyText: emptyText }}
          columns={columns}
          dataSource={data}
          bordered={true}
          onChange={this.handleChange}
          pagination={paginationOptions}
          loading={{
            spinning: loading,
            wrapperClassName: 'data-table'
          }}
          onRow={onRow}
          scroll={scroll}
        />
      </div>
    );
  }
}

Table.propTypes = {
  data: PropTypes.array.isRequired,
  pagination: PropTypes.object,
  loading: PropTypes.bool,
  columnNames: PropTypes.object,
  rowKey: PropTypes.string,
  fixedColumns: PropTypes.array,
  actionButtons: PropTypes.array,
  emptyText: PropTypes.string,
  onClick: PropTypes.func
};

Table.defaultProps = {
  pagination: null,
  loading: false,
  rowKey: 'id',
  fixedColumns: [],
  actionButtons: [],
  emptyText: 'No data found'
};

export default Table;
