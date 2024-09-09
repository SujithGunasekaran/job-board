import Dexie from 'dexie';

// Mock implementation of Dexie
class MockTable {
    constructor(data = []) {
        this.data = data;
    }

    where(field) {
        return {
            equals: (value) => ({
                each: (callback) => {
                    this.data.filter(item => item[field] === value).forEach(callback);
                }
            })
        };
    }
}

class MockDexie extends Dexie {
    constructor() {
        super('MockDB');
        this.tables = {};
    }

    table(name) {
        if (!this.tables[name]) {
            this.tables[name] = new MockTable();
        }
        return this.tables[name];
    }
}

export default MockDexie;
