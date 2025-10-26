/**
 * TABLE-UTILS.JS - Common table utility functions with pagination
 * Reusable table components for Bible Study application
 */

class TableManager {
    constructor(config) {
        this.config = {
            containerId: config.containerId,
            tableId: config.tableId,
            tableBodyId: config.tableBodyId,
            paginationId: config.paginationId,
            showingCountId: config.showingCountId,
            prevBtnId: config.prevBtnId,
            nextBtnId: config.nextBtnId,
            paginationControlsId: config.paginationControlsId,
            itemsPerPage: config.itemsPerPage || 10,
            columns: config.columns || [],
            onRowClick: config.onRowClick || null,
            data: [],
            currentPage: 1,
            filteredData: []
        };
        
        this.init();
    }

    init() {
        this.renderTable();
        this.setupEventListeners();
    }

    renderTable() {
        const container = document.getElementById(this.config.containerId);
        if (!container) return;

        container.innerHTML = `
            <div class="table-container">
                <table class="table" id="${this.config.tableId}">
                    <thead>
                        <tr>
                            ${this.config.columns.map(col => `<th>${col.header}</th>`).join('')}
                        </tr>
                    </thead>
                    <tbody id="${this.config.tableBodyId}">
                        <!-- Table content will be populated by JavaScript -->
                    </tbody>
                </table>
            </div>
        `;
    }

    setupEventListeners() {
        // Store this instance globally for onclick handlers
        if (!window.tableManagers) {
            window.tableManagers = {};
        }
        window.tableManagers[this.config.containerId] = this;
    }

    setData(data) {
        this.config.data = data;
        this.config.filteredData = [...data];
        this.config.currentPage = 1;
        this.updateTable();
    }

    filterData(filterFn) {
        this.config.filteredData = this.config.data.filter(filterFn);
        this.config.currentPage = 1;
        this.updateTable();
    }

    updateTable() {
        const tbody = document.getElementById(this.config.tableBodyId);
        if (!tbody) return;

        tbody.innerHTML = '';

        // Show all items without pagination
        const itemsToShow = this.config.filteredData;

        itemsToShow.forEach((item, index) => {
            const row = document.createElement('tr');
            row.className = 'table-row';
            row.style.cursor = 'pointer';
            
            if (this.config.onRowClick) {
                row.onclick = () => this.config.onRowClick(item, index);
            }

            // Generate cells based on column configuration
            const cells = this.config.columns.map(col => {
                if (col.render) {
                    return col.render(item, index);
                } else {
                    return `<td class="${col.className || ''}">${this.getNestedValue(item, col.key) || ''}</td>`;
                }
            }).join('');

            row.innerHTML = cells;
            tbody.appendChild(row);
        });

        this.updateShowingCount();
    }

    getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => current && current[key], obj);
    }

    updateShowingCount() {
        const showingCount = document.getElementById(this.config.showingCountId);
        if (showingCount) {
            showingCount.textContent = `Showing ${this.config.filteredData.length}`;
        }
    }

    getCurrentData() {
        return this.config.filteredData;
    }

    getTotalPages() {
        return Math.ceil(this.config.filteredData.length / this.config.itemsPerPage);
    }

    getCurrentPage() {
        return this.config.currentPage;
    }
}

// Utility function to create status badges
function createStatusBadge(status, type = 'default') {
    const statusMap = {
        'righteous': { class: 'status-righteous', text: 'Righteous' },
        'good': { class: 'status-good', text: 'Good' },
        'evil': { class: 'status-evil', text: 'Evil' },
        'wicked': { class: 'status-wicked', text: 'Wicked' },
        'mixed': { class: 'status-mixed', text: 'Mixed' },
        'bold': { class: 'status-righteous', text: 'Bold' },
        'gentle': { class: 'status-good', text: 'Gentle' },
        'faithful': { class: 'status-neutral', text: 'Faithful' }
    };

    const statusKey = status.toLowerCase();
    const statusInfo = statusMap[statusKey] || { class: 'status-neutral', text: status };
    
    return `<span class="status-badge ${statusInfo.class}">${statusInfo.text}</span>`;
}

// Utility function to create info button
function createInfoButton(onClickHandler, index) {
    return `<td class="info-cell">
        <button class="info-btn audio-btn" onclick="event.stopPropagation(); ${onClickHandler}(${index})">
            <div class="audio-icon-animated">
                <div class="sound-bar bar1"></div>
                <div class="sound-bar bar2"></div>
                <div class="sound-bar bar3"></div>
                <div class="sound-bar bar4"></div>
            </div>
        </button>
    </td>`;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TableManager, createStatusBadge, createInfoButton };
}

// Make available globally
window.TableManager = TableManager;
window.createStatusBadge = createStatusBadge;
window.createInfoButton = createInfoButton;
