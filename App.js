class App {
    constructor() {
        this.model = new PasswordModel();
        
        this.listView = new ListView();
        this.addView = new AddView();
        this.editView = new EditView();
        this.deleteView = new DeleteView();
        
        this.listController = new ListController(this.model, this.listView);
        this.addController = new AddController(
            this.model, 
            this.addView, 
            this.listController // Передаем listController для обновления списка
        );
        this.editController = new EditController(
            this.model, 
            this.editView, 
            this.listController
        );
        this.deleteController = new DeleteController(
            this.model,
            this.deleteView,
            this.listController
        );
        
        this.setupGlobalEventHandlers();
    }
    
    setupGlobalEventHandlers() {
        this.listView.bindEditPassword(id => {
            this.editController.showEditModal(id);
        });
        
        this.listView.bindDeletePassword(id => {
            this.deleteController.showDeleteModal(id);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new App();
});