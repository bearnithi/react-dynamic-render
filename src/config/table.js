// formValues.map((value, index) => ({ key: index, ...value }))
export const tableJson = {
    type: 'table',
    props: {
      dataSource: [],
      columns: [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: 'Message',
          dataIndex: 'message',
          key: 'message',
        },
      ],
    },
  };