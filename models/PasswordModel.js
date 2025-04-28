class PasswordModel {
    constructor() {
        this.STORAGE_KEY = 'googlePasswordManager';
        this.passwords = this.loadPasswords();
    }

    loadPasswords() {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    }

    savePasswords() {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.passwords));
    }

    addPassword({ website, username, password, notes = '' }) {
        const newPassword = {
            id: Date.now().toString(),
            website,
            username,
            password,
            notes,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        this.passwords.push(newPassword);
        this.savePasswords();
        return newPassword;
    }

    updatePassword(id, { website, username, password, notes = '' }) {
        const index = this.passwords.findIndex(p => p.id === id);
        if (index !== -1) {
            const updated = {
                ...this.passwords[index],
                website,
                username,
                password,
                notes,
                updatedAt: new Date().toISOString()
            };
            
            this.passwords[index] = updated;
            this.savePasswords();
            return updated;
        }
        return null;
    }

    deletePassword(id) {
        const index = this.passwords.findIndex(p => p.id === id);
        if (index !== -1) {
            const deleted = this.passwords.splice(index, 1);
            this.savePasswords();
            return deleted[0];
        }
        return null;
    }

    getPasswordById(id) {
        return this.passwords.find(p => p.id === id);
    }

    getAllPasswords() {
        return [...this.passwords];
    }

    searchPasswords(query) {
        if (!query) return this.getAllPasswords();
        
        const lowerQuery = query.toLowerCase();
        return this.passwords.filter(p => 
            p.website.toLowerCase().includes(lowerQuery) || 
            p.username.toLowerCase().includes(lowerQuery)
        );
    }
}