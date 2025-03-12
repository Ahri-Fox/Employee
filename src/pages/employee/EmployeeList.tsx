import React, { useRef, useState } from 'react'
import { SearchOutlined } from '@ant-design/icons';
import type { InputRef, TableColumnsType, TableColumnType } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import { Employee } from '../../models/Employee';

  type DataIndex = keyof Employee;

  const data: Employee[] = [
    {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      email: 'michael.lawson@reqres.in',
      avatar: 'https://reqres.in/img/faces/1-image.jpg',
    },
    {
      id: 2,
      first_name: 'John',
      last_name: '3',
      email: 'michael.lawson@reqres.in',
      avatar: 'https://reqres.in/img/faces/1-image.jpg',
    },
    {
      id: 3,
      first_name: 'John',
      last_name: '1',
      email: 'michael.lawson@reqres.in',
      avatar: 'https://reqres.in/img/faces/1-image.jpg',
    },
    
  ];


const EmployeeList : React.FC = () => {
    const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps['confirm'],
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<Employee> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <span style={{ backgroundColor: '#ffc069' }}>{text}</span>
      ) : (
        text
      ),    
  });

  const columns: TableColumnsType<Employee> = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: '10%',
        ...getColumnSearchProps('id'),
    },
    {
        title: 'Avatar',
        dataIndex: 'avatar',
        key: 'avatar',
        width: '10%',
        render: (image: string) => <img src={image} alt='Employee' style={{ width: '50px', height: '50px' }} />
    },
    {
      title: 'first name',
      dataIndex: 'first_name',
      key: 'first_name',
      width: '10%',
      ...getColumnSearchProps('first_name'),
    },
    {
      title: 'last name',
      dataIndex: 'last_name',
      key: 'last_name',
      width: '10%',
      ...getColumnSearchProps('last_name'),
    },
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
      width: '15%',
      ...getColumnSearchProps('email'),
    },
    
  ];

    return <Table<Employee> columns={columns} dataSource={data} />;
}

export default EmployeeList
