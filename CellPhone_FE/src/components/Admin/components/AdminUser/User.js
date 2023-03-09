import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteUser, getAllUser } from '../../../../actions/UserAction';
import { DeleteOutlined} from '@ant-design/icons';
import { message} from 'antd';

function User(props) {
    const {user, number} = props
    const success = () => {
        message.success({
            content: `Xóa ${user.name} thành công`,
            duration: 1,
            className: 'custom-class',
            style: {
                position: 'absolute',
                right: '2rem',
                top: '2rem',
                margin: '1rem 0'
            },
          });
      };
    const dispatch = useDispatch()
    const handleDeleteUser = async (user) => {
      
        await dispatch(deleteUser(user._id))
        success()
        dispatch(getAllUser())
    }

    return (
        <tr>
            <td>{number + 1}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.address}</td>
            <td>{user.phone}</td>
            <td className="delete-user"onClick={() => handleDeleteUser(user)}><DeleteOutlined /></td>
        </tr>
    );
}

export default User;