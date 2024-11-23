export default function UserForm({ name, email, phone, handleSave, isEdit, handleChange }) {
    return (
        <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
            <input type="text" placeholder="Имя" value={name} onChange={handleChange('name')} required />
            <input type="email" placeholder="Email" value={email} onChange={handleChange('email')} required />
            <input type="tel" placeholder="Телефон" value={phone} onChange={handleChange('phone')} required />
            <button type="submit">{isEdit ? 'Сохранить' : 'Добавить'}</button>
        </form>
    );
};
