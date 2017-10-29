/** 调单列表表头信息 */
export const EMPLOYEE_LIST_COLUMN = [
    {
        key: 'loginName',
        width: '15%',
        title: '登录名',
        dataIndex: 'loginName',
    },
    {
        key: 'name',
        width: '15%',
        title: '真实姓名',
        dataIndex: 'name',
    },
    {
        key: 'gender',
        width: '10%',
        title: '性别',
        dataIndex: 'gender',
    },
    {
        key: 'level',
        width: '10%',
        title: '级别',
        dataIndex: 'level',
    },
    {
        key: 'position',
        width: '15%',
        title: '职位',
        dataIndex: 'position',
    },
    {
        key: 'mobile',
        width: '15%',
        title: '手机号码',
        dataIndex: 'mobile',
    },
];

/**
 * the employee position list
 */
export const EMPLOYEE_POSITION = [
    { text: '产品经理', value: 'PO' },
    { text: '全栈开发', value: 'ALL'},
    { text: 'UI开发工程师', value: 'UI' },
    { text: 'JAVA开发工程师', value: 'JAVA' },
    { text: 'Android开发工程师', value: 'ANDROID' },
    { text: 'WEB前端开发工程师', value: 'WEB' },
];

/**
 * the employee level list
 */
export const EMPLOYEE_LEVEL = [
    { text: '管理员', value: 'ADMIN' },
    { text: '普通员工', value: 'NORMAL'},
];