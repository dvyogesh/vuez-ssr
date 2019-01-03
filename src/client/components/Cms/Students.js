const students = [
	{
		id: 1,
		name: 'jok',
		games: ['kooo', 'llll','pol', 'pok'],
		selected: false
	},
	{
		id: 2,
		name: 'mek',
		games: ['lodddding', 'pok'],
		selected: false
	},
	{
		id: 3,
		name: 'tiker',
		games: ['poobing', 'killl', 'lodddding', 'pok'],
		selected: false
	},
	{
		id: 4,
		name: 'mek',
		games: ['kooo', 'llll','kooo'],
		selected: false
	},
	{
		id: 5,
		name: 'choper',
		games: ['ccpol', 'poul'],
		selected: false
	},
	{
		id: 6,
		name: 'rubn',
		games: ['pol', 'nmnm','kooo', 'llll'],
		selected: false
	},
]

export default {
	getStudents() {
		return students;
	}
}