import { useState } from 'react';

export default function UserTable({ users, handleDelete, handleEdit }) {
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
    const [filter, setFilter] = useState('');
    const [editingUserId, setEditingUserId] = useState(null);
    const [editedUser, setEditedUser] = useState({ name: '', email: '', phone: '' });

    const sortedUsers = [...users]
        .sort((a, b) => {
            const order = a[sortConfig.key]?.localeCompare(b[sortConfig.key]);
            return sortConfig.direction === 'ascending' ? order : -order;
        })
        .filter(user =>
            [user.name, user.email, user.phone].some(field =>
                field.toLowerCase().includes(filter.toLowerCase())
            )
        );

    const requestSort = (key) => {
        const direction = sortConfig.key === key && sortConfig.direction === 'ascending' ? 'descending' : 'ascending';
        setSortConfig({ key, direction });
    };

    const handleEditChange = (field, value) => {
        setEditedUser(prev => ({ ...prev, [field]: value }));
    };
    const getSortClassName = (key) => {
        return sortConfig.key === key
            ? (sortConfig.direction === 'ascending' ? 'ascending' : 'descending')
            : '';
    };

    const handleAction = (action, user) => {
        switch (action) {
            case 'edit':
                setEditingUserId(user.id);
                setEditedUser({ name: user.name, email: user.email, phone: user.phone });
                break;
            case 'save':
                if (editingUserId !== null) {
                    handleEdit(editingUserId, editedUser);
                    setEditingUserId(null);
                }
                break;
            case 'cancel':
                setEditingUserId(null);
                break;
            case 'delete':
                handleDelete(user.id);
                break;
            default:
                break;
        }
    };

    return <>
        <div>
            <input
                type="text"
                placeholder="Поиск по таблице"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            />
            <table>
                <thead>
                    <tr>
                        <th className={getSortClassName('name')} onClick={() => requestSort('name')}>Имя</th>
                        <th className={getSortClassName('email')} onClick={() => requestSort('email')}>Email</th>
                        <th className={getSortClassName('phone')} onClick={() => requestSort('phone')}>Телефон</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedUsers.map(user => (
                        <tr key={user.id}>
                            <td>
                                {editingUserId === user.id ? (
                                    <input
                                        type="text"
                                        value={editedUser.name}
                                        onChange={(e) => handleEditChange('name', e.target.value)}
                                    />
                                ) : (
                                    user.name
                                )}
                            </td>
                            <td>
                                {editingUserId === user.id ? (
                                    <input
                                        type="email"
                                        value={editedUser.email}
                                        onChange={(e) => handleEditChange('email', e.target.value)}
                                    />
                                ) : (
                                    user.email
                                )}
                            </td>
                            <td>
                                {editingUserId === user.id ? (
                                    <input
                                        type="text"
                                        value={editedUser.phone}
                                        onChange={(e) => handleEditChange('phone', e.target.value)}
                                    />
                                ) : (
                                    user.phone
                                )}
                            </td>
                            <td>
                                {editingUserId === user.id ? (
                                    <>
                                        <button onClick={() => handleAction('save')}>Сохранить</button>
                                        <button onClick={() => handleAction('cancel')}>Отмена</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => handleAction('edit', user)}>Редактировать</button>
                                        <button onClick={() => handleAction('delete', user)}>Удалить</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>;
}
