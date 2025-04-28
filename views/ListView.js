class ListView {
    constructor() {
        this.container = document.getElementById('password-list-container');
    }

    render(passwords) {
        if (passwords.length === 0) {
            this.container.innerHTML = `
                <div class="empty-state">
                    <span class="material-icons">lock</span>
                    <h3>No passwords saved</h3>
                    <p>Add a password to get started</p>
                </div>
            `;
            return;
        }

        const tableHTML = `
            <table class="password-table">
                <thead>
                    <tr>
                        <th>Website</th>
                        <th>Username</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${passwords.map(pwd => `
                        <tr data-id="${pwd.id}">
                            <td>
                                <div class="website-cell">
                                    <div class="website-icon">
                                        ${this.getWebsiteInitial(pwd.website)}
                                    </div>
                                    <span>${pwd.website}</span>
                                </div>
                            </td>
                            <td>${pwd.username}</td>
                            <td class="actions-cell">
                                <button class="action-btn view-btn" title="View password">
                                    <span class="material-icons">visibility</span>
                                </button>
                                <button class="action-btn edit-btn" title="Edit">
                                    <span class="material-icons">edit</span>
                                </button>
                                <button class="action-btn delete-btn" title="Delete">
                                    <span class="material-icons">delete</span>
                                </button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;

        this.container.innerHTML = tableHTML;
    }

    getWebsiteInitial(website) {
        // Extract the main part of the website (without www or .com)
        const clean = website.replace(/^(www\.|https?:\/\/)/, '').split('.')[0];
        return clean.charAt(0).toUpperCase();
    }

    bindViewPassword(handler) {
        this.container.addEventListener('click', e => {
            if (e.target.closest('.view-btn')) {
                const id = e.target.closest('tr').dataset.id;
                handler(id);
            }
        });
    }

    bindEditPassword(handler) {
        this.container.addEventListener('click', e => {
            if (e.target.closest('.edit-btn')) {
                const id = e.target.closest('tr').dataset.id;
                handler(id);
            }
        });
    }

    bindDeletePassword(handler) {
        this.container.addEventListener('click', e => {
            if (e.target.closest('.delete-btn')) {
                const id = e.target.closest('tr').dataset.id;
                handler(id);
            }
        });
    }

    bindSearch(handler) {
        const searchInput = document.getElementById('search-input');
        searchInput.addEventListener('input', () => {
            handler(searchInput.value);
        });
    }
}