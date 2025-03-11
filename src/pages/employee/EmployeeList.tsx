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
        name: 'John Brown',
        age: 18,
        phone: '0987654321',
        country: 'USA',
        isAvailable: true,
        image: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",  
    },
    {
        id: 2,
        name: 'Jim Green',
        age: 24,
        phone: '0987654321',
        country: 'UK',
        isAvailable: false,
        image: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",  
    },
    {
        id: 3,
        name: 'Joe Black',
        age: 30,
        phone: '0987654321',
        country: 'AUS',
        isAvailable: true,
        image: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",  
    },
    {
        id: 4,
        name: 'Jim Red',
        age: 35,
        phone: '0987654321',
        country: 'IND',
        isAvailable: false,
        image: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",  
    }
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
        title: 'Image',
        dataIndex: 'image',
        key: 'image',
        width: '10%',
        render: (image: string) => <img src={image} alt='Employee' style={{ width: '50px', height: '50px' }} />
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '10%',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: '10%',
      ...getColumnSearchProps('age'),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      width: '15%',
      ...getColumnSearchProps('phone'),
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
      width: '10%',
      ...getColumnSearchProps('country'),
    },
    {
      title: 'Is Available',
      dataIndex: 'isAvailable',
      key: 'isAvailable',
      width: '10%',
      ...getColumnSearchProps('isAvailable'),
    },
    
  ];

    return <Table<Employee> columns={columns} dataSource={data} />;
}

export default EmployeeList
