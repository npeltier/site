var keystone = require('keystone'),
	Types = keystone.Field.Types;

var Author = new keystone.List('Auteur', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true }
});

Author.add({
	name: { label: 'Nom', type: String, required: true },
	photo: { label: 'Photo', type: Types.LocalFile, required: true, initial: false, dest: "public/images"},
	slug: { type: String, index: true},
	state: { label: 'Status', type: Types.Select, options: 'brouillon, publié, archivé', default: 'brouillon', index: true },		
	content: {
		brief: { label:'Chapeau',type: String, height: 100 },
		extended: { label:'Bio', type: Types.Html, wysiwyg: true, height: 400 }
	}
});

Author.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});

Author.defaultColumns = 'name, state|20%';
Author.register();