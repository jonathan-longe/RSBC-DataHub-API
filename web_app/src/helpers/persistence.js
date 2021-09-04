const DB_NAME = 'roadsafety-digital-forms';
const DB_VERSION = 1;
const FORMS_OBJECT_STORE = 'forms'
let DB;

export default {

	async getDb() {
		return new Promise((resolve, reject) => {

			if(DB) { return resolve(DB); }
			console.log('OPENING DB', DB);
			let request = window.indexedDB.open(DB_NAME, DB_VERSION);

			request.onerror = e => {
				console.log('Error opening db', e);
				reject('Error');
			};

			request.onsuccess = e => {
				DB = e.target.result;
				resolve(DB);
			};

			request.onupgradeneeded = e => {
				console.log('DB upgrade required');
				let db = e.target.result;
				db.createObjectStore(FORMS_OBJECT_STORE, { autoIncrement: true, keyPath:'id' });
			};
		});
	},
	async deleteForm(form) {

		let db = await this.getDb();

		return new Promise(resolve => {

			let trans = db.transaction([FORMS_OBJECT_STORE],'readwrite');
			trans.oncomplete = () => {
				resolve();
			};

			let store = trans.objectStore(FORMS_OBJECT_STORE);
			store.delete(form.id);
		});
	},
	async getForms() {

		let db = await this.getDb();

		return new Promise(resolve => {

			let trans = db.transaction([FORMS_OBJECT_STORE],'readonly');
			trans.oncomplete = () => {
				resolve(forms);
			};

			let store = trans.objectStore(FORMS_OBJECT_STORE);
			let forms = [];

			store.openCursor().onsuccess = e => {
				let cursor = e.target.result;
				if (cursor) {
					forms.push(cursor.value)
					cursor.continue();
				}
			};

		});
	},

	async saveForm(form) {

		let db = await this.getDb();

		return new Promise(resolve => {

			let trans = db.transaction([FORMS_OBJECT_STORE],'readwrite');
			trans.oncomplete = () => {
				resolve();
			};

			let store = trans.objectStore(FORMS_OBJECT_STORE);
			store.put(form);

		});

	}

}