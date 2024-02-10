import './Header.scss'
import {DesktopOutlined, PieChartOutlined,} from '@ant-design/icons'
import {Button, Divider, Menu, Switch} from 'antd';
import {useState} from "react";
import {Link} from "react-router-dom";


// get items
const items = [
    {
        label: (
            <Link to='/'>Home</Link>
        ),
        key: '1',
        icon: <PieChartOutlined />
    },
    {
        label: (
            <Link to='/other'>Other</Link>
        ),
        key: '2',
        icon: <DesktopOutlined />
    },
]


const Header = () => {

    const [collapsed, setCollapsed] = useState(false)

    const [theme, setTheme] = useState('light');
    const changeTheme = (value) => {
        setTheme(value ? 'dark' : 'light');
    };

    return (
        <div className='header'>
            <div className="header__inner">
                <Button type="primary" onClick={() => setCollapsed(!collapsed)} style={{ marginBottom: 16 }}>
                    {!collapsed ? <i className="fa-solid fa-bars"/> : <i className="fa-solid fa-xmark"/>}
                </Button>
                <Divider type="vertical" />
                <Switch
                    checked={theme === 'dark'}
                    onChange={changeTheme}
                    checkedChildren="Dark"
                    unCheckedChildren="Light"
                />
            </div>
            <Menu
                defaultSelectedKeys={['1']}
                mode="inline"
                theme={theme}
                inlineCollapsed={!collapsed}
                items={items}
            />
        </div>
    );
};

export default Header;
