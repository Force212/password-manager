class ListController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        
        this.initialize();
    }
    
    initialize() {
        this.displayPasswords();
        this.setupEventHandlers();
    }
    
    displayPasswords() {
        const passwords = this.model.getAllPasswords();
        this.view.render(passwords);
    }
    
    setupEventHandlers() {
        this.view.bindViewPassword(this.handleViewPassword.bind(this));
        this.view.bindEditPassword(this.handleEditPassword.bind(this));
        this.view.bindDeletePassword(this.handleDeletePassword.bind(this));
        this.view.bindSearch(this.handleSearch.bind(this));
    }
    
    handleViewPassword(id) {
        const password = this.model.getPasswordById(id);
        if (password) {
            alert(`Password for ${password.website}:\nUsername: ${password.username}\nPassword: ${password.password}`);
        }
    }
    
    handleEditPassword(id) {
        // This will be handled by the App controller
        return id;
    }
    
    handleDeletePassword(id) {
        // This will be handled by the App controller
        return id;
    }
    
    handleSearch(query) {
        const results = this.model.searchPasswords(query);
        this.view.render(results);
    }
}